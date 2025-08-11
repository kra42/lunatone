import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Define a specific type for the user data
interface UserData {
  role: 'student'; // Role is now hardcoded to 'student'
  first_name: string;
  last_name: string;
  phone_number: string;
  registrant_type: string;
}

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [registrantType, setRegistrantType] = useState('Parent/Guardian');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showResend, setShowResend] = useState(false);

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

  async function handleResendVerification() {
    setError('');
    setMessage('');
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    if (error) {
      setError(error.message);
    } else {
      setMessage('Verification email sent again.');
    }
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setShowResend(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const userData: UserData = {
      role: 'student',
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber || '',
      registrant_type: registrantType,
    };

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
      setShowResend(true);
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
              Create a Student Account
            </h2>
          </div>

          <form className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-xl" onSubmit={signUp}>
            <div className="space-y-4 rounded-md">
              <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
                <input name="first-name" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                <input name="last-name" type="text" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>

              <PhoneInput
                name="phone-number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500"
                defaultCountry="CA"
              />

              <div>
                <label htmlFor="registrantType" className="sr-only">Registrant Type</label>
                <select id="registrantType" name="registrantType" value={registrantType} onChange={e => setRegistrantType(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-violet-500">
                  <option value="Parent/Guardian">I&apos;m a Parent/Guardian</option>
                  <option value="Adult Student">I&apos;m an Adult Student</option>
                </select>
              </div>

              <hr className="my-2"/>
              
              <input name="email" type="email" autoComplete="email" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
              <input name="password" type="password" autoComplete="new-password" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <input name="confirm-password" type="password" required className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-500 focus:border-violet-500 focus:outline-none focus:ring-violet-500" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                Sign Up
              </button>
            </div>
          </form>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          
          {message && (
            <div className="mt-2 text-center text-sm">
              <p className="text-green-600">{message}</p>
              {showResend && (
                <p className="mt-1 text-gray-600">
                  Didn&apos;t get an email?{' '}
                  <button onClick={handleResendVerification} className="font-medium text-violet-600 hover:text-violet-500 underline">
                    Resend Verification
                  </button>
                </p>
              )}
            </div>
          )}

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
