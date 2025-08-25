import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Import the new modal component
import TeacherModelPopup from '../components/TeacherModelPopup';

// SVGs and other components remain the same
const RightArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47a.75.75 0 011.06 0zm9.192 0a.75.75 0 011.06 0l2.47 2.47a.75.75 0 01-1.06 1.06l-2.47-2.47a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012 10zm14.25 0a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM5.404 15.657a.75.75 0 011.06 0l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47zm9.192 0a.75.75 0 010 1.06l-2.47 2.47a.75.75 0 11-1.06-1.06l2.47-2.47a.75.75 0 011.06 0zM10 18a.75.75 0 01.75-.75v-3.5a.75.75 0 01-1.5 0v3.5A.75.75 0 0110 18z" clipRule="evenodd" />
    </svg>
);


export default function PrivateLessonsPage() {
  const [user, setUser] = useState<User | null>(null);
  // Add state to manage the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const tuitionDetails = [
    { name: 'Piano', iconUrl: '/images/icons/piano-icon.svg', pricing: { regular: { 30: 40, 45: 60, 60: 80 }, senior: { 30: 45, 45: 70, 60: 90 } }, packageLink: '#', trialLink: '#' },
    { name: 'Violin', iconUrl: '/images/icons/violin-icon.svg', pricing: { regular: { 30: 40, 45: 60, 60: 80 } }, packageLink: '#', trialLink: '#' },
    { name: 'Trombone', iconUrl: '/images/icons/trombone-icon.svg', pricing: { regular: { 30: 40, 45: 60, 60: 80 } }, packageLink: '#', trialLink: '#' },
    { name: 'Guzheng', iconUrl: '/images/icons/guzheng-icon.svg', pricing: { regular: { 30: 40, 45: 60, 60: 80 } }, packageLink: '#', trialLink: '#' },
    { name: 'Vocals', iconUrl: '/images/icons/vocals-icon.svg', pricing: { regular: { 30: 40, 45: 60, 60: 80 } }, packageLink: '#', trialLink: '#' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white">
          <div className="container mx-auto px-6 py-28 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
              Unlock Your Music Potential with Private Lessons
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto mb-10">
              One-on-one guidance tailored to your instrument, your pace, and your dreams.
            </p>
            <div className="flex justify-center items-center space-x-4">
              <Link href="#" className="inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Book a Trial Lesson
              </Link>
              <Link href="/teachers" className="inline-flex items-center bg-white hover:bg-gray-200 text-violet-700 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Meet Our Teachers <RightArrowIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* Lesson Structure & Tuition Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-violet-800 mb-16">
              Lesson Structure & Tuition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {tuitionDetails.map((instrument) => (
                <div key={instrument.name} className="rounded-lg bg-violet-50 p-8 shadow-md">
                  <div className="flex items-center mb-4">
                    <Image src={instrument.iconUrl} alt={`${instrument.name} icon`} width={40} height={40} />
                    <h3 className="ml-4 text-2xl font-bold text-gray-800">{instrument.name}</h3>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Regular:</strong> 30 min - ${instrument.pricing.regular[30]} | 45 min - ${instrument.pricing.regular[45]} | 60 min - ${instrument.pricing.regular[60]}</p>
                    {instrument.pricing.senior ? (
                      <p><strong>Senior:</strong> 30 min - ${instrument.pricing.senior[30]} | 45 min - ${instrument.pricing.senior[45]} | 60 min - ${instrument.pricing.senior[60]}</p>
                    ) : (
                      <p className="invisible">Placeholder for alignment</p>
                    )}
                  </div>
                  <p className="mt-4 font-semibold text-green-600 flex items-center">
                    <SparkleIcon /> Save 10% when booking 15+ classes
                  </p>
                  {/* Changed from <a> to <button> to open the modal */}
                  <button onClick={() => setIsModalOpen(true)} className="mt-1 text-sm text-violet-600 hover:underline">
                    Learn about Regular vs. Senior teachers →
                  </button>
                  <div className="mt-6 flex items-center space-x-4">
                    <Link href={instrument.trialLink} className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                      Book a Trial Lesson
                    </Link>
                    <Link href={instrument.packageLink} className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg border border-gray-300 transition-colors">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lesson Cancellation Policy */}
        <section className="py-20 md:py-24 bg-violet-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-6">
              Lesson Cancellation Policy
            </h2>
            <div className="max-w-2xl mx-auto space-y-6 text-lg">
              <div className="flex items-center gap-3 justify-center">
                <span role="img" aria-label="checkmark" className="text-green-600 text-2xl">✅</span>
                <span>Lesson scheduled weekly with flexibility for makeup classes</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span role="img" aria-label="cross mark" className="text-red-500 text-2xl">❌</span>
                <span>Cancel within 24 hours &rarr; <span className="font-semibold">Not eligible</span> for makeup lesson.</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span role="img" aria-label="clock" className="text-yellow-500 text-2xl">⏰</span>
                <span>Cancel with 24+ hours notice &rarr; <span className="font-semibold">Eligible</span> for makeup lesson.</span>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <span role="img" aria-label="calendar" className="text-blue-500 text-2xl">📅</span>
                <span>Holiday &amp; school breaks accommodated – ask us about our flexible calendar!</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Render the modal component here */}
      <TeacherModelPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}