import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [user, setUser] = useState<User | null>(null);
  // State for the teacher application form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [instrument, setInstrument] = useState('');
  const [shortIntro, setShortIntro] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormMessage('');

    let resumeFilePath: string | null = null;

    if (resumeFile) {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`; 
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (uploadError) {
        setFormError('Error uploading resume. Please try again.');
        console.error('Resume upload error:', uploadError);
        return;
      }
      resumeFilePath = fileName;
    }

    const { error } = await supabase
      .from('teacher_applications')
      .insert([{ 
        full_name: fullName, 
        email, 
        phone_number: phone, 
        instrument, 
        short_intro: shortIntro,
        resume_file_path: resumeFilePath 
      }]);

    if (error) {
      setFormError('There was an error sending your application. Please try again.');
      console.error('Application form error:', error);
    } else {
      setFormMessage('Thank you for your interest! We have received your application and will be in touch shortly.');
      setFullName('');
      setEmail('');
      setPhone('');
      setInstrument('');
      setShortIntro('');
      setResumeFile(null);
      const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
      if(fileInput) fileInput.value = '';
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-violet-50">
      <Header user={user} />
      <main className="flex-1">
        {/* Updated Hero Section */}
        <div 
          className="bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/piano-banner.jpg')" }}
        >
          <div className="bg-gradient-to-t from-yellow-50/80 to-orange-100/80 py-20">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Get in Touch with Lunatone Music School</h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-700">
                Whether you&apos;re ready to start your music journey or join our teaching team, we&apos;re here to help.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left Column: Contact Info & Map */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Our Studio</h3>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p>123 Music Lane, Surrey, BC, V3Z 2B9</p>
                  <p>(778) 555-1234</p>
                  <p>contact@lunatone.com</p>
                </div>
              </div>
              <div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83558.63691491227!2d-122.8943963428272!3d49.1043693445353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d877b0f4a5c9%3A0x2e8a4421b023e421!2sSurrey%2C%2C%20BC!5e0!3m2!1sen!2sca!4v1691821482813!5m2!1sen!2sca"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>

            {/* Right Column: Teacher Application Form */}
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">Join Our Teaching Team</h3>
              <p className="text-sm text-gray-600 mb-6">Are you a passionate music educator? We&apos;d love to hear from you.</p>
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <input type="text" placeholder="Full Name" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" />
                <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" />
                <input type="tel" placeholder="Phone Number" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" />
                <input type="text" placeholder="Primary Instrument(s)" required value={instrument} onChange={e => setInstrument(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" />
                <textarea placeholder="Short Intro (Optional)" rows={4} value={shortIntro} onChange={e => setShortIntro(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500" />
                <div>
                  <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-700">Resume (Optional)</label>
                  <input type="file" id="resume-upload" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:py-2 file:px-4 file:font-semibold file:text-violet-700 hover:file:bg-violet-100" />
                </div>
                <button type="submit" className="w-full rounded-md border border-transparent bg-violet-600 py-3 px-4 font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
                  Submit Application
                </button>
              </form>
              {formError && <p className="mt-4 text-center text-sm text-red-600">{formError}</p>}
              {formMessage && <p className="mt-4 text-center text-sm text-green-600">{formMessage}</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
