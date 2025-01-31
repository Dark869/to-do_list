import HeaderNoProtectedPages from '../components/HeaderNoProtectedPages';

function Error404Page() {
  return (
    <div className="bg-zinc-800 min-h-screen">
      <HeaderNoProtectedPages />
      <h1 className="text-white">Error 404 - Page Not Found</h1>
    </div>
  );
}

export default Error404Page;