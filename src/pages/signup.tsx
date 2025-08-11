import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

// Define a specific type for the user data to avoid using 'any'
interface UserData {
  role: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  registrant_type?: string; // This property is optional
}

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // 1. Add state for confirm password
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('student');
  const [registrantType, setRegistrantType] = useState('Parent/Guardian');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');

    // 2. Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return; // Stop the function if they don't match
    }

    const userData: UserData = {
      role,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    if (role === 'student') {
      userData.registrant_type = registrantType;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Success! Check your email to verify your account.');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create Your Account
            </h2>
          </div>

          <form className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-xl" onSubmit={signUp}>
            <div className="space-y-4 rounded-md">
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                <input name="first-name" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input name="last-name" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>

              <input name="phone-number" type="tel" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />

              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                <select name="role" value={role} onChange={e => setRole(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-violet-500">
                    <option value="student">I&apos;m a Student</option>
                    <option value="teacher">I&apos;m a Teacher</option>
                </select>
                
                {role === 'student' && (
                  <select name="registrantType" value={registrantType} onChange={e => setRegistrantType(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-violet-500">
                    <option value="Parent/Guardian">I&apos;m a Parent/Guardian</option>
                    <option value="Adult Student">I&apos;m an Adult Student</option>
                  </select>
                )}
              </div>

              <hr className="my-2"/>
              
              <input name="email" type="email" autoComplete="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              <input name="password" type="password" autoComplete="new-password" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              
              {/* 3. Add the new confirm password input field */}
              <input name="confirm-password" type="password" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                Sign Up
              </button>
            </div>
          </form>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="font-medium text-violet-600 hover:text-violet-500">
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
