import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function TopLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400); // speed control

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="fixed top-16 md:top-15.5 left-0 w-full z-50 ">
      {loading && (
        <div className="h-0.75 bg-linear-to-r from-cyan-500 to-purple-500 animate-[slide_0.4s_linear]" />
      )}
    </div>
  );
}

export default TopLoader;