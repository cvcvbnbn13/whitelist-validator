import '../styles/globals.css';
import ToolProvider from '../context/toolProvider';
import { useWLValidator } from '../context/toolProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ToolProvider>
      <Component {...pageProps} />
    </ToolProvider>
  );
}

export default MyApp;
