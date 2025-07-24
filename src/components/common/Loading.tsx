"use client";

const LoadingDots = () => {
  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-blue-700 dark:bg-blue-400 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-blue-700 dark:bg-blue-400 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-blue-700 dark:bg-blue-400 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
};

export default LoadingDots;
