import type { FC } from 'react';
import Image from 'next/image';

interface ClassInfoDetail {
  text: string;
  icon: string;
}

interface ClassInfoProps {
  details: ClassInfoDetail[];
}

const ClassInfo: FC<ClassInfoProps> = ({ details }) => {
  return (
    <div className="grid grid-cols-2 gap-2 text-center">
      {details.map((detail, index) => (
        <div
          key={index}
          className="flex h-28 flex-col items-center justify-center gap-2 rounded-lg bg-violet-200 p-2 shadow-sm"
        >
          <Image src={detail.icon} alt={detail.text} width={32} height={32} className="h-8 w-8" />
          <p className="text-sm font-semibold text-gray-800">{detail.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ClassInfo;
