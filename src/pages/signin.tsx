import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace('/');
      }
    });
  }, [router]);

  async function signIn() {
    setError('');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    if (!signInData?.user) {
      setError('User not found');
      return;
    }

    router.push('/');
  }

  return (
    <div>
      <h2>Sign In</h2>
      <p style={{ color: 'gray', fontSize: '0.9em', marginBottom: 8 }}>
        <strong>Note:</strong> If you have not verified your email, please check your inbox for a verification link.
      </p>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={signIn}>Sign In</button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
    </div>
  );
}