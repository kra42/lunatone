import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

// Define a type for our teacher data that matches the database
interface TeacherProfile {
  id: string;
  first_name: string;
  last_name: string;
  expertise: string[] | null;
  bio: string | null;
  image_url: string | null;
}

export default function TeachersPage() {
  const [user, setUser] = useState<User | null>(null);
  const [teachers, setTeachers] = useState<TeacherProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current user's session for the header
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch the list of teachers from the database
    async function fetchTeachers() {
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, expertise, bio, image_url')
        .eq('role', 'teacher');

      if (error) {
        console.error('Error fetching teachers:', error);
      } else if (data) {
        setTeachers(data as TeacherProfile[]);
      }
      setLoading(false);
    }

    fetchTeachers();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-900">Meet Our Instructors</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Our team of dedicated and passionate educators is here to guide you on your musical journey.
            </p>
          </div>

          {loading ? (
            <p className="text-center mt-16 text-gray-500">Loading teachers...</p>
          ) : (
            <div className="mt-16 space-y-16">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="flex flex-col md:flex-row items-center gap-10 rounded-lg bg-white p-8 shadow-lg">
                  <div className="flex-shrink-0">
                    <Image
                      src={teacher.image_url || 'https://placehold.co/200x200/a78bfa/ffffff?text=Photo'}
                      alt={`Photo of ${teacher.first_name} ${teacher.last_name}`}
                      width={200}
                      height={200}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800">{`${teacher.first_name} ${teacher.last_name}`}</h2>
                    {teacher.expertise && teacher.expertise.length > 0 && (
                      <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                        {teacher.expertise.map((skill) => (
                          <span key={skill} className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-4 text-gray-600">
                      {teacher.bio || 'No biography available.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
