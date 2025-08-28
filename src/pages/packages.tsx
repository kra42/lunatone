import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const newStudentPackages = [
  {
    name: '10 × 30-Minute Lessons',
    description: 'Perfect for young beginners or those looking for a quick, focused session.',
    duration: 30,
    originalPrice: 500,
    price: 388.00,
    pricePerLesson: 38.80,
    link: 'https://squareup.com/path/to/10x30-min-package', // TODO: Replace with actual link
  },
  {
    name: '10 × 45-Minute Lessons',
    description: 'A balanced option for steady progress, ideal for most students.',
    duration: 45,
    originalPrice: 700,
    price: 555.00,
    pricePerLesson: 55.00,
    link: 'https://squareup.com/path/to/10x45-min-package', // TODO: Replace with actual link
  },
  {
    name: '10 × 60-Minute Lessons',
    description: 'The best value for dedicated students aiming for significant improvement.',
    duration: 60,
    originalPrice: 900,
    price: 700.00,
    pricePerLesson: 70.00,
    link: 'https://squareup.com/path/to/10x60-min-package', // TODO: Replace with actual link
  },
];

const longTermPackages = [
  {
    name: '15 × 30-Minute Lessons',
    description: 'Commit to your progress with a package of 15 lessons and save 10%.',
    duration: 30,
    originalPrice: 750,
    price: 675.00,
    pricePerLesson: 45.00,
    link: 'https://squareup.com/path/to/15x30-min-package', // TODO: Replace with actual link
  },
  {
    name: '15 × 45-Minute Lessons',
    description: 'A popular long-term option for consistent development with a 10% discount.',
    duration: 45,
    originalPrice: 1050,
    price: 945.00,
    pricePerLesson: 63.00,
    link: 'https://squareup.com/path/to/15x45-min-package', // TODO: Replace with actual link
  },
  {
    name: '15 × 60-Minute Lessons',
    description: 'Maximize your learning and savings with our best value long-term package.',
    duration: 60,
    originalPrice: 1350,
    price: 1215.00,
    pricePerLesson: 81.00,
    link: 'https://squareup.com/path/to/15x60-min-package', // TODO: Replace with actual link
  },
];

export default function PackagesPage() {
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

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-purple-600 to-yellow-500 text-white">
          <div className="container mx-auto px-6 py-28 md:py-40 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
              Student Packages
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto mb-10">
              Get the best value and kickstart your musical journey with our discounted 10-lesson packages.
            </p>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-12 text-center">
              New Student 10-Lesson Introductory Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {newStudentPackages.map((pkg) => {
                const hourlyRate = (pkg.pricePerLesson / pkg.duration) * 60;
                return (
                  <div key={pkg.name} className="flex flex-col rounded-lg bg-white p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-violet-800 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>
                    <div className="mb-6 text-center">
                      <div className="flex items-baseline justify-center gap-x-2">
                        <p className="text-4xl font-extrabold text-gray-900">${pkg.price.toFixed(2)}</p>
                        <p className="text-xl font-semibold text-gray-400 line-through">${pkg.originalPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Just ${hourlyRate.toFixed(2)} / hour</p>
                    </div>
                    <a
                      href={pkg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center rounded-md bg-violet-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors"
                    >
                      Purchase Package
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-800 mb-4 text-center">
              Continuing Student Packages
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl mx-auto text-center">
              Save 10% on our reusable 15-lesson packages. Perfect for continuing your musical journey.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {longTermPackages.map((pkg) => {
                const hourlyRate = (pkg.pricePerLesson / pkg.duration) * 60;
                return (
                  <div key={pkg.name} className="flex flex-col rounded-lg bg-violet-50 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-violet-800 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{pkg.description}</p>
                    <div className="mb-6 text-center">
                      <div className="flex items-baseline justify-center gap-x-2">
                        <p className="text-4xl font-extrabold text-gray-900">${pkg.price.toFixed(2)}</p>
                        <p className="text-xl font-semibold text-gray-400 line-through">${pkg.originalPrice.toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Just ${hourlyRate.toFixed(2)} / hour</p>
                    </div>
                    <a
                      href={pkg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center rounded-md bg-violet-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors"
                    >
                      Purchase Package
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
