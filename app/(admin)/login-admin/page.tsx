"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
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
    alert("Login Successful!");
    window.location.href = "/admin-dashboard";
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
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-bg relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[450px]"
      >
        {/* Card Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-accent/20 rounded-2xl p-8 md:p-10 shadow-glow relative overflow-hidden group">
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Admin <span className="text-accent">Login</span>
            </h1>
            <p className="text-muted text-sm">
              Please enter your credentials to access the panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="text-sm font-medium text-text/80 ml-1"
              >
                Username / Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="admin@example.com"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full bg-bg/50 border ${
                    errors.username ? "border-red-500/50" : "border-border"
                  } rounded-xl py-3.5 pl-11 pr-4 text-text outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/50`}
                  aria-invalid={!!errors.username}
                  aria-describedby={errors.username ? "username-error" : undefined}
                />
              </div>
              {errors.username && (
                <p id="username-error" className="text-xs text-red-400 mt-1 ml-1">
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-sm font-medium text-text/80 ml-1"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-bg/50 border ${
                    errors.password ? "border-red-500/50" : "border-border"
                  } rounded-xl py-3.5 pl-11 pr-12 text-text outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-muted/50`}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-accent transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-xs text-red-400 mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-accent hover:bg-accent/90 disabled:opacity-70 disabled:cursor-not-allowed text-bg font-bold py-4 rounded-xl shadow-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2 border-2 border-white/10"
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login to Panel"
              )}
            </button>
          </form>
        </div>

        {/* Footer Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-muted/60 text-xs tracking-widest uppercase"
        >
          © 2026 Admin Panel • Global Technologies
        </motion.p>
      </motion.div>
    </div>
  );
}
