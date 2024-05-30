const RedirectingSpinner = ({ children }) => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-200 mb-4"></div>
      <h1 className="text-white">Redirecting to Dashboard...</h1>
      {children}
    </div>
  );
};

export default RedirectingSpinner;
