import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component
import Header from '../components/Header';
import Footer from '../components/Footer';

// A simple right arrow SVG for the button
const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function PrivateLessonsPage() {
  const [user, setUser] = useState<User | null>(null);

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

  const instruments = [
    {
      iconUrl: '/images/icons/piano-icon.svg',
      name: 'Piano',
      intro: 'The piano is a perfect starting point for any musical journey, offering a strong foundation in melody, harmony, and rhythm.'
    },
    {
      iconUrl: '/images/icons/violin-icon.svg',
      name: 'Violin',
      intro: 'Known for its beautiful and expressive tone, the violin is a rewarding instrument that shines in both solo and ensemble settings.'
    },
    {
      iconUrl: '/images/icons/trombone-icon.svg',
      name: 'Trombone',
      intro: 'With its powerful and versatile sound, the trombone is a key member of jazz bands, orchestras, and concert bands.'
    },
    {
      iconUrl: '/images/icons/guzheng-icon.svg',
      name: 'Guzheng',
      intro: 'Discover the enchanting sounds of this traditional Chinese plucked instrument, known for its rich history and captivating melodies.'
    },
    {
      iconUrl: '/images/icons/vocals-icon.svg',
      name: 'Vocals',
      intro: 'Build a solid foundation in vocal technique, including breath control, pitch, and projection. This course is designed for aspiring soloists and choir players who want to develop their voice and prepare for the stage.'
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white lunar-music-background">
      <Header user={user} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-black text-white">
          <div className="container mx-auto px-6 py-28 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
              Unlock Your Music Potential with Private Lessons
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto mb-10">
              One-on-one guidance tailored to your instrument, your pace, and your dreams.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <Link
                href="/book-trial" // This will link to the trial lesson page when you create it
                className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Book a Trial Lesson
              </Link>
              <Link
                href="/teachers"
                className="inline-flex items-center bg-white hover:bg-gray-200 text-violet-700 font-bold py-3 px-8 rounded-lg transition-colors duration-300"
              >
                Meet Our Teachers
                <RightArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* Instruments Offered Section */}
        <section className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-16">Instruments Offered</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                  {instruments.map((instrument) => (
                    <div key={instrument.name} className="rounded-lg bg-violet-50 p-8 shadow-md transition-shadow duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col items-center">
                      <Image
                        src={instrument.iconUrl}
                        alt={`${instrument.name} icon`}
                        width={80}
                        height={80}
                      />
                      <h3 className="mt-6 text-2xl font-bold text-gray-800">{instrument.name}</h3>
                      <p className="mt-2 text-gray-600">{instrument.intro}</p>
                    </div>
                  ))}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
