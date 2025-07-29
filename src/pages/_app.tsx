import '../../styles/globals.css';
import type { AppProps } from 'next/app';

// This is the main component that wraps every page in your application.
// Global styles are imported here to ensure they apply everywhere.
function MyApp({ Component, pageProps }: AppProps) {
  // The typo 'page-props' has been corrected to 'pageProps'
  return <Component {...pageProps} />;
}

export default MyApp;
