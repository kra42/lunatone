import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import SpecialPromotionBanner from '../components/SpecialPromotionBanner'; 
// Assuming your Icons.tsx file is in src/components/
import {
  UserIcon,
  MusicNoteIcon,
  HomeIcon,
  PianoIcon,
  GuitarIcon,
  DrumsIcon,
  CelloIcon,
  TromboneIcon,
} from '../components/Icons';


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
      
      {/* Special Promotion Banner*/}
      <SpecialPromotionBanner user={user} />
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/logo.jpg" alt="Lunatone Music School Logo" width={80} height={80} />
            <div>
              <div className="text-2xl font-extrabold  text-violet-800 tracking-wider">
                {'LUNATONE'}
              </div>
              <span className="block text-sm font-bold tracking-widest text-violet-800">{'MUSIC SCHOOL'}</span>
            </div>
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
                <span className="text-sm text-gray-600">
                  {user?.user_metadata?.first_name ? `Welcome, ${user.user_metadata.first_name}!` : 'Welcome!'}
                </span>                
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
        <section className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          <div className="container mx-auto px-6 py-28 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              {'Register an Account to Start Your Music Journey'}
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-10">
              {'Your path to musical excellence begins here. Join our vibrant community, learn from inspiring instructors, and grow with confidence.'}
            </p>
            <button className="bg-white text-purple-600 font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {'Register Now'}
            </button>
          </div>
        </section>

        {/* Why Choose Lunatone? */}
        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-4">{'Why Choose Lunatone?'}</h2>
            <p className="text-gray-500 mb-16 max-w-2xl mx-auto">{'We offer the best learning experience.'}</p>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <UserIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Professional Instructors'}</h3>
                <p className="text-gray-600">{'Learn from experienced and passionate music educators.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <MusicNoteIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Flexible Options'}</h3>
                <p className="text-gray-600">{'Private and group lessons available for all ages and skill levels.'}</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <HomeIcon />
                <h3 className="font-bold text-xl my-4 text-violet-900">{'Child-Friendly Environment'}</h3>
                <p className="text-gray-600">{'Supportive and fun lessons designed for young learners.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Programs */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-4">{'Our Programs'}</h2>
            <p className="text-gray-500 mb-16 max-w-2xl mx-auto">{'Find the perfect instrument for you.'}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
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
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-4">{'Meet Our Teachers'}</h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-10">{'Experienced, friendly, and passionate about teaching music.'}</p>
                <button className="border-2 border-violet-500 text-violet-500 font-bold py-3 px-8 rounded-lg hover:bg-violet-500 hover:text-white transition-colors duration-300">
                    {'View All Teachers'}
                </button>
            </div>
        </section>

        {/* Testimonials & CTA */}
        <section className="py-20 md:py-24 bg-white">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-violet-800 mb-4">{'What Our Students Say'}</h3>
                    <blockquote className="bg-violet-50 p-8 rounded-xl italic">
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
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center text-sm text-gray-400">
          <p>{'©'} {new Date().getFullYear()} {'Lunatone Music School. All Rights Reserved.'}</p>
        </div>
      </footer>
    </div>
  );
}