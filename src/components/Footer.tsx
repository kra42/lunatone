import type { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-6 text-center text-sm text-gray-400">
        <p>{'©'} {new Date().getFullYear()} {'Lunatone Music School. All Rights Reserved.'}</p>
      </div>
    </footer>
  );
};

export default Footer;