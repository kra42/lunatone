import type { FC } from 'react';

interface TeacherModelPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeacherModelPopup: FC<TeacherModelPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl rounded-lg bg-violet-50 p-8 shadow-xl" onClick={e => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-center text-3xl md:text-4xl font-bold text-violet-800 mb-8">
          Regular vs. Senior Teachers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UPDATED: Regular Teachers Text */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Regular Teachers</h3>
            <p className="text-sm font-semibold text-violet-700 mb-4">The Perfect Start for a Lifelong Passion</p>
            <p className="text-gray-600 mb-4">
              Our Regular Teachers are skilled educators chosen for their ability to connect with students and build a strong, positive foundation. They are the ideal choice for most students, from young beginners to adults starting a new instrument.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><span className="font-semibold">Focus on Core Skills:</span> Patient instruction in fundamental techniques, sight-reading, and theory.</li>
              <li><span className="font-semibold">Builds Confidence:</span> Lessons are designed to be encouraging and fun, nurturing a genuine love for music.</li>
              <li><span className="font-semibold">Proven Methods:</span> Relies on established teaching methods to ensure steady, step-by-step progress.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-800 font-medium">
              <strong>Choose this option if:</strong> you are a beginner of any age, or if your primary goal is to build solid skills and enjoy learning music.
            </p>
          </div>
          
          {/* UPDATED: Senior Teachers Text */}
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Senior Teachers</h3>
            <p className="text-sm font-semibold text-violet-700 mb-4">For the Dedicated and Ambitious Musician</p>
            <p className="text-gray-600 mb-4">
              Our Senior Teachers offer everything a Regular Teacher does, plus a layer of specialized expertise. They are performing artists and seasoned mentors, ideal for students with ambitious goals.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><span className="font-semibold">Advanced Specialization:</span> Expert guidance for RCM exams, competitions, and university auditions.</li>
              <li><span className="font-semibold">Performance Insight:</span> Learn from the real-world experience of award-winning musicians.</li>
              <li><span className="font-semibold">Elevated Musicality:</span> Go beyond the notes to explore advanced interpretation and develop a unique artistic voice.</li>
            </ul>
            <p className="mt-4 text-sm text-gray-800 font-medium">
              <strong>Choose this option if:</strong> you are preparing for exams, are an advanced student, or are a dedicated beginner who wants the most intensive training.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModelPopup;