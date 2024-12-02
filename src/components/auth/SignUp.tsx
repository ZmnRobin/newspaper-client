"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { backendUrl } from '@/configs/constants';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/users/signup`, {
        name,
        email,
        password,
      });

      toast.success('Account created successfully');
      router.push('/login');
      
    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err) && err.response) {
        // Handle different error scenarios
        if (err.response.status === 409) {
          setError('The email or username is already registered. Please use a different email or name.');
          toast.error('The email or username is already registered. Please use a different email or name.');
        } else if (err.response.status === 500) {
          setError('Internal server error. Please try again later.');
          toast.error('Internal server error. Please try again later.');
        } else {
          setError('An unexpected error occurred. Please try again.');
          toast.error('An unexpected error occurred. Please try again.');
        }
      } else {
        // Network or other errors
        setError('Network error. Please check your connection and try again.');
        toast.error('Network error. Please check your connection and try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <h2 className="text-3xl font-extrabold text-center">Create an Account</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='example: John Doe'
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='example@mail.com'
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign Up
      </button>
      <h5>Already have an account? <Link href={"/login"} className='text-sky-500'>Login</Link> </h5>
    </form>
  );
};

export default SignUp;
