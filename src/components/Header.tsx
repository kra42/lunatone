import type { FC } from 'react';
import type { User } from '@supabase/supabase-js';
import Logo from './Logo';
import Navigation from './Navigation';
import AuthNav from './AuthNav';

interface HeaderProps {
  user: User | null;
}

const Header: FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <Navigation />
        <AuthNav user={user} />
      </div>
    </header>
  );
};

export default Header;