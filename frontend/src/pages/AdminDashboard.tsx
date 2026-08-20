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
  Eye,
  X,
  RefreshCw,
  FileText,
  ChevronDown,
  Check,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
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
  experience: string;
  message: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalInquiries: number;
  newInquiries: number;
  totalApplications: number;
  pendingApplications: number;
}

// ----------------------------------------------------
// CUSTOM STATUS DROPDOWN COMPONENT (Replaces OS select)
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`px-3 py-1 rounded-full text-[11px] font-bold border flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${currentOption.colorClass}`}
      >
        <span>{currentOption.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1.5 w-36 bg-white border border-[#112D16]/15 rounded-xl shadow-xl z-50 overflow-hidden p-1"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  value === opt.value
                    ? "bg-[#112D16] text-[#C6D6B1]"
                    : "text-[#112D16] hover:bg-[#112D16]/5"
                }`}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check className="w-3.5 h-3.5 text-[#C6D6B1]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState("All");
  const [applicationStatusFilter, setApplicationStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal / Reader Drawer
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

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
        setStats(statsData);
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
        fetchData(token);
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
        fetchData(token);
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
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
        fetchData(token);
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
        fetchData(token);
        if (selectedApplication?.id === id) setSelectedApplication(null);
      }
    } catch (err) {
      console.error("Failed to delete application", err);
    }
  };

  // Resolve File URL
  const getFileUrl = (url: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/uploads")) {
      const baseUrl = API_URL.replace(/\/api$/, "");
      return `${baseUrl}${url}`;
    }
    return url;
  };

  // Filtered Lists
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = inquiryStatusFilter === "All" || item.status === inquiryStatusFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredApplications = applications.filter((item) => {
    const matchesStatus = applicationStatusFilter === "All" || item.status === applicationStatusFilter;
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const inquiryStatusOptions = [
    { label: "New", value: "New", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { label: "In Touch", value: "In Touch", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
    { label: "Closed", value: "Closed", colorClass: "bg-gray-100 text-gray-700 border-gray-300" },
  ];

  const applicationStatusOptions = [
    { label: "Pending", value: "Pending", colorClass: "bg-amber-100 text-amber-800 border-amber-300" },
    { label: "Reviewed", value: "Reviewed", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
    { label: "Shortlisted", value: "Shortlisted", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { label: "Rejected", value: "Rejected", colorClass: "bg-red-100 text-red-800 border-red-300" },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F2] font-sans flex flex-col text-[#112D16]">
      {/* Top Admin Header */}
      <header className="bg-[#112D16] text-[#C6D6B1] py-4 px-6 md:px-10 flex items-center justify-between shadow-xl sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="DigiScale" className="h-8 w-auto bg-white/10 p-1.5 rounded-lg" />
          <span className="font-bold text-lg text-white">DigiScale Admin Portal</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => token && fetchData(token)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container (Expanded Full Width with Minimal Side Padding) */}
      <main className="flex-grow p-4 sm:p-6 md:p-8 max-w-[1750px] mx-auto w-full">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-[#112D16]/10 p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-[#112D16]/10 rounded-xl flex items-center justify-center text-[#112D16] shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60">Total Inquiries</p>
              <h3 className="text-2xl font-bold text-[#112D16]">{stats.totalInquiries}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60">New Leads</p>
              <h3 className="text-2xl font-bold text-emerald-700">{stats.newInquiries}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-[#112D16]/10 rounded-xl flex items-center justify-center text-[#112D16] shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60">Job Applications</p>
              <h3 className="text-2xl font-bold text-[#112D16]">{stats.totalApplications}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-4.5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60">Pending Applicants</p>
              <h3 className="text-2xl font-bold text-amber-700">{stats.pendingApplications}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Integrated Search/Filter Control Panel */}
        <div className="bg-white border border-[#112D16]/10 rounded-2xl p-3.5 mb-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex bg-[#112D16]/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "inquiries"
                  ? "bg-[#112D16] text-[#C6D6B1] shadow-md"
                  : "text-[#112D16]/70 hover:text-[#112D16]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Inquiries ({inquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "applications"
                  ? "bg-[#112D16] text-[#C6D6B1] shadow-md"
                  : "text-[#112D16]/70 hover:text-[#112D16]"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Applications ({applications.length})</span>
            </button>
          </div>

          {/* Integrated Search & Custom Styled Filter Dropdowns */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow sm:w-72">
              <Search className="w-4 h-4 text-[#112D16]/40 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, email, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#112D16]/5 border border-[#112D16]/10 rounded-xl text-xs font-semibold text-[#112D16] focus:outline-none focus:ring-2 focus:ring-[#112D16]/20"
              />
            </div>

            {/* Custom Styled Filter Dropdown (No native dark OS selects) */}
            {activeTab === "inquiries" ? (
              <StatusDropdown
                value={inquiryStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-[#112D16]/10 text-[#112D16] border-[#112D16]/20" },
                  { label: "New", value: "New", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
                  { label: "In Touch", value: "In Touch", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
                  { label: "Closed", value: "Closed", colorClass: "bg-gray-100 text-gray-700 border-gray-300" },
                ]}
                onChange={(val) => setInquiryStatusFilter(val)}
              />
            ) : (
              <StatusDropdown
                value={applicationStatusFilter}
                options={[
                  { label: "All Status", value: "All", colorClass: "bg-[#112D16]/10 text-[#112D16] border-[#112D16]/20" },
                  { label: "Pending", value: "Pending", colorClass: "bg-amber-100 text-amber-800 border-amber-300" },
                  { label: "Reviewed", value: "Reviewed", colorClass: "bg-blue-100 text-blue-800 border-blue-300" },
                  { label: "Shortlisted", value: "Shortlisted", colorClass: "bg-emerald-100 text-emerald-800 border-emerald-300" },
                  { label: "Rejected", value: "Rejected", colorClass: "bg-red-100 text-red-800 border-red-300" },
                ]}
                onChange={(val) => setApplicationStatusFilter(val)}
              />
            )}
          </div>
        </div>

        {/* Tab 1: Contact Inquiries Data Table */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-[#112D16]/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5 w-16">ID</th>
                    <th className="py-3.5 px-5">Client Name</th>
                    <th className="py-3.5 px-5">Contact Details</th>
                    <th className="py-3.5 px-5">Service / Interest</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#112D16]/10 text-xs">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-[#112D16]/60 font-medium">
                        No contact inquiries found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr key={item.id} className="hover:bg-[#112D16]/2 transition-colors">
                        <td className="py-4 px-5 font-bold text-[#112D16]/50">#{item.id}</td>
                        <td className="py-4 px-5 font-bold text-[#112D16]">
                          {item.name}
                          {item.budget && (
                            <span className="block text-[10px] font-semibold text-emerald-700 mt-0.5">
                              Budget: {item.budget}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-[#112D16]/90 font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#112D16]/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:underline">
                              {item.email}
                            </a>
                          </div>
                          {item.phone && (
                            <div className="flex items-center gap-1.5 text-[#112D16]/70 mt-1">
                              <Phone className="w-3.5 h-3.5 text-[#112D16]/40 shrink-0" />
                              <a href={`tel:${item.phone}`} className="hover:underline">
                                {item.phone}
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-semibold rounded-md text-[11px]">
                            {item.service}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <StatusDropdown
                            value={item.status}
                            options={inquiryStatusOptions}
                            onChange={(val) => updateInquiryStatus(item.id, val)}
                          />
                        </td>
                        <td className="py-4 px-5 text-[#112D16]/60 font-medium whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedInquiry(item)}
                              className="p-1.5 bg-[#112D16]/10 hover:bg-[#112D16] text-[#112D16] hover:text-white rounded-lg transition-all cursor-pointer"
                              title="Read Full Message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteInquiry(item.id)}
                              className="p-1.5 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-lg transition-all cursor-pointer"
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

        {/* Tab 2: Job Applications Data Table */}
        {activeTab === "applications" && (
          <div className="bg-white border border-[#112D16]/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[950px]">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5 w-16">ID</th>
                    <th className="py-3.5 px-5">Applicant Name</th>
                    <th className="py-3.5 px-5">Applied Position</th>
                    <th className="py-3.5 px-5">Resume / Portfolio File</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#112D16]/10 text-xs">
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-[#112D16]/60 font-medium">
                        No job applications found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.map((item) => {
                      const fileUrl = getFileUrl(item.portfolio_url);
                      return (
                        <tr key={item.id} className="hover:bg-[#112D16]/2 transition-colors">
                          <td className="py-4 px-5 font-bold text-[#112D16]/50">#{item.id}</td>
                          <td className="py-4 px-5 font-bold text-[#112D16]">
                            {item.name}
                            <div className="flex items-center gap-1 text-[11px] font-normal text-[#112D16]/70 mt-0.5">
                              <Mail className="w-3 h-3 shrink-0" />
                              <a href={`mailto:${item.email}`} className="hover:underline">
                                {item.email}
                              </a>
                            </div>
                          </td>
                          <td className="py-4 px-5">
                            <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-semibold rounded-md text-[11px]">
                              {item.position}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            {fileUrl ? (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-all shadow-sm group"
                              >
                                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                                <span>View / Download Resume</span>
                                <ExternalLink className="w-3 h-3 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                              </a>
                            ) : (
                              <span className="text-[#112D16]/40 italic text-[11px]">No file attached</span>
                            )}
                          </td>
                          <td className="py-4 px-5">
                            <StatusDropdown
                              value={item.status}
                              options={applicationStatusOptions}
                              onChange={(val) => updateApplicationStatus(item.id, val)}
                            />
                          </td>
                          <td className="py-4 px-5 text-[#112D16]/60 font-medium whitespace-nowrap">
                            {new Date(item.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedApplication(item)}
                                className="p-1.5 bg-[#112D16]/10 hover:bg-[#112D16] text-[#112D16] hover:text-white rounded-lg transition-all cursor-pointer"
                                title="Read Cover Note"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteApplication(item.id)}
                                className="p-1.5 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-lg transition-all cursor-pointer"
                                title="Delete Application"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-[#112D16]/10"
            >
              <div className="flex justify-between items-start mb-4 border-b border-[#112D16]/10 pb-4">
                <div>
                  <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-bold text-[10px] uppercase tracking-wider rounded-md">
                    {selectedInquiry.service}
                  </span>
                  <h3 className="text-xl font-bold text-[#112D16] mt-2">{selectedInquiry.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 text-[#112D16]/50 hover:text-[#112D16] rounded-xl hover:bg-[#112D16]/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex items-center gap-2 text-[#112D16]/80 font-medium">
                  <Mail className="w-4 h-4 text-[#112D16]/40 shrink-0" />
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:underline font-bold">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2 text-[#112D16]/80 font-medium">
                    <Phone className="w-4 h-4 text-[#112D16]/40 shrink-0" />
                    <a href={`tel:${selectedInquiry.phone}`} className="hover:underline font-bold">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}
                {selectedInquiry.budget && (
                  <div className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                    Budget Range: {selectedInquiry.budget}
                  </div>
                )}
              </div>

              <div className="bg-[#112D16]/5 border border-[#112D16]/10 p-4 rounded-2xl mb-6">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60 mb-2">
                  Client Message
                </h4>
                <p className="text-sm text-[#112D16] font-normal leading-relaxed whitespace-pre-line">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2.5 bg-[#112D16] text-[#C6D6B1] rounded-xl text-xs font-bold hover:bg-[#1a4020] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Application Detail Modal (With Prominent File Download Button) */}
      <AnimatePresence>
        {selectedApplication && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-[#112D16]/10"
            >
              <div className="flex justify-between items-start mb-4 border-b border-[#112D16]/10 pb-4">
                <div>
                  <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-bold text-[10px] uppercase tracking-wider rounded-md">
                    Position: {selectedApplication.position}
                  </span>
                  <h3 className="text-xl font-bold text-[#112D16] mt-2">{selectedApplication.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 text-[#112D16]/50 hover:text-[#112D16] rounded-xl hover:bg-[#112D16]/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs mb-6">
                <div className="flex items-center gap-2 text-[#112D16]/80 font-medium">
                  <Mail className="w-4 h-4 text-[#112D16]/40 shrink-0" />
                  <a href={`mailto:${selectedApplication.email}`} className="hover:underline font-bold">
                    {selectedApplication.email}
                  </a>
                </div>

                {/* REAL RESUME FILE VIEW/DOWNLOAD BUTTON */}
                {getFileUrl(selectedApplication.portfolio_url) ? (
                  <div className="mt-2">
                    <a
                      href={getFileUrl(selectedApplication.portfolio_url)!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Open / Download Resume File</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ) : (
                  <div className="text-xs text-[#112D16]/50 italic">No resume file attached</div>
                )}
              </div>

              {selectedApplication.message && (
                <div className="bg-[#112D16]/5 border border-[#112D16]/10 p-4 rounded-2xl mb-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60 mb-2">
                    Applicant Cover Note
                  </h4>
                  <p className="text-sm text-[#112D16] font-normal leading-relaxed whitespace-pre-line">
                    {selectedApplication.message}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-5 py-2.5 bg-[#112D16] text-[#C6D6B1] rounded-xl text-xs font-bold hover:bg-[#1a4020] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
