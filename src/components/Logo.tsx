import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

const Logo: FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-4">
      <Image src="/images/logo.jpg" alt="Lunatone Music School Logo" width={100} height={100} />
      <div>
        <div className="text-2xl font-extrabold text-violet-800 tracking-wider">
          {'LUNATONE'}
        </div>
        <span className="block text-sm font-medium tracking-widest text-violet-700">
          {'MUSIC SCHOOL'}
        </span>
      </div>
    </Link>
  );
};

export default Logo;
