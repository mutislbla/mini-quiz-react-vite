import { useState, useEffect } from "react";
import { login } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Login() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (token) {
      return navigate("/homepage");
    }
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: `fill username and password`,
      });
    }
    try {
      await login(email, password);
      navigate("/homepage");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <img
            src="https://i.pinimg.com/564x/a0/d1/13/a0d1139e1db44c3f40c7e8b9185af20a.jpg"
            width={250}
            className="mx-auto"
          />
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-600 rounded-lg duration-150">
            Sign in
          </button>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-red-600 hover:text-red-500"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
