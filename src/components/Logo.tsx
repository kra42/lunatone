import Image from 'next/image';
import type { FC } from 'react';

const Logo: FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Image src="/logo.jpg" alt="Lunatone Music School Logo" width={50} height={50} />
      <div>
        <div className="text-2xl font-extrabold text-violet-800 tracking-wider">
          {'LUNATONE'}
        </div>
        <span className="block text-sm font-medium tracking-widest text-violet-700">
          {'MUSIC SCHOOL'}
        </span>
      </div>
    </div>
  );
};

export default Logo;