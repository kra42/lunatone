import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { User } from '@supabase/supabase-js';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CoursePageLayoutProps {
  user: User | null;
  headerContent: {
    iconSrc: string;
    title: string;
    subtitle:string;
    description: string;
  };
  ctaContent: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  children: ReactNode;
}

const CoursePageLayout: FC<CoursePageLayoutProps> = ({ user, headerContent, ctaContent, children }) => {
  const { iconSrc, title, subtitle, description } = headerContent;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header user={user} />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Image src={iconSrc} alt={title} width={32} height={32} className="h-8 w-8 mx-auto" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-4">{title}</h1>
            <h2 className="text-2xl font-semibold text-violet-700 mt-2">{subtitle}</h2>
            <p className="mt-4 text-lg text-gray-600">{description}</p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg space-y-12">
            {children}
          </div>

          <div className="text-center mt-16">
            <h3 className="text-3xl font-bold text-gray-800">{ctaContent.title}</h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{ctaContent.description}</p>
            <Link href={ctaContent.buttonLink} className="mt-6 inline-block bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
              {ctaContent.buttonText}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursePageLayout;