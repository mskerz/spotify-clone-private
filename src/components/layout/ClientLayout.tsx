"use client";

import { useEffect, useState } from "react";

function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null;
    }
  
    return <>{children}</>;
  
}
export default ClientLayout