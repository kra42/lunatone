import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: FC = () => {
  const router = useRouter();
  const navLinks = [
    { name: 'Private Lessons', href: '/private-lessons' },
    { name: 'Group Classes', href: '/group-courses' },
    { name: 'Packages', href: '/packages' },
    { name: 'Rental', href: '#' },
    { name: 'Teachers', href: '/teachers' },
    // { name: 'News/Events', href: '#' },
    // { name: 'About', href: '#' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="hidden items-center md:flex space-x-2">
      {navLinks.map((link) => {
        const isActive = router.pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-violet-100 hover:text-violet-700'
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;