const Spinner = ({ children }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-slate-200 "></div>
      {children}
    </div>
  );
};

export default Spinner;
