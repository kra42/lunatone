import type { FC, ReactNode } from 'react';
import Image from 'next/image';

interface CourseSectionProps {
  title: string;
  iconSrc: string;
  children: ReactNode;
}

const CourseSection: FC<CourseSectionProps> = ({ title, iconSrc, children }) => {
  return (
    <section>
      <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-4">
        <Image src={iconSrc} alt={title} width={24} height={24} className="h-6 w-6 mr-3" />
        {title}
      </h3>
      {children}
    </section>
  );
};

export default CourseSection;