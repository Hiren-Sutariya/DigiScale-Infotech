import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { API_URL } from "@/api/client";
import {
  MessageSquare,
  Briefcase,
  Users,
  Search,
  LogOut,
  Trash2,
  ExternalLink,
  Phone,
  Mail,
  RefreshCw,
  FileText,
  ChevronDown,
  Check,
  ShieldCheck,
  Download,
  Copy,
  CheckCircle2,
  X,
  Eye,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Inquiry {
  id: number;
  type?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: string;
  created_at: string;
}

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  portfolio_url: string;
  resume_filename?: string;
  resume_data?: string;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalApplications: number;
  pendingApplications: number;
  newsletterSubscribers: number;
}

// ----------------------------------------------------
// CUSTOM STATUS DROPDOWN COMPONENT
// ----------------------------------------------------
function StatusDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string; colorClass: string }[];
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 6,
        left: rect.right - 144,
      });
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      if (open) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, [open]);

  const currentOption = options.find((opt) => opt.value.toLowerCase() === (value || "").toLowerCase()) || options[0];

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleOpen}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${currentOption.colorClass}`}
      >
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 999999,
          }}
          className="w-40 bg-[#0B1D0E] border border-white/15 rounded-2xl shadow-2xl p-1.5 font-sans"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt.value);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer my-0.5 ${
                value.toLowerCase() === opt.value.toLowerCase()
                  ? "bg-emerald-500 text-[#0B1D0E] font-bold"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>{opt.label}</span>
              {value.toLowerCase() === opt.value.toLowerCase() && <Check className="w-3.5 h-3.5 text-[#0B1D0E]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"inquiries" | "applications">("inquiries");

  const [stats, setStats] = useState<Stats>({
    totalInquiries: 0,
    newInquiries: 0,
    totalApplications: 0,
    pendingApplications: 0,
    newsletterSubscribers: 0,
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Detail Modals State
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Filters & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("All");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("digiscale_admin_token");
    if (!storedToken) {
      setLocation("/admin/login");
    } else {
      setToken(storedToken);
      fetchData(storedToken);
    }
  }, []);

  const fetchData = async (authToken: string) => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      // 1. Fetch Stats
      const statsRes = await fetch(`${API_URL}/admin/stats`, { headers });
      if (statsRes.status === 401) {
        handleLogout();
        return;
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats({
          totalInquiries: statsData.total_inquiries || 0,
          newInquiries: statsData.new_inquiries || 0,
          totalApplications: statsData.total_applications || 0,
          pendingApplications: statsData.pending_applications || 0,
          newsletterSubscribers: statsData.newsletter_subscribers || 0,
        });
      }

      // 2. Fetch Inquiries
      const inqRes = await fetch(`${API_URL}/admin/inquiries`, { headers });
      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }

      // 3. Fetch Applications
      const appRes = await fetch(`${API_URL}/admin/applications`, { headers });
      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData);
      }
    } catch (err) {
      console.error("Error fetching admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("digiscale_admin_token");
    localStorage.removeItem("digiscale_admin_user");
    setLocation("/admin/login");
  };

  // Copy helper
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Update Inquiry Status
  const updateInquiryStatus = async (id: number, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        if (token) fetchData(token);
      }
    } catch (err) {
      console.error("Failed to update inquiry status", err);
    }
  };

  // Delete Inquiry
  const deleteInquiry = async (id: number) => {
    if (!token || !window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
        if (selectedInquiry && selectedInquiry.id === id) setSelectedInquiry(null);
        if (token) fetchData(token);
      }
    } catch (err) {
      console.error("Failed to delete inquiry", err);
    }
  };

  // Update Application Status
  const updateApplicationStatus = async (id: number, newStatus: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        if (token) fetchData(token);
      }
    } catch (err) {
      console.error("Failed to update application status", err);
    }
  };

  // Delete Application
  const deleteApplication = async (id: number) => {
    if (!token || !window.confirm("Are you sure you want to delete this job application?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((item) => item.id !== id));
        if (selectedApplication && selectedApplication.id === id) setSelectedApplication(null);
        if (token) fetchData(token);
      }
    } catch (err) {
      console.error("Failed to delete application", err);
    }
  };

  // CSV Exporter
  const exportInquiriesCSV = () => {
    const headers = ["ID", "Type", "Name", "Email", "Phone", "Company", "Service", "Budget", "Message", "Status", "Date"];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${(i.type || 'contact').replace(/"/g, '""')}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
      `"${new Date(i.created_at).toLocaleDateString('en-IN')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digiscale_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportApplicationsCSV = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Position", "Portfolio URL", "Resume File", "Message", "Status", "Date"];
    const rows = filteredApplications.map((a) => [
      a.id,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.position || '').replace(/"/g, '""')}"`,
      `"${(a.portfolio_url || '').replace(/"/g, '""')}"`,
      `"${(a.resume_filename || '').replace(/"/g, '""')}"`,
      `"${(a.message || '').replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${new Date(a.created_at).toLocaleDateString('en-IN')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `digiscale_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Lists
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus =
      inquiryStatusFilter === "All" || item.status.toLowerCase() === inquiryStatusFilter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.service || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredApplications = applications.filter((item) => {
    const matchesStatus =
      applicationStatusFilter === "All" || item.status.toLowerCase() === applicationStatusFilter.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.phone || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.position || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.message || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const inquiryStatusOptions = [
    { label: "New", value: "new", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { label: "Contacted", value: "contacted", colorClass: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { label: "In Progress", value: "in_progress", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
    { label: "Closed", value: "closed", colorClass: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  ];

  const applicationStatusOptions = [
    { label: "New", value: "new", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { label: "Reviewed", value: "reviewed", colorClass: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
    { label: "Shortlisted", value: "shortlisted", colorClass: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { label: "Rejected", value: "rejected", colorClass: "bg-red-500/20 text-red-300 border-red-500/30" },
  ];

  return (
    <div className="min-h-screen bg-[#051107] font-sans flex flex-col text-white antialiased selection:bg-emerald-500 selection:text-[#051107]">
      {/* Dynamic Background Glow */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C6D6B1]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Top Admin Header */}
      <header className="bg-[#0B1D0E]/90 backdrop-blur-xl py-4 px-6 md:px-10 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-[#051107] font-bold shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">DigiScale Infotech</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                Admin OS
              </span>
            </div>
            <p className="text-[11px] text-white/50 font-medium hidden sm:block">Client Leads & Career Applicants Portal</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => token && fetchData(token)}
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-white text-xs font-bold flex items-center gap-2 cursor-pointer active:scale-95"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-400 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Refresh Live Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-[1800px] mx-auto w-full">
        {/* Toast Copy Alert */}
        <AnimatePresence>
          {copiedText && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-8 z-50 bg-emerald-500 text-[#051107] font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Copied {copiedText} to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top 4 Interactive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Total Inquiries */}
          <div className="bg-[#0B1D0E]/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">Total Inquiries</span>
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.totalInquiries}</h3>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Live Submissions
              </span>
            </div>
          </div>

          {/* Card 2: New Unread Leads */}
          <div className="bg-[#0B1D0E]/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">New Pending Leads</span>
              <div className="w-10 h-10 bg-teal-500/10 border border-teal-500/20 rounded-2xl flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">{stats.newInquiries}</h3>
              <span className="px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                Action Required
              </span>
            </div>
          </div>

          {/* Card 3: Job Applications */}
          <div className="bg-[#0B1D0E]/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">Job Applications</span>
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Briefcase className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">{stats.totalApplications}</h3>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                Candidates
              </span>
            </div>
          </div>

          {/* Card 4: Newsletter Subscribers */}
          <div className="bg-[#0B1D0E]/80 border border-white/10 p-6 rounded-3xl backdrop-blur-xl shadow-xl hover:border-emerald-500/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/50">Newsletter Audience</span>
              <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">{stats.newsletterSubscribers}</h3>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                Subscribers
              </span>
            </div>
          </div>
        </div>

        {/* Tab Selector & Controls Bar */}
        <div className="bg-[#0B1D0E]/90 border border-white/10 rounded-3xl p-4 mb-8 backdrop-blur-xl shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Segmented Tabs */}
          <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === "inquiries"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-[#051107] shadow-lg shadow-emerald-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Client Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold tracking-wide transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === "applications"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-[#051107] shadow-lg shadow-emerald-500/20 font-black"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Applications ({applications.length})</span>
            </button>
          </div>

          {/* Search, Filter & CSV Export Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white placeholder:text-white/30 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            {/* Status Filter Dropdown */}
            {activeTab === "inquiries" ? (
              <StatusDropdown
                value={inquiryStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-white/10 text-white border-white/15" },
                  { label: "New", value: "new", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
                  { label: "Contacted", value: "contacted", colorClass: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
                  { label: "In Progress", value: "in_progress", colorClass: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
                  { label: "Closed", value: "closed", colorClass: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
                ]}
                onChange={(val) => setInquiryStatusFilter(val)}
              />
            ) : (
              <StatusDropdown
                value={applicationStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-white/10 text-white border-white/15" },
                  { label: "New", value: "new", colorClass: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
                  { label: "Reviewed", value: "reviewed", colorClass: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
                  { label: "Shortlisted", value: "shortlisted", colorClass: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
                  { label: "Rejected", value: "rejected", colorClass: "bg-red-500/20 text-red-300 border-red-500/30" },
                ]}
                onChange={(val) => setApplicationStatusFilter(val)}
              />
            )}

            {/* CSV Export Button */}
            <button
              onClick={activeTab === "inquiries" ? exportInquiriesCSV : exportApplicationsCSV}
              className="px-4 py-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Export to Excel / CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: CLIENT INQUIRIES ================= */}
        {activeTab === "inquiries" && (
          <div className="bg-[#0B1D0E]/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-white/5 text-white/50 text-[11px] font-extrabold uppercase tracking-wider border-b border-white/10">
                    <th className="py-4 px-6 w-16">ID</th>
                    <th className="py-4 px-6">Client Name</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Mobile / Phone</th>
                    <th className="py-4 px-6">Service & Company</th>
                    <th className="py-4 px-6 max-w-xs">Message Excerpt</th>
                    <th className="py-4 px-6 w-36">Status</th>
                    <th className="py-4 px-6 w-32">Date</th>
                    <th className="py-4 px-6 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-16 text-white/40 font-semibold">
                        No inquiries found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-6 font-bold text-white/30">#{item.id}</td>

                        {/* Client Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {item.name ? item.name.charAt(0).toUpperCase() : "C"}
                            </div>
                            <span className="font-extrabold text-white text-sm group-hover:text-emerald-400 transition-colors">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-white/80 font-medium">
                            <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:text-emerald-400 hover:underline">
                              {item.email}
                            </a>
                            <button
                              onClick={() => copyToClipboard(item.email, "Email")}
                              className="text-white/30 hover:text-white p-1 rounded transition-colors"
                              title="Copy Email"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-4 px-6">
                          {item.phone ? (
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                              </a>
                            </div>
                          ) : (
                            <span className="text-white/30 italic">N/A</span>
                          )}
                        </td>

                        {/* Service & Company */}
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold rounded-lg text-[11px] inline-block mb-1">
                            {item.service}
                          </span>
                          {item.company && (
                            <span className="block text-[11px] font-semibold text-white/60">
                              {item.company}
                            </span>
                          )}
                        </td>

                        {/* Message Preview */}
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-white/70 truncate max-w-[240px] font-medium" title={item.message}>
                            {item.message}
                          </p>
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-6">
                          <StatusDropdown
                            value={item.status}
                            options={inquiryStatusOptions}
                            onChange={(val) => updateInquiryStatus(item.id, val)}
                          />
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-white/40 font-medium whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedInquiry(item)}
                              className="p-2 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer border border-white/10"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-xl transition-all cursor-pointer border border-red-500/20"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 2: JOB APPLICATIONS ================= */}
        {activeTab === "applications" && (
          <div className="bg-[#0B1D0E]/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-white/5 text-white/50 text-[11px] font-extrabold uppercase tracking-wider border-b border-white/10">
                    <th className="py-4 px-6 w-16">ID</th>
                    <th className="py-4 px-6">Applicant Name</th>
                    <th className="py-4 px-6">Applied Position</th>
                    <th className="py-4 px-6">Email Address</th>
                    <th className="py-4 px-6">Mobile Number</th>
                    <th className="py-4 px-6">Resume Attachment</th>
                    <th className="py-4 px-6 w-36">Status</th>
                    <th className="py-4 px-6 w-32">Date</th>
                    <th className="py-4 px-6 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-16 text-white/40 font-semibold">
                        No job applications found matching your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                        <td className="py-4 px-6 font-bold text-white/30">#{item.id}</td>

                        {/* Name */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                              {item.name ? item.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <span className="font-extrabold text-white text-sm group-hover:text-purple-300 transition-colors">
                              {item.name}
                            </span>
                          </div>
                        </td>

                        {/* Position */}
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold rounded-lg text-xs">
                            {item.position}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-white/80 font-medium">
                            <Mail className="w-3.5 h-3.5 text-white/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:text-purple-300 hover:underline">
                              {item.email}
                            </a>
                          </div>
                        </td>

                        {/* Mobile Number */}
                        <td className="py-4 px-6">
                          {item.phone ? (
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                              <Phone className="w-3.5 h-3.5 shrink-0" />
                              <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                              </a>
                            </div>
                          ) : (
                            <span className="text-white/30 italic">N/A</span>
                          )}
                        </td>

                        {/* Resume File Attachment */}
                        <td className="py-4 px-6">
                          {item.resume_data ? (
                            <a
                              href={item.resume_data}
                              download={item.resume_filename || `resume_${item.name}.pdf`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold transition-all shadow-sm group"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{item.resume_filename || "Download Resume"}</span>
                              <Download className="w-3 h-3 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
                            </a>
                          ) : item.portfolio_url ? (
                            <a
                              href={item.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold transition-all shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                              <span>View Portfolio</span>
                            </a>
                          ) : (
                            <span className="text-white/30 italic">No attachment</span>
                          )}
                        </td>

                        {/* Status Dropdown */}
                        <td className="py-4 px-6">
                          <StatusDropdown
                            value={item.status}
                            options={applicationStatusOptions}
                            onChange={(val) => updateApplicationStatus(item.id, val)}
                          />
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-white/40 font-medium whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedApplication(item)}
                              className="p-2 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white rounded-xl transition-all cursor-pointer border border-white/10"
                              title="View Full Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteApplication(item.id)}
                              className="p-2 bg-red-500/10 hover:bg-red-500/30 text-red-400 rounded-xl transition-all cursor-pointer border border-red-500/20"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL: INQUIRY DETAILS DRAWER ================= */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B1D0E] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider mb-2 inline-block">
                    Inquiry Details #{selectedInquiry.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">{selectedInquiry.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Email</span>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-xs font-bold text-emerald-400 hover:underline">
                      {selectedInquiry.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedInquiry.email, "Email")}
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Mobile</span>
                  <div className="flex items-center justify-between">
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} className="text-xs font-bold text-emerald-400 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-xs text-white/40 italic">Not provided</span>
                    )}
                    {selectedInquiry.phone && (
                      <button
                        onClick={() => copyToClipboard(selectedInquiry.phone, "Phone")}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Required Service</span>
                  <span className="text-xs font-extrabold text-white">{selectedInquiry.service}</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Company / Budget</span>
                  <span className="text-xs font-extrabold text-white">
                    {selectedInquiry.company || selectedInquiry.budget || "N/A"}
                  </span>
                </div>
              </div>

              {/* Message Box */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">Message Payload</span>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs leading-relaxed font-normal text-white/90 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <StatusDropdown
                  value={selectedInquiry.status}
                  options={inquiryStatusOptions}
                  onChange={(val) => updateInquiryStatus(selectedInquiry.id, val)}
                />

                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Inquiry</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: APPLICATION DETAILS DRAWER ================= */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0B1D0E] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-extrabold uppercase tracking-wider mb-2 inline-block">
                    Job Application #{selectedApplication.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">{selectedApplication.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-9 h-9 rounded-2xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Email</span>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${selectedApplication.email}`} className="text-xs font-bold text-purple-300 hover:underline">
                      {selectedApplication.email}
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Mobile</span>
                  <span className="text-xs font-extrabold text-white">{selectedApplication.phone}</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Applied Position</span>
                  <span className="text-xs font-extrabold text-purple-300">{selectedApplication.position}</span>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Resume File</span>
                  {selectedApplication.resume_data ? (
                    <a
                      href={selectedApplication.resume_data}
                      download={selectedApplication.resume_filename || `resume_${selectedApplication.name}.pdf`}
                      className="text-xs font-extrabold text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{selectedApplication.resume_filename || "Download PDF"}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-white/40 italic">No resume attached</span>
                  )}
                </div>
              </div>

              {/* Portfolio Link */}
              {selectedApplication.portfolio_url && (
                <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-wider block mb-1">Portfolio / GitHub Link</span>
                  <a
                    href={selectedApplication.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-purple-300 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{selectedApplication.portfolio_url}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Message */}
              {selectedApplication.message && (
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider block mb-2">Cover Message</span>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs leading-relaxed font-normal text-white/90 whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {selectedApplication.message}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <StatusDropdown
                  value={selectedApplication.status}
                  options={applicationStatusOptions}
                  onChange={(val) => updateApplicationStatus(selectedApplication.id, val)}
                />

                <button
                  onClick={() => deleteApplication(selectedApplication.id)}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Application</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
