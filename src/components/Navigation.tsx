import type { FC } from 'react';

const Navigation: FC = () => {
  const navLinks = [
    { name: 'Private Classes', href: '#' },
    { name: 'Group Classes', href: '#' },
    { name: 'Teachers', href: '#' },
    { name: 'News/Events', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
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