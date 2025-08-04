import Link from 'next/link';
import type { FC } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthNavProps  {
  user: User | null;
}

const AuthNav: FC<AuthNavProps> = ({ user }) => {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="flex items-center space-x-2">
      {!user ? (
        <>
          <Link href="/signin" className="px-4 py-2 text-sm text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 transition-colors duration-300">
            Sign in
          </Link>
          <Link href="/signup" className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
            Register
          </Link>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {user?.user_metadata?.first_name ? `Welcome, ${user.user_metadata.first_name}!` : 'Welcome!'}
          </span>
          <button onClick={signOut} className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthNav;