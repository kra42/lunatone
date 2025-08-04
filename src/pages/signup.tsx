import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, first_name: firstName, last_name: lastName },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email to verify your account before signing in.');
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create Your Account
            </h2>
          </div>

          <form className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-xl" onSubmit={signUp}>
            <div className="space-y-4 rounded-md">
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                <div>
                  <label htmlFor="first-name" className="sr-only">First Name</label>
                  <input id="first-name" name="first-name" type="text" required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="last-name" className="sr-only">Last Name</label>
                  <input id="last-name" name="last-name" type="text" required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
               <div>
                  <label htmlFor="role" className="sr-only">I am a...</label>
                  <select id="role" name="role" value={role} onChange={e => setRole(e.target.value)} className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-violet-500 focus:outline-none focus:ring-violet-500 sm:text-sm">
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                  </select>
              </div>
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
            {/* Corrected Link component */}
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