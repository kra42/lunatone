import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

// --- Icon Components ---
const MusicNoteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-12c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.975 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function RCMTheoryPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setUser(data.user); });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { authListener.subscription.unsubscribe(); };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-16">
          {/* --- Course Header --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <MusicNoteIcon />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-4">
              RCM Theory Group Lessons
            </h1>
            <h2 className="text-2xl font-semibold text-violet-700 mt-2">
              Levels 5–10 & ARCT
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Build a solid foundation in music theory with small group classes designed to prepare students for RCM exams and lifelong musicianship.
            </p>
          </div>

          {/* --- Main Content Grid --- */}
          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-12">
            {/* What is RCM Theory? */}
            <section>
              <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-4">
                <BookOpenIcon />
                What is RCM Theory?
              </h3>
              <p className="text-gray-700 mb-4">
                The <span className="font-semibold">Royal Conservatory of Music (RCM)</span> curriculum is one of the most respected music education systems in North America. Alongside performance exams, students must complete theory requirements to receive official certificates and diplomas.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><span className="font-semibold">Levels 5–8:</span> Foundations of scales, chords, harmony, and analysis</li>
                <li><span className="font-semibold">Levels 9–10:</span> Advanced harmony, counterpoint, and music history</li>
                <li><span className="font-semibold">ARCT:</span> The highest level, preparing students for university and professional studies</li>
              </ul>
            </section>
            
            {/* Why is Theory Important? */}
            <section>
              <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-6">
                <StarIcon />
                Why is Theory Important?
              </h3>
              <p className="text-gray-700 mb-6">
                 Music theory is the framework that connects <span className="font-semibold">performance, listening, and creativity</span>. It deepens understanding and ensures students are fully prepared for exams and beyond.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800">Better Performance</h4>
                  <p className="text-gray-600 text-sm">Students understand the structure of the music they play, improving accuracy and expression.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800">Critical Thinking</h4>
                  <p className="text-gray-600 text-sm">Analyzing music develops problem-solving skills, memory, and creativity.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800">Exam Success</h4>
                  <p className="text-gray-600 text-sm">RCM practical exams require corresponding theory levels for official certification.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800">Future Opportunities</h4>
                  <p className="text-gray-600 text-sm">Universities and conservatories recognize RCM theory certificates for admission and credit.</p>
                </div>
              </div>
            </section>
            
            {/* Advantages */}
            <section>
                <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-4">
                    <CheckCircleIcon />
                    Advantages of Our Group Lessons
                </h3>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-700">
                    <div className="flex items-center"><CheckCircleIcon /> Small groups (max 6 students)</div>
                    <div className="flex items-center"><CheckCircleIcon /> Exam-focused curriculum</div>
                    <div className="flex items-center"><CheckCircleIcon /> Experienced RCM teachers</div>
                    <div className="flex items-center"><CheckCircleIcon /> Interactive, engaging lessons</div>
                </div>
            </section>

            {/* Course Information */}
            <section>
              <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-4">
                <InfoIcon />
                Course Information
              </h3>
              <div className="border-2 border-violet-100 bg-violet-50/50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
                <div><span className="font-semibold">Schedule:</span> Once per week, 60 minutes</div>
                <div><span className="font-semibold">Class Size:</span> Max 6 students</div>
                <div><span className="font-semibold">Tuition (Levels 5–10):</span> $50 CAD per class</div>
                <div><span className="font-semibold">Prerequisite:</span> Must be at corresponding RCM performance level</div>
                <div><span className="font-semibold">Tuition (ARCT):</span> $80 CAD per class</div>
                <div><span className="font-semibold">Format:</span> In-person group class with interactive exercises</div>
                <div className="md:col-span-2"><span className="font-semibold text-green-600">Discount:</span> 10% off for 15 classes</div>
              </div>
            </section>
          </div>

          {/* --- CTA Section --- */}
          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-800">Ready to Begin?</h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Give your child the knowledge that strengthens their entire musical journey. Register today and join our community of aspiring musicians.
            </p>
            <Link href="#" className="mt-6 inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
              Register Now
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}