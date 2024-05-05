import FileExplorer from "./_components/FileExplorer";

export default function Home({
  searchParams,
}: {
  searchParams?: { path: string };
}) {
  // reading url path parameter
  const path = searchParams?.path ? searchParams?.path : "/";
  return (
    <main className="space-y-12 flex justify-center">
      <div className="max-w-4xl flex-1 h-screen">
        <FileExplorer path={path} />
      </div>
    </main>
  );
}
