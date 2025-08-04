import { useState, type FC } from 'react';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

interface SpecialPromotionBannerProps {
  user: User | null;
}

const SpecialPromotionBanner: FC<SpecialPromotionBannerProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const bookNowHref = user ? '#' : '/signup';

  return (
    <div className="fixed bottom-5 left-5 z-50 w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl ring-1 ring-black ring-opacity-5">
      {/* Main Content */}
      <div className="flex-1">
        <p className="text-xl font-bold text-purple-600">
          <span role="img" aria-label="Party popper">🎉</span> Special Offer!
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-700">
          Discounted rates for your first 10 classes:
        </p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>
            <strong>Standard Instructors:</strong> $59.90/hr <span className="text-gray-500 line-through">$80</span>
          </li>
          <li>
            <strong>Senior Instructors:</strong> $69.90/hr <span className="text-gray-500 line-through">$90</span>
          </li>
        </ul>
         <p className="mt-2 text-xs text-gray-500">
          Discounts for 30 & 45-minute classes also available.
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex justify-end space-x-3">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
        <Link 
          href={bookNowHref}
          className="inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default SpecialPromotionBanner;