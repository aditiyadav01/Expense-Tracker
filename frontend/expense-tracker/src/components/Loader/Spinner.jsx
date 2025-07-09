import React from 'react'

const Spinner = () => {
 return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-sm text-purple-600 font-medium">Loading...</p>
    </div>

  );
}

export default Spinner