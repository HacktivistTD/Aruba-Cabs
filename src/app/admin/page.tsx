'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { UserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// IMPORTANT: Replace this with your actual admin email address
const ADMIN_EMAIL = 'thusharadilrukshatd@gmail.com';

interface Booking {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  passengers: number;
  tripDate: string;
  vehicle: string;
  destinations: { name: string; type: string }[];
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const { user, logOut } = UserAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/admin/login');
      return;
    }

    if (user.email === ADMIN_EMAIL) {
      setIsAuthorized(true);
      const unsubscribe = onSnapshot(
        collection(db, 'bookings'),
        (snapshot) => {
          const bookingsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Booking[];
          bookingsData.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
          setBookings(bookingsData);
          setIsLoading(false);
        },
        (err) => {
          console.error("Error fetching bookings:", err);
          setError('Failed to fetch bookings.');
          setIsLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    const bookingRef = doc(db, 'bookings', id);
    try {
      await updateDoc(bookingRef, { status: newStatus });
    } catch (err) {
      console.error("Error updating status:", err);
      alert('Failed to update status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const bookingRef = doc(db, 'bookings', id);
      try {
        await deleteDoc(bookingRef);
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert('Failed to delete booking.');
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthorized) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">You are not authorized to view this page.</p>
            <button onClick={logOut} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Logout</button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage all tour bookings and customer requests.</p>
          </div>
          <button onClick={logOut} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Logout</button>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
          {error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : bookings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No bookings found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Customer</th>
                    <th scope="col" className="px-6 py-3">Trip Details</th>
                    <th scope="col" className="px-6 py-3">Destinations</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 dark:text-white">{booking.name}</div>
                        <div className="text-gray-500">{booking.email}</div>
                        <div className="text-gray-500">{booking.whatsapp}</div>
                        <div className="text-gray-500">{booking.country}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div>{new Date(booking.tripDate).toLocaleDateString()}</div>
                        <div>{booking.passengers} Passengers</div>
                        <div className="capitalize">{booking.vehicle}</div>
                      </td>
                      <td className="px-6 py-4">
                        <ul className="list-disc list-inside">
                          {booking.destinations.map(d => <li key={d.name}>{d.name}</li>)}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value as Booking['status'])}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 flex items-center space-x-3">
                        <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700">
                          <FaTrash size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
