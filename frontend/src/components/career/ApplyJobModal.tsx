import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, Upload, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/api/client";

interface ApplyJobModalProps {
  open: boolean;
  jobTitle: string;
  onClose: () => void;
}

export default function ApplyJobModal({
  open,
  jobTitle,
  onClose,
}: ApplyJobModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Single-stage form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResume(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      let resumeDataBase64 = "";
      let resumeFilename = "";

      if (resume) {
        resumeFilename = resume.name;
        resumeDataBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(resume);
        });
      }

      const res = await fetch(`${API_URL}/apply-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          position: jobTitle,
          portfolio_url: portfolio,
          resume_data: resumeDataBase64,
          resume_filename: resumeFilename,
          message: resume ? `Uploaded File: ${resume.name}` : "",
        }),
      });

      if (!res.ok) {
        throw new Error("Application submission failed");
      }

      setSubmitted(true);

      // Clean states
      setFullName("");
      setEmail("");
      setPhone("");
      setPortfolio("");
      setResume(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the submission. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white rounded-[24px] sm:rounded-[28px] border border-[#112D16]/10 w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] relative"
          >
            {/* Header */}
            <div className="px-5 sm:px-8 py-4 sm:py-5 border-b border-[#112D16]/10 flex items-center justify-between shrink-0 bg-white z-10">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#112D16] uppercase tracking-wide">
                  Join The Team
                </h2>
                <p className="text-[12px] sm:text-[13px] font-medium text-[#112D16]/60 uppercase tracking-wider mt-0.5">
                  Apply for: <span className="text-[#112D16]">{jobTitle}</span>
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="w-9 h-9 rounded-full hover:bg-[#112D16]/5 text-[#112D16] shrink-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden">
                {/* Scrollable Form Body */}
                <div className="p-5 sm:p-8 overflow-y-auto flex-grow space-y-6">
                  {/* Two-Column Form Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    
                    {/* Left Column: Personal Inputs */}
                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#112D16]/60 tracking-wider mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="bg-[#112D16]/5 border-[#112D16]/12 text-[#112D16] placeholder:text-[#112D16]/30 focus:border-[#112D16] focus:ring-1 focus:ring-[#112D16] rounded-xl h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#112D16]/60 tracking-wider mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          required
                          placeholder="johndoe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-[#112D16]/5 border-[#112D16]/12 text-[#112D16] placeholder:text-[#112D16]/30 focus:border-[#112D16] focus:ring-1 focus:ring-[#112D16] rounded-xl h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#112D16]/60 tracking-wider mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="tel"
                          required
                          placeholder="+91 98982 13183"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-[#112D16]/5 border-[#112D16]/12 text-[#112D16] placeholder:text-[#112D16]/30 focus:border-[#112D16] focus:ring-1 focus:ring-[#112D16] rounded-xl h-11"
                        />
                      </div>
                    </div>

                    {/* Right Column: Links & Resume Upload */}
                    <div className="space-y-4 sm:space-y-5">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#112D16]/60 tracking-wider mb-1.5">
                          Portfolio / GitHub Link
                        </label>
                        <Input
                          type="url"
                          placeholder="https://github.com/yourprofile"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          className="bg-[#112D16]/5 border-[#112D16]/12 text-[#112D16] placeholder:text-[#112D16]/30 focus:border-[#112D16] focus:ring-1 focus:ring-[#112D16] rounded-xl h-11"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase text-[#112D16]/60 tracking-wider mb-1.5">
                          Upload Resume (PDF, DOCX) <span className="text-red-500">*</span>
                        </label>
                        
                        {/* Drag and Drop Zone */}
                        <div
                          onDragEnter={handleDrag}
                          onDragOver={handleDrag}
                          onDragLeave={handleDrag}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[120px] ${
                            dragActive
                              ? "border-[#112D16] bg-[#112D16]/5"
                              : "border-[#112D16]/15 hover:border-[#112D16] hover:bg-[#112D16]/5"
                          }`}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept=".pdf,.docx,.doc"
                            onChange={handleFileChange}
                          />
                          {resume ? (
                            <div className="flex items-center gap-3 text-[#112D16]">
                              <FileText className="w-7 h-7 text-[#112D16]/75 shrink-0" />
                              <div className="text-left overflow-hidden">
                                <p className="text-xs sm:text-sm font-bold truncate max-w-[180px] sm:max-w-[200px]">
                                  {resume.name}
                                </p>
                                <p className="text-[10px] text-[#112D16]/50">
                                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-[#112D16]/40 mb-1.5" />
                              <p className="text-xs font-bold text-[#112D16]/65">
                                Drag & drop your resume here, or <span className="text-[#112D16] underline">browse</span>
                              </p>
                              <p className="text-[10px] text-[#112D16]/45 mt-0.5">
                                PDF, DOCX up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Fixed Modal Footer with Stacking on Mobile */}
                <div className="px-5 sm:px-8 py-4 border-t border-[#112D16]/10 bg-white flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 sm:gap-3.5 shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    className="w-full sm:w-auto rounded-full px-6 font-medium hover:bg-[#112D16]/5 text-[#112D16] h-11"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-[#112D16] hover:bg-[#112D16]/90 text-white rounded-full px-8 font-bold uppercase text-xs tracking-wider h-11 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              /* Success view overlay */
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 bg-[#112D16]/10 text-[#112D16] rounded-full flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#112D16] uppercase tracking-wide mb-3">
                    Application Submitted
                  </h3>
                  <p className="text-[#112D16]/75 font-medium max-w-md leading-relaxed text-sm mb-6">
                    Thank you for applying at DigiScale Infotech. We have received your details and our team will review them and get back to you shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      onClose();
                    }}
                    className="w-full sm:w-auto bg-[#112D16] hover:bg-[#112D16]/90 text-white rounded-full px-10 font-bold uppercase text-xs tracking-wider h-11"
                  >
                    Close Window
                  </Button>
                </motion.div>
              </div>
            )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}