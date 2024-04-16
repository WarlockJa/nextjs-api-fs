import FileExplorer from "./_components/FileExplorer";
import GetDirFiles from "./_components/GetDirFiles";
import { UploadForm } from "./_components/UploadForm";
import styles from "./page.module.css";

export default function Home({
  searchParams,
}: {
  searchParams?: { path: string };
}) {
  // reading url path parameter
  const path = searchParams?.path ? searchParams?.path : "/";

  return (
    <main className={styles.main}>
      <div className={styles.upload}>
        <UploadForm />
      </div>
      {/* <div className={styles.getfiles}>
        <GetDirFiles />
      </div> */}
      <FileExplorer path={path} />
    </main>
  );
}
