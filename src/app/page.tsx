import GetDirFiles from "./components/GetDirFiles";
import { UploadForm } from "./components/UploadForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <UploadForm />
      </div>
      <GetDirFiles />
    </main>
  );
}
