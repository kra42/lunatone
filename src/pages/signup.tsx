import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  async function signUp() {
    setError('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, first_name: firstName, last_name: lastName },
      },
    });

    if (error) {
      setError(error.message);
      return;
    }

    alert('Check your email to verify your account before signing in.');
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <p style={{ color: 'gray', fontSize: '0.9em', marginBottom: 8 }}>
        <strong>Note:</strong> For your privacy, we cannot always tell if an email is already registered. 
        If you have already signed up but have not verified your email, please check your inbox (and spam folder) for a verification link.
      </p>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
      <button onClick={signUp}>Sign Up</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}