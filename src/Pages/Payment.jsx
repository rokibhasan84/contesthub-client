import { useParams, useNavigate } from "react-router-dom";
import axios from "../Api/axiosInstance";
import toast from "react-hot-toast";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePay = async () => {
    try {
      await axios.patch(`/contests/register/${id}`);
      toast.success("Payment successful!");
      navigate(`/contest/${id}`);
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="card bg-base-200 p-6">
        <h2 className="text-xl font-bold mb-4">Payment Page</h2>

        <button onClick={handlePay} className="btn btn-success">
          Pay Now
        </button>
      </div>
    </div>
  );
};
