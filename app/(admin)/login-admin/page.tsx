"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", password: "" };

    if (!formData.username.trim()) {
      newErrors.username = "Username or Email is required";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const STATIC_USERNAME = "admin";
    const STATIC_PASSWORD = "Admin@123";

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      formData.username === STATIC_USERNAME &&
      formData.password === STATIC_PASSWORD
    ) {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin-dashboard");
    } else {
      setErrors({
        username: "",
        password: "Invalid username or password",
      });
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-6">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">

          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access the panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Username */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Username / Email
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Premium Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full mt-6 py-4 rounded-xl font-semibold text-white
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              hover:scale-[1.02]
              active:scale-[0.98]
              transition-all duration-300
              shadow-lg shadow-purple-500/30
              disabled:opacity-60 disabled:cursor-not-allowed
              flex items-center justify-center gap-2 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>

              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login to Panel"
                )}
              </span>
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
