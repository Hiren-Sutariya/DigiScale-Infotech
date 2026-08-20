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
  Eye,
  X,
  RefreshCw,
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

      {/* Main Admin Content Container */}
      <main className="flex-grow p-6 md:p-10 max-w-[1400px] mx-auto w-full">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-[#112D16]/10 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#112D16]/10 rounded-xl flex items-center justify-center text-[#112D16]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#112D16]/60">Total Inquiries</p>
              <h3 className="text-2xl font-bold text-[#112D16]">{stats.totalInquiries}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#112D16]/60">New Leads</p>
              <h3 className="text-2xl font-bold text-emerald-700">{stats.newInquiries}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-[#112D16]/10 rounded-xl flex items-center justify-center text-[#112D16]">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#112D16]/60">Job Applications</p>
              <h3 className="text-2xl font-bold text-[#112D16]">{stats.totalApplications}</h3>
            </div>
          </div>

          <div className="bg-white border border-[#112D16]/10 p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-700">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#112D16]/60">Pending Applicants</p>
              <h3 className="text-2xl font-bold text-amber-700">{stats.pendingApplications}</h3>
            </div>
          </div>
        </div>

        {/* Navigation Tabs & Controls Header */}
        <div className="bg-white border border-[#112D16]/10 rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
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

          {/* Search & Filters */}
          <div className="flex items-center gap-3">
            <div className="relative flex-grow md:w-64">
              <Search className="w-4 h-4 text-[#112D16]/40 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, email, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#112D16]/5 border border-[#112D16]/10 rounded-xl text-xs font-semibold text-[#112D16] focus:outline-none focus:ring-2 focus:ring-[#112D16]/20"
              />
            </div>

            {/* Status Filter */}
            {activeTab === "inquiries" ? (
              <select
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
                className="py-2 px-3 bg-[#112D16]/5 border border-[#112D16]/10 rounded-xl text-xs font-semibold text-[#112D16] focus:outline-none"
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="In Touch">In Touch</option>
                <option value="Closed">Closed</option>
              </select>
            ) : (
              <select
                value={applicationStatusFilter}
                onChange={(e) => setApplicationStatusFilter(e.target.value)}
                className="py-2 px-3 bg-[#112D16]/5 border border-[#112D16]/10 rounded-xl text-xs font-semibold text-[#112D16] focus:outline-none"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            )}
          </div>
        </div>

        {/* Tab 1: Contact Inquiries Table */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-[#112D16]/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Client Name</th>
                    <th className="py-3.5 px-5">Contact Details</th>
                    <th className="py-3.5 px-5">Service / Interest</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
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
                          <select
                            value={item.status}
                            onChange={(e) => updateInquiryStatus(item.id, e.target.value)}
                            className={`py-1 px-2.5 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${
                              item.status === "New"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : item.status === "In Touch"
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="In Touch">In Touch</option>
                            <option value="Closed">Closed</option>
                          </select>
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

        {/* Tab 2: Job Applications Table */}
        {activeTab === "applications" && (
          <div className="bg-white border border-[#112D16]/10 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#112D16]/5 text-[#112D16]/70 text-[11px] font-bold uppercase tracking-wider border-b border-[#112D16]/10">
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Applicant Name</th>
                    <th className="py-3.5 px-5">Applied Position</th>
                    <th className="py-3.5 px-5">Contact & Link</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
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
                    filteredApplications.map((item) => (
                      <tr key={item.id} className="hover:bg-[#112D16]/2 transition-colors">
                        <td className="py-4 px-5 font-bold text-[#112D16]/50">#{item.id}</td>
                        <td className="py-4 px-5 font-bold text-[#112D16]">
                          {item.name}
                          {item.experience && (
                            <span className="block text-[10px] font-semibold text-[#112D16]/60 mt-0.5">
                              Exp: {item.experience}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 bg-[#112D16]/10 text-[#112D16] font-semibold rounded-md text-[11px]">
                            {item.position}
                          </span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 text-[#112D16]/90 font-medium">
                            <Mail className="w-3.5 h-3.5 text-[#112D16]/40 shrink-0" />
                            <a href={`mailto:${item.email}`} className="hover:underline">
                              {item.email}
                            </a>
                          </div>
                          {item.portfolio_url && (
                            <div className="flex items-center gap-1 text-emerald-700 font-semibold mt-1">
                              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                              <a
                                href={item.portfolio_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline truncate max-w-[150px]"
                              >
                                View Portfolio
                              </a>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-5">
                          <select
                            value={item.status}
                            onChange={(e) => updateApplicationStatus(item.id, e.target.value)}
                            className={`py-1 px-2.5 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${
                              item.status === "Pending"
                                ? "bg-amber-100 text-amber-800 border-amber-300"
                                : item.status === "Reviewed"
                                ? "bg-blue-100 text-blue-800 border-blue-300"
                                : item.status === "Shortlisted"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : "bg-red-100 text-red-800 border-red-300"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
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
                              title="Read Cover Letter"
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
                    ))
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
                  <a href={`mailto:${selectedInquiry.email}`} className="hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>
                {selectedInquiry.phone && (
                  <div className="flex items-center gap-2 text-[#112D16]/80 font-medium">
                    <Phone className="w-4 h-4 text-[#112D16]/40 shrink-0" />
                    <a href={`tel:${selectedInquiry.phone}`} className="hover:underline">
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

      {/* Application Detail Modal */}
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
                  <a href={`mailto:${selectedApplication.email}`} className="hover:underline">
                    {selectedApplication.email}
                  </a>
                </div>
                {selectedApplication.portfolio_url && (
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    <a
                      href={selectedApplication.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {selectedApplication.portfolio_url}
                    </a>
                  </div>
                )}
              </div>

              {selectedApplication.message && (
                <div className="bg-[#112D16]/5 border border-[#112D16]/10 p-4 rounded-2xl mb-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#112D16]/60 mb-2">
                    Applicant Cover Note / Message
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
