
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

function VerifyEmail() {
  const { token } = useParams();
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    let isMounted = true;

    const verifyEmail = async () => {
      try {
        const res = await API.get(`/auth/verify-email/${token}`);

        if (isMounted) {
          setMsg(res.data.message);
        }
      } catch (err) {
        if (isMounted) {
          setMsg(err.response?.data?.detail || "Error");
        }
      }
    };

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-white text-xl">
      {msg}
    </div>
  );
}

export default VerifyEmail;