const RedirectingSpinner = ({ children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-200 "></div>
      {children}
      <h1>Redirecting to Dashboard...</h1>
    </div>
  );
};

export default RedirectingSpinner;
