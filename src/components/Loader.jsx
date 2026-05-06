const Loader = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-700"></div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
};

export default Loader;