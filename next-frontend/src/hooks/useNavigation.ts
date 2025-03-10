"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";

const useNavigation = () => {
  const router = useRouter(); // Get the Next.js router instance

  const navigate = (path: string) => {
    router.push(path); // Navigate to the specified path
  };

  return navigate;
};

export default useNavigation;
