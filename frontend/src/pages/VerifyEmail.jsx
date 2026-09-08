import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);

        setMessage(response.data.message);

        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Email verification failed";

        setMessage(errorMessage);

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage("Invalid verification link");
      setLoading(false);
    }
  }, [token, navigate]);

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        {loading ? (
          <>
            <h2>Verifying Email...</h2>

            <p>Please wait while we verify your email address.</p>
          </>
        ) : (
          <>
            <h2>Email Verification</h2>

            <p>{message}</p>

            <button onClick={() => navigate("/login")}>Go to Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
