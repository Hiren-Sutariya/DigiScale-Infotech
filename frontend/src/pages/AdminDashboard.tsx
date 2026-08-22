import { useState, useEffect } from "react";
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
  ShieldCheck,
  Download,
  Copy,
  CheckCircle2,
  X,
  Eye,
  Sparkles,
  ChevronDown,
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
// BULLETPROOF NATIVE & STYLED STATUS DROPDOWN
// ----------------------------------------------------
function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string; colorClass: string }[];
  onChange: (val: string) => void;
}) {
  const currentOption =
    options.find((opt) => opt.value.toLowerCase() === (value || "").toLowerCase()) || options[0];

  return (
    <div className="relative inline-block">
      <select
        value={value ? value.toLowerCase() : options[0].value.toLowerCase()}
        onChange={(e) => onChange(e.target.value)}
        className={`px-3 py-1.5 pr-7 rounded-full text-xs font-bold border appearance-none cursor-pointer focus:outline-none transition-all shadow-sm ${currentOption.colorClass}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-[#112D16] font-semibold">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
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

  // CSV Exporters
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
    { label: "New", value: "new", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { label: "Contacted", value: "contacted", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
    { label: "In Progress", value: "in_progress", colorClass: "bg-amber-100 text-amber-800 border-amber-300" },
    { label: "Closed", value: "closed", colorClass: "bg-gray-100 text-gray-700 border-gray-300" },
  ];

  const applicationStatusOptions = [
    { label: "New", value: "new", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { label: "Reviewed", value: "reviewed", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
    { label: "Shortlisted", value: "shortlisted", colorClass: "bg-purple-100 text-purple-800 border-purple-300" },
    { label: "Rejected", value: "rejected", colorClass: "bg-red-100 text-red-800 border-red-300" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F2] font-sans flex flex-col text-[#112D16] antialiased">
      {/* Top Admin Header */}
      <header className="bg-[#112D16] text-white py-4 px-4 sm:px-6 md:px-10 flex flex-wrap items-center justify-between gap-3 shadow-xl sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#C6D6B1]/20 rounded-2xl flex items-center justify-center text-[#C6D6B1] font-bold shadow-md border border-[#C6D6B1]/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">DigiScale Infotech</span>
              <span className="px-2 py-0.5 rounded-full bg-[#C6D6B1]/20 border border-[#C6D6B1]/30 text-[#C6D6B1] text-[10px] font-bold uppercase tracking-wider">
                Admin OS
              </span>
            </div>
            <p className="text-[11px] text-[#C6D6B1]/70 font-medium hidden sm:block">Client Leads & Career Portal Management</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
          <button
            onClick={() => token && fetchData(token)}
            className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white text-xs font-bold flex items-center gap-2 cursor-pointer active:scale-95 border border-white/10"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 text-[#C6D6B1] ${loading ? "animate-spin" : ""}`} />
            <span className="hidden md:inline">Refresh Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-[1800px] mx-auto w-full">
        {/* Toast Alert */}
        <AnimatePresence>
          {copiedText && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-4 sm:right-8 z-50 bg-[#112D16] text-[#C6D6B1] font-bold text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-[#C6D6B1]/30"
            >
              <CheckCircle2 className="w-4 h-4 text-[#C6D6B1]" />
              <span>Copied {copiedText} to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metric Cards - 100% Mobile Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {/* Card 1: Total Inquiries */}
          <div className="bg-white border border-[#112D16]/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#112D16]/60">Total Inquiries</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#112D16]/10 rounded-xl flex items-center justify-center text-[#112D16]">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#112D16] tracking-tight">{stats.totalInquiries}</h3>
          </div>

          {/* Card 2: New Leads */}
          <div className="bg-white border border-[#112D16]/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#112D16]/60">New Leads</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-emerald-700 tracking-tight">{stats.newInquiries}</h3>
          </div>

          {/* Card 3: Job Applications */}
          <div className="bg-white border border-[#112D16]/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#112D16]/60">Job Applications</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-700">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#112D16] tracking-tight">{stats.totalApplications}</h3>
          </div>

          {/* Card 4: Newsletter Subscribers */}
          <div className="bg-white border border-[#112D16]/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#112D16]/60">Subscribers</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-700 tracking-tight">{stats.newsletterSubscribers}</h3>
          </div>
        </div>

        {/* Tab & Controls Section - Mobile Friendly Stack */}
        <div className="bg-white border border-[#112D16]/10 rounded-2xl sm:rounded-3xl p-4 mb-6 sm:mb-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 bg-[#112D16]/5 p-1.5 rounded-xl sm:rounded-2xl border border-[#112D16]/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "inquiries"
                  ? "bg-[#112D16] text-[#C6D6B1] shadow-md"
                  : "text-[#112D16]/70 hover:text-[#112D16]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "applications"
                  ? "bg-[#112D16] text-[#C6D6B1] shadow-md"
                  : "text-[#112D16]/70 hover:text-[#112D16]"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Applications ({applications.length})</span>
            </button>
          </div>

          {/* Search, Filter & CSV Controls */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-grow min-w-[200px]">
              <Search className="w-4 h-4 text-[#112D16]/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#112D16]/5 border border-[#112D16]/15 rounded-xl text-xs font-semibold text-[#112D16] focus:outline-none focus:ring-2 focus:ring-[#112D16]/20"
              />
            </div>

            {/* Status Select Filter */}
            {activeTab === "inquiries" ? (
              <StatusSelect
                value={inquiryStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-[#112D16]/10 text-[#112D16] border-[#112D16]/20" },
                  { label: "New", value: "new", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
                  { label: "Contacted", value: "contacted", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
                  { label: "In Progress", value: "in_progress", colorClass: "bg-amber-100 text-amber-800 border-amber-300" },
                  { label: "Closed", value: "closed", colorClass: "bg-gray-100 text-gray-700 border-gray-300" },
                ]}
                onChange={(val) => setInquiryStatusFilter(val)}
              />
            ) : (
              <StatusSelect
                value={applicationStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-[#112D16]/10 text-[#112D16] border-[#112D16]/20" },
                  { label: "New", value: "new", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
                  { label: "Reviewed", value: "reviewed", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
                  { label: "Shortlisted", value: "shortlisted", colorClass: "bg-purple-100 text-purple-800 border-purple-300" },
                  { label: "Rejected", value: "rejected", colorClass: "bg-red-100 text-red-800 border-red-300" },
                ]}
                onChange={(val) => setApplicationStatusFilter(val)}
              />
            )}

            {/* CSV Export Button */}
            <button
              onClick={activeTab === "inquiries" ? exportInquiriesCSV : exportApplicationsCSV}
              className="px-3.5 py-2 bg-[#112D16]/10 hover:bg-[#112D16]/20 text-[#112D16] border border-[#112D16]/20 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Export to Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: CLIENT INQUIRIES ================= */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-[#112D16]/10 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5 w-14">ID</th>
                    <th className="py-3.5 px-5">Client Name</th>
                    <th className="py-3.5 px-5">Email Address</th>
                    <th className="py-3.5 px-5">Phone Number</th>
                    <th className="py-3.5 px-5">Service Required</th>
                    <th className="py-3.5 px-5 max-w-xs">Message</th>
                    <th className="py-3.5 px-5 w-36">Status</th>
                    <th className="py-3.5 px-5 w-28">Date</th>
                    <th className="py-3.5 px-5 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#112D16]/10 text-xs">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-[#112D16]/60 font-medium">
                        No inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-[#112D16]/2 transition-colors">
                        <td className="py-4 px-5 font-bold text-[#112D16]/50">#{item.id}</td>

                        {/* Name */}
                        <td className="py-4 px-5 font-bold text-[#112D16]">{item.name}</td>

                        {/* Email */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-[#112D16] font-semibold">
                            <Mail className="w-3.5 h-3.5 text-[#112D16]/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:underline">
                              {item.email}
                            </a>
                            <button
                              onClick={() => copyToClipboard(item.email, "Email")}
                              className="text-[#112D16]/30 hover:text-[#112D16] p-1 rounded transition-colors"
                              title="Copy Email"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-4 px-5">
                          {item.phone ? (
                            <div className="flex items-center gap-1.5 text-[#112D16] font-bold">
                              <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                              </a>
                            </div>
                          ) : (
                            <span className="text-[#112D16]/40 italic text-[11px]">N/A</span>
                          )}
                        </td>

                        {/* Service */}
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-semibold rounded-md text-[11px] inline-block mb-1">
                            {item.service}
                          </span>
                          {item.company && (
                            <span className="block text-[10px] font-bold text-[#112D16]/60">
                              {item.company}
                            </span>
                          )}
                        </td>

                        {/* Message Preview */}
                        <td className="py-4 px-5 max-w-xs">
                          <p className="truncate max-w-[200px] text-[#112D16]/80 font-normal" title={item.message}>
                            {item.message}
                          </p>
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-5">
                          <StatusSelect
                            value={item.status}
                            options={inquiryStatusOptions}
                            onChange={(val) => updateInquiryStatus(item.id, val)}
                          />
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 text-[#112D16]/60 font-medium whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInquiry(item)}
                              className="p-2 bg-[#112D16]/5 hover:bg-[#112D16]/15 text-[#112D16] rounded-lg transition-all cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              className="p-2 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-lg transition-all cursor-pointer"
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
          <div className="bg-white border border-[#112D16]/10 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5 w-14">ID</th>
                    <th className="py-3.5 px-5">Applicant Name</th>
                    <th className="py-3.5 px-5">Applied Position</th>
                    <th className="py-3.5 px-5">Email Address</th>
                    <th className="py-3.5 px-5">Phone Number</th>
                    <th className="py-3.5 px-5">Resume Attachment</th>
                    <th className="py-3.5 px-5 w-36">Status</th>
                    <th className="py-3.5 px-5 w-28">Date</th>
                    <th className="py-3.5 px-5 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#112D16]/10 text-xs">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-12 text-[#112D16]/60 font-medium">
                        No job applications found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((item) => (
                      <tr key={item.id} className="hover:bg-[#112D16]/2 transition-colors">
                        <td className="py-4 px-5 font-bold text-[#112D16]/50">#{item.id}</td>

                        {/* Name */}
                        <td className="py-4 px-5 font-bold text-[#112D16]">{item.name}</td>

                        {/* Position */}
                        <td className="py-4 px-5">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold rounded-lg text-xs">
                            {item.position}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-5 font-semibold text-[#112D16]">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#112D16]/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:underline">
                              {item.email}
                            </a>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="py-4 px-5">
                          {item.phone ? (
                            <div className="flex items-center gap-1.5 text-[#112D16] font-bold">
                              <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                              </a>
                            </div>
                          ) : (
                            <span className="text-[#112D16]/40 italic text-[11px]">N/A</span>
                          )}
                        </td>

                        {/* Resume File */}
                        <td className="py-4 px-5">
                          {item.resume_data ? (
                            <a
                              href={item.resume_data}
                              download={item.resume_filename || `resume_${item.name}.pdf`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-sm"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-700" />
                              <span>{item.resume_filename || "Download Resume"}</span>
                              <Download className="w-3 h-3 text-emerald-600" />
                            </a>
                          ) : item.portfolio_url ? (
                            <a
                              href={item.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-300 rounded-lg text-xs font-bold transition-all shadow-sm"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
                              <span>View Portfolio</span>
                            </a>
                          ) : (
                            <span className="text-[#112D16]/40 italic text-[11px]">No attachment</span>
                          )}
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-5">
                          <StatusSelect
                            value={item.status}
                            options={applicationStatusOptions}
                            onChange={(val) => updateApplicationStatus(item.id, val)}
                          />
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 text-[#112D16]/60 font-medium whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>

                        {/* Action */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedApplication(item)}
                              className="p-2 bg-[#112D16]/5 hover:bg-[#112D16]/15 text-[#112D16] rounded-lg transition-all cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteApplication(item.id)}
                              className="p-2 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-lg transition-all cursor-pointer"
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedInquiry(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#112D16]/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#112D16]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#112D16]/10 mb-6">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                    Inquiry Details #{selectedInquiry.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#112D16]">{selectedInquiry.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-9 h-9 rounded-full bg-[#112D16]/5 hover:bg-[#112D16]/10 text-[#112D16] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Email Address</span>
                  <div className="flex items-center justify-between">
                    <a href={`mailto:${selectedInquiry.email}`} className="text-xs font-bold text-[#112D16] hover:underline">
                      {selectedInquiry.email}
                    </a>
                    <button
                      onClick={() => copyToClipboard(selectedInquiry.email, "Email")}
                      className="text-[#112D16]/40 hover:text-[#112D16] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Mobile Phone</span>
                  <div className="flex items-center justify-between">
                    {selectedInquiry.phone ? (
                      <a href={`tel:${selectedInquiry.phone}`} className="text-xs font-bold text-emerald-700 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="text-xs text-[#112D16]/40 italic">Not provided</span>
                    )}
                  </div>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Service Required</span>
                  <span className="text-xs font-bold text-[#112D16]">{selectedInquiry.service}</span>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Company / Budget</span>
                  <span className="text-xs font-bold text-[#112D16]">
                    {selectedInquiry.company || selectedInquiry.budget || "N/A"}
                  </span>
                </div>
              </div>

              {/* Message Box */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-2">Message Payload</span>
                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10 text-xs leading-relaxed font-normal text-[#112D16] whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#112D16]/10">
                <StatusSelect
                  value={selectedInquiry.status}
                  options={inquiryStatusOptions}
                  onChange={(val) => updateInquiryStatus(selectedInquiry.id, val)}
                />

                <button
                  onClick={() => deleteInquiry(selectedInquiry.id)}
                  className="px-4 py-2 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-[#112D16]/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden text-[#112D16]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#112D16]/10 mb-6">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-1 inline-block">
                    Job Application #{selectedApplication.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#112D16]">{selectedApplication.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="w-9 h-9 rounded-full bg-[#112D16]/5 hover:bg-[#112D16]/10 text-[#112D16] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Email Address</span>
                  <a href={`mailto:${selectedApplication.email}`} className="text-xs font-bold text-[#112D16] hover:underline block">
                    {selectedApplication.email}
                  </a>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Mobile Phone</span>
                  <span className="text-xs font-bold text-[#112D16]">{selectedApplication.phone}</span>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Applied Position</span>
                  <span className="text-xs font-bold text-purple-800">{selectedApplication.position}</span>
                </div>

                <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Resume File</span>
                  {selectedApplication.resume_data ? (
                    <a
                      href={selectedApplication.resume_data}
                      download={selectedApplication.resume_filename || `resume_${selectedApplication.name}.pdf`}
                      className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{selectedApplication.resume_filename || "Download Resume"}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-[#112D16]/40 italic">No file attached</span>
                  )}
                </div>
              </div>

              {/* Portfolio Link */}
              {selectedApplication.portfolio_url && (
                <div className="mb-6 bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10">
                  <span className="text-[10px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-1">Portfolio / GitHub Link</span>
                  <a
                    href={selectedApplication.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-purple-800 hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>{selectedApplication.portfolio_url}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Message */}
              {selectedApplication.message && (
                <div className="mb-6">
                  <span className="text-[11px] font-bold text-[#112D16]/60 uppercase tracking-wider block mb-2">Cover Message</span>
                  <div className="bg-[#112D16]/5 p-4 rounded-2xl border border-[#112D16]/10 text-xs leading-relaxed font-normal text-[#112D16] whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {selectedApplication.message}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#112D16]/10">
                <StatusSelect
                  value={selectedApplication.status}
                  options={applicationStatusOptions}
                  onChange={(val) => updateApplicationStatus(selectedApplication.id, val)}
                />

                <button
                  onClick={() => deleteApplication(selectedApplication.id)}
                  className="px-4 py-2 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
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
