import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import ClassInfo from '../components/ClassInfo';

// Reusable Sparkle Icon component for promotions
const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47a.75.75 0 011.06 0zm9.192 0a.75.75 0 011.06 0l2.47 2.47a.75.75 0 01-1.06 1.06l-2.47-2.47a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012 10zm14.25 0a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75zM5.404 15.657a.75.75 0 011.06 0l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47zm9.192 0a.75.75 0 010 1.06l-2.47 2.47a.75.75 0 11-1.06-1.06l2.47-2.47a.75.75 0 011.06 0zM10 18a.75.75 0 01.75-.75v-3.5a.75.75 0 01-1.5 0v3.5A.75.75 0 0110 18z" clipRule="evenodd" />
    </svg>
);

const groupCourses = [
  {
    name: 'RCM Theory Group Lessons',
    tags: ['Exam Prep', 'Small Group'],
    description: 'Build a rigorous theory foundation and prepare for RCM exams with collaborative practice and teacher guidance.',
    features: [
      'Exam strategies using real paper practice',
      'Harmony, analysis, and composition made clear',
      'Small group for more individual support',
    ],
    infoItems: [
      { text: '≤ 6 students', icon: '/images/icons/class-size-icon.svg' },
      { text: '60 min/weekly', icon: '/images/icons/schedule-icon.svg' },
      { text: '$50-$80 CAD', icon: '/images/icons/course-price-icon.svg' },
      { text: 'Exam Prep', icon: '/images/icons/student-level-icon.svg' },
    ],
  },
  {
    name: 'Pianorama Group Class',
    tags: ['Ages 3-7', 'Parent-Friendly'],
    description: 'A playful first step into piano: creativity, rhythm, ear training, and music reading in a social setting.',
    features: [
      'Beginner-friendly activities that spark curiosity',
      'Steady progress in rhythm, listening, and reading',
      'Parent participation is optional to support learning',
    ],
    infoItems: [
      { text: '≤ 10 students', icon: '/images/icons/class-size-icon.svg' },
      { text: '45 min/weekly', icon: '/images/icons/schedule-icon.svg' },
      { text: '$40 CAD', icon: '/images/icons/course-price-icon.svg' },
      { text: 'Ages 3-7', icon: '/images/icons/student-level-icon.svg' },
    ],
  },
  {
    name: 'Vocal Performance Program',
    tags: ['Ages 6+', 'Ensemble & Solo'],
    description: 'Grow as a confident singer: technique, harmony, and stage presence with supportive peers.',
    features: [
      'Breath control, tone, and range development',
      'Group harmony and ensemble listening',
      'Performance coaching and solo opportunities',
    ],
    infoItems: [
      { text: 'Small groups', icon: '/images/icons/class-size-icon.svg' },
      { text: '45 min/weekly', icon: '/images/icons/schedule-icon.svg' },
      { text: '$40 CAD', icon: '/images/icons/course-price-icon.svg' },
      { text: 'Ages 6+', icon: '/images/icons/student-level-icon.svg' },
    ],
  },
  {
    name: 'Trombone Group Lessons',
    tags: ['Brass Basics', 'Ensemble'],
    description: 'Master trombone fundamentals—embouchure, breath, tone—and play in a focused small ensemble.',
    features: [
      'Personalized feedback in a small section',
      'Breathing, articulation, and slide technique',
      'Ensemble awareness and blend',
    ],
    infoItems: [
      { text: '≤ 5 students', icon: '/images/icons/class-size-icon.svg' },
      { text: '45 min/weekly', icon: '/images/icons/schedule-icon.svg' },
      { text: '$40 CAD', icon: '/images/icons/course-price-icon.svg' },
      { text: 'Brass Basics', icon: '/images/icons/student-level-icon.svg' },
    ],
  },
];

export default function GroupCoursesPage() {
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

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white">
          <div className="container mx-auto px-6 py-28 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
              Learn Together, Grow Together
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto mb-10">
              Discover the joy of learning music in a fun, supportive, and collaborative group environment.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-center text-3xl md:text-4xl font-bold text-violet-800 mb-16">
              Our Group Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {groupCourses.map((course) => (
                <div key={course.name} className="flex flex-col rounded-lg bg-violet-50 p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-violet-200 px-3 py-1 text-xs font-semibold text-violet-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.name}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6 flex-grow">
                    {course.features.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <ClassInfo details={course.infoItems} />
                  </div>
                  <p className="font-semibold text-green-600 flex items-center mb-6">
                    <SparkleIcon /> Save 10% when booking 15+ classes
                  </p>
                  <div className="mt-auto flex items-center space-x-4">
                    <Link href="#" className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                      Register Now
                    </Link>
                    <Link href="#" className="text-violet-700 font-bold hover:underline">
                      Learn More
                    </Link>
                  </div>
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