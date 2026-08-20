import { useState } from "react";
import { useLocation } from "wouter";
import { API_URL } from "@/api/client";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("admin@digiscaleinfotech.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("digiscale_admin_token", data.token);
      localStorage.setItem("digiscale_admin_user", JSON.stringify(data.admin));

      setLocation("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B1D0E] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C6D6B1]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#112D16]/40 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#112D16] text-[#C6D6B1] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-[#C6D6B1]/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-[#112D16]">Admin Management Portal</h1>
          <p className="text-xs text-[#112D16]/70 mt-1 font-medium">
            DigiScale Infotech Client & Lead Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#112D16]/70 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#112D16]/40 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#112D16]/5 border border-[#112D16]/15 rounded-xl text-sm font-semibold text-[#112D16] focus:outline-none focus:ring-2 focus:ring-[#112D16]/30 transition-all"
                placeholder="admin@digiscaleinfotech.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#112D16]/70 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#112D16]/40 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[#112D16]/5 border border-[#112D16]/15 rounded-xl text-sm font-semibold text-[#112D16] focus:outline-none focus:ring-2 focus:ring-[#112D16]/30 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#112D16] text-[#C6D6B1] hover:bg-[#1a4020] rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-[#112D16]/10 text-center">
          <p className="text-[11px] text-[#112D16]/60 font-medium">
            Default Demo Credentials: <span className="font-bold text-[#112D16]">admin@digiscaleinfotech.com</span> / <span className="font-bold text-[#112D16]">admin123</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
