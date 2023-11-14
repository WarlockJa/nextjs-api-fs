import GetDirFiles from "./components/GetDirFiles";
import { UploadForm } from "./components/UploadForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.upload}>
        <UploadForm />
      </div>
      <div className={styles.getfiles}>
        <GetDirFiles />
      </div>
    </main>
  );
}
