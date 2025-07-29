import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// --- SVG Icons ---
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const MusicNoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l10-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm10-13l-10 3" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const PianoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v16.5h16.5V3.75H3.75zM8.25 19.5V9.75h-3v9.75h3zm4.5 0V9.75h-3v9.75h3zm4.5 0V9.75h-3v9.75h3zM8.25 8.25h.01M12.75 8.25h.01M17.25 8.25h.01"/>
    </svg>
);

const GuitarIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l4.5 4.5m-4.5 0L13.5 9M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>
);

const DrumsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25c-2.488 0-4.5 2.012-4.5 4.5s2.012 4.5 4.5 4.5 4.5-2.012 4.5-4.5-2.012-4.5-4.5-4.5zM12 18.75c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zM5.25 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM19.5 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 5.25a.75.75 0 100-1.5.75.75 0 000 1.5zM12 19.5a.75.75 0 100 1.5.75.75 0 000-1.5z" />
    </svg>
);

const CelloIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v18M10 3v18M14 3v18M18 3v18M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const TromboneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25V15.75h18V8.25M4.5 8.25v-3a1.5 1.5 0 011.5-1.5h12a1.5 1.5 0 011.5 1.5v3M9 15.75v3.75m6-3.75v3.75" />
    </svg>
);

// --- Main Page Component ---
export default function Home() {
  const [user, setUser] = useState<User | null>(null);

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


  async function signOut() {
    await supabase.auth.signOut();
  }

  const navLinks = [
    { name: 'Private Classes', href: '#' },
    { name: 'Group Classes', href: '#' },
    { name: 'Teachers', href: '#' },
    { name: 'News/Events', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const programs = [
    { name: 'Piano', icon: <PianoIcon /> },
    { name: 'Guitar', icon: <GuitarIcon /> },
    { name: 'Drums', icon: <DrumsIcon /> },
    { name: 'Cello', icon: <CelloIcon /> },
    { name: 'Trombone', icon: <TromboneIcon /> },
  ];

  return (
    <div className="bg-violet-50 font-sans text-gray-700">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-lg font-bold text-violet-800 tracking-wider">
            {'LUNATONE'}
            <span className="block text-xs font-light tracking-widest text-violet-500">{'MUSIC SCHOOL'}</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-violet-600 transition duration-300 text-sm font-medium">{link.name}</a>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            {!user ? (
              <>
                <Link href="/signin" className="px-4 py-2 text-sm text-violet-700 bg-violet-100 rounded-lg hover:bg-violet-200 transition-colors duration-300">
                  {'Sign in'}
                </Link>
                <Link href="/signup" className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
                  {'Register'}
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{'Welcome!'}</span>
                <button onClick={signOut} className="px-4 py-2 text-sm text-white bg-violet-500 rounded-lg hover:bg-violet-600 transition-colors duration-300">
                  {'Log Out'}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-white">
          <div className="container mx-auto px-6 py-20 md:py-24 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-violet-900 leading-tight mb-4">
              {'Inspire. Create. Play.'}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {'Private & Group Music Lessons for Kids, Teens, and Adults'}
            </p>
            <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {'Book a Trial Class'}
            </button>
          </div>
        </section>

        {/* Why Choose Lunatone? */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-violet-800 mb-2">{'Why Choose Lunatone?'}</h2>
            <p className="text-gray-500 mb-10">{'We offer the best learning experience.'}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <UserIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Professional Instructors'}</h3>
                <p className="text-gray-600">{'Learn-from experienced and passionate music educators.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <MusicNoteIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Flexible Options'}</h3>
                <p className="text-gray-600">{'Private and group lessons available for all ages and skill levels.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <HomeIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Kid-Friendly Environment'}</h3>
                <p className="text-gray-600">{'Supportive and fun fan lessons designed for young learners.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Programs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-violet-800 mb-2">{'Our Programs'}</h2>
            <p className="text-gray-500 mb-10">{'Find the perfect instrument for you.'}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {programs.map(program => (
                <div key={program.name} className="bg-violet-100/50 p-6 rounded-xl hover:bg-violet-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  {program.icon}
                  <h3 className="font-semibold text-lg mt-4 text-violet-900">{program.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Meet Our Teachers */}
        <section className="py-16">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-violet-800 mb-2">{'Meet Our Teachers'}</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-8">{'Experienced, friendly, and passionate about teaching music.'}</p>
                <button className="border-2 border-violet-500 text-violet-500 font-bold py-3 px-8 rounded-lg hover:bg-violet-500 hover:text-white transition-colors duration-300">
                    {'View All Teachers'}
                </button>
            </div>
        </section>

        {/* Testimonials & CTA */}
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-violet-800 mb-4">{'What Our Students Say'}</h3>
                    <blockquote className="bg-violet-50 p-6 rounded-xl italic">
                        <p className="text-gray-600">{'"Lunatone helped my child fall in love with music. The teachers are amazing!"'}</p>
                        <cite className="block text-right not-italic font-semibold text-violet-600 mt-4">{'- A Happy Parent'}</cite>
                    </blockquote>
                </div>
                 <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-violet-800 mb-4">{'Ready to Begin Your Musical Journey?'}</h3>
                    <p className="text-gray-500 mb-6">{'Book a trial class today and enjoy our special first-time rate!'}</p>
                    <button className="w-full md:w-auto bg-violet-500 hover:bg-violet-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        {'Book a Trial Class'}
                    </button>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center text-sm text-gray-400">
          <p>{'©'} {new Date().getFullYear()} {'Lunatone Music School. All Rights Reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}
