import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiShield, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!formData.password.trim()) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-8 py-10 sm:px-10">
            <div className="mb-8 flex items-center gap-3 rounded-3xl bg-slate-100 px-4 py-3 text-slate-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                <FiShield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Secure task management</p>
                <p className="text-sm text-slate-500">Modern login experience for your team.</p>
              </div>
            </div>

            <div className="mb-8 max-w-xl">
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Sign in to your account</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">Access your tasks quickly with a clean and professional login flow.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <div className="relative">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    disabled={loading}
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <div className="relative">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    disabled={loading}
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Sign in"}
                <FiArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-600">
              New here?{' '}
              <Link to="/register" className="font-medium text-slate-900 hover:text-slate-700">Create an account</Link>
            </p>
          </div>

          <div className="hidden bg-slate-950 p-10 text-white lg:block">
            <div className="flex h-full flex-col justify-between rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-10">
              <div>
                <div className="mb-6 inline-flex rounded-2xl bg-white/10 px-4 py-2 text-sm text-slate-200">Professional task management</div>
                <h2 className="text-3xl font-semibold tracking-tight">Organized tasks, clearer days.</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">Fast access, polished workflows, and a welcoming landing experience for every user.</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Focus</p>
                  <p className="mt-2 text-sm text-slate-100">Stay productive with a clean, distraction-free login.</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Security</p>
                  <p className="mt-2 text-sm text-slate-100">Your session is protected with modern auth standards.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
