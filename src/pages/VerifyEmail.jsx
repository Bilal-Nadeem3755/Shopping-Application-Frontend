import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../utils/api";

function VerifyEmail() {
  const { token } = useParams();
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    API.get(`/auth/verify-email/${token}`)
      .then((res) => setMsg(res.data.message))
      .catch((err) =>
        setMsg(err.response?.data?.detail || "Error")
      );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-white text-xl">
      {msg}
    </div>
  );
}

export default VerifyEmail;