import Link from 'next/link';
import { useState, useEffect, type FC } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

interface AuthNavProps {
  user: User | null;
}

interface UserProfile {
  role: string;
}

const AuthNav: FC<AuthNavProps> = ({ user }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the user's role from the public.users table
    async function fetchUserProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
        } else if (data) {
          setProfile(data);
        }
      } else {
        setProfile(null); // Clear profile when user logs out
      }
    }

    fetchUserProfile();
  }, [user]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/'); // Redirect to home page after sign out
  }

  const handleEditProfileClick = () => {
    // Corrected the path to match the actual file name
    const profileLink = profile?.role === 'teacher' ? '/complete-teacher-profile' : '/update-student-profile';
    router.push(profileLink);
  };

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
          <span className="text-base font-semibold text-gray-800">
            {user?.user_metadata?.first_name ? `Welcome, ${user.user_metadata.first_name}!` : 'Welcome!'}
          </span>

          {/* This button appears for both students and teachers, linking to the correct page */}
          {(profile?.role === 'teacher' || profile?.role === 'student') && (
            <button onClick={handleEditProfileClick} className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
                Edit Profile
            </button>
          )}

          <button onClick={signOut} className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthNav;
