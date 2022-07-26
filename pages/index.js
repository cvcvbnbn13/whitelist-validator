import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { CSVReader, InputSection, ResultSection } from '../components';
import { useWLValidator } from '../context/toolProvider';

export default function Home() {
  const { csvTokenIDs, inputValue } = useWLValidator();

  return (
    <div className={styles.container}>
      <Head>
        <title>WhiteList-Validator</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.csvreader_container}>
        <label>
          Upload WhiteList CSV to Check Address is in WhiteList or not
        </label>
        <p>
          You can (
          <a href="./whitelist-example.csv" download>
            download csv example here.
          </a>
          ) please make sure your WhiteList is correct.
        </p>
        <CSVReader />
      </div>
      <div className={styles.inputsection}>
        <InputSection />
      </div>
      <div className={styles.resultsection}>
        <ResultSection />
      </div>
    </div>
  );
}
