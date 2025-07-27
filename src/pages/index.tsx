import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState<import('@supabase/supabase-js').User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);


  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div>
      <h1>Welcome to Lunatone</h1>
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <br />
          <Link href="/signup">Sign Up</Link>
        </>
      )}
      {user && (
        <div>
          Welcome, {user.email}!<br />
          <button onClick={signOut}>Log Out</button>
        </div>
      )}
    </div>
  );
}