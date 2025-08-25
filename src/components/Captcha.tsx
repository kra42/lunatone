import { useEffect, useState, type FC } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  onChange: (token: string | null) => void;
}

const Captcha: FC<CaptchaProps> = ({ onChange }) => {
  const [isCaptchaEnabled, setIsCaptchaEnabled] = useState(false);

  useEffect(() => {
    // We check this in useEffect to avoid server/client mismatch issues.
    setIsCaptchaEnabled(process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === 'true');
  }, []);

  useEffect(() => {
    // If captcha is disabled, immediately pass a dummy token to allow form submission.
    if (!isCaptchaEnabled) {
      onChange('development-dummy-token');
    }
  }, [isCaptchaEnabled, onChange]);

  if (!isCaptchaEnabled) {
    return null; // Don't render anything if captcha is disabled.
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error('reCAPTCHA site key is not configured. Please set NEXT_PUBLIC_RECAPTCHA_SITE_KEY.');
    return <p className="text-sm text-red-500">reCAPTCHA not configured.</p>;
  }

  return <ReCAPTCHA sitekey={siteKey} onChange={onChange} />;
};

export default Captcha;

