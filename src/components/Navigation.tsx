import type { FC } from 'react';

const Navigation: FC = () => {
  const navLinks = [
    { name: 'Private Lessons', href: '/private-lessons' },
    { name: 'Group Classes', href: '#' },
    { name: 'Teachers', href: '/teachers' },
    { name: 'News/Events', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="hidden md:flex space-x-8">
      {navLinks.map(link => (
        <a key={link.name} href={link.href} className="text-gray-600 hover:text-violet-600 transition duration-300 text-sm font-medium">
          {link.name}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;