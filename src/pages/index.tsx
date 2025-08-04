import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';

// Import your new reusable components
import Header from '../components/Header';
import SpecialPromotionBanner from '../components/SpecialPromotionBanner';

// Import your icons
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
import Footer from '@/components/Footer';


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

  const programs = [
    { name: 'Piano', icon: <PianoIcon /> },
    { name: 'Guitar', icon: <GuitarIcon /> },
    { name: 'Drums', icon: <DrumsIcon /> },
    { name: 'Cello', icon: <CelloIcon /> },
    { name: 'Trombone', icon: <TromboneIcon /> },
  ];

  return (
    <div className="bg-violet-50 font-sans text-gray-700">
      <SpecialPromotionBanner user={user} />
      <Header user={user} />

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

      <Footer />
    </div>
  );
}