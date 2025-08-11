import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function CompleteTeacherProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [expertise, setExpertise] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchUserAndProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/signin');
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from('users')
        .select('role, bio, expertise')
        .eq('id', user.id)
        .single();

      if (error || !data || data.role !== 'teacher') {
        router.push('/');
        return;
      }
      
      setBio(data.bio || '');
      setExpertise(data.expertise?.join(', ') || '');
      setLoading(false);
    }
    fetchUserAndProfile();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!user) return;

    let avatarUrl = '';
    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      avatarUrl = data.publicUrl;
    }

    const expertiseArray = expertise.split(',').map(item => item.trim());
    const updateData = {
      bio,
      expertise: expertiseArray,
      ...(avatarUrl && { image_url: avatarUrl }),
    };

    const { error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage('Profile updated successfully! Redirecting...');
      setTimeout(() => router.push('/teachers'), 2000);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex flex-1 flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Complete Your Teacher Profile
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This information is required and will be displayed on your public teacher profile.
            </p>
          </div>

          <form className="mt-8 space-y-6 rounded-lg bg-white p-8 shadow-xl" onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  required
                  maxLength={360} // Set the character limit
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                  placeholder="Tell students about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-500 text-right">{bio.length} / 360</p>
              </div>
              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Expertise</label>
                <input type="text" id="expertise" name="expertise" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" placeholder="e.g., Classical Piano, Jazz Theory" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
                <p className="mt-1 text-xs text-gray-500">Please separate skills with a comma.</p>
              </div>
              <div>
                <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:font-semibold file:text-violet-700 hover:file:bg-violet-100" />
              </div>
            </div>

            <div>
              <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-violet-600 py-2 px-4 text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                Save Profile
              </button>
            </div>
          </form>
          {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
          {message && <p className="mt-2 text-center text-sm text-green-600">{message}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
