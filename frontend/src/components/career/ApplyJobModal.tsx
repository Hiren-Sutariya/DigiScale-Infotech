import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


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

  const [step, setStep] = useState(1);

  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneError, setPhoneError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [resume, setResume] = useState<File | null>(null);


  return (
    <AnimatePresence>

      {open && (

        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 25, opacity: 0 }}
            transition={{ duration: .2 }}
            className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden"
          >

            {/* Header */}

            <div className="border-b px-6 py-4">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-lg font-semibold">
                    Application
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    {jobTitle}
                  </p>

                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                >
                  <X className="w-5 h-5" />
                </Button>

              </div>

              {/* Progress */}

              <div className="flex items-center gap-3 text-sm mt-5">

                <span className={step >= 1 ? "text-blue-600" : "text-slate-400"}>
                  Personal
                </span>

                <span>—</span>

                <span className={step >= 2 ? "text-blue-600" : "text-slate-400"}>
                  Experience
                </span>

                <span>—</span>

                <span className={step >= 3 ? "text-blue-600" : "text-slate-400"}>
                  Resume
                </span>

                <span>—</span>

                <span className={step >= 4 ? "text-blue-600" : "text-slate-400"}>
                  Review
                </span>

                <span>—</span>

                <span className={step >= 5 ? "text-blue-600" : "text-slate-400"}>
                  Submit
                </span>

              </div>

            </div>

            {/* Body */}

            <div className="px-6 py-6">

              {step === 1 && (

                <div className="max-w-xl mx-auto">

                  <h3 className="text-xl font-semibold">
                    Personal Information
                  </h3>

                  <p className="text-slate-500 mt-1 mb-6">
                    Please fill in your basic information.
                  </p>

                  <div className="space-y-6">

                    <div className="grid grid-cols-2 gap-5">

                      <div>

                        <label className="text-sm font-medium">
                          First Name
                        </label>

                        <Input
                          value={firstName}
                          onChange={(e) =>
                            setFirstName(e.target.value.replace(/[^a-zA-Z ]/g, ""))
                          }
                        />

                      </div>

                      <div>

                        <label className="text-sm font-medium">
                          Last Name
                        </label>

                        <Input
                          value={lastName}
                          onChange={(e) =>
                            setLastName(e.target.value.replace(/[^a-zA-Z ]/g, ""))
                          }
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-sm font-medium">
                        Email Address
                      </label>

                      <Input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                    </div>

                    <div>

                      <label className="text-sm font-medium">
                        Phone Number
                      </label>

                      <div>

                        <div className="mt-2 flex gap-3">

                          <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="h-10 rounded-md border px-3 bg-white"
                          >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+61">🇦🇺 +61</option>
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+65">🇸🇬 +65</option>
                            <option value="+49">🇩🇪 +49</option>
                          </select>

                          <Input
                            className="h-10 flex-1"
                            type="tel"
                            inputMode="numeric"
                            maxLength={15}
                            placeholder="9898213183"
                            value={phone}
                            onChange={(e) => {
                              const numbers = e.target.value.replace(/\D/g, "").slice(0, 15);
                              setPhone(numbers);
                            }}
                            onBlur={() => {
                              if (phone.length < 6) {
                                setPhoneError("Please enter a valid phone number.");
                              } else {
                                setPhoneError("");
                              }
                            }}
                          />

                        </div>

                        {phoneError && (
                          <p className="mt-2 text-sm text-red-500">
                            {phoneError}
                          </p>
                        )}

                      </div>


                    </div>

                  </div>

                  <div className="flex justify-end mt-12">

                    <Button
                      onClick={() => {

                        const onlyDigits = phone.replace(/\D/g, "");

                        if (!firstName.trim()) return;
                        if (!lastName.trim()) return;
                        if (!email.trim()) return;

                        if (onlyDigits.length < 10 || onlyDigits.length > 15) {
                          setPhoneError("Please enter a valid phone number.");
                          return;
                        }

                        setStep(2);
                      }}
                    >
                      Continue →
                    </Button>

                  </div>

                </div>

              )}

              {/* STEP 2 */}

              {step === 2 && (

                <div className="max-w-xl mx-auto">

                  <h3 className="text-xl font-semibold">
                    Professional Details
                  </h3>

                  <p className="text-slate-500 mt-1 mb-6">
                    Tell us about your experience.
                  </p>

                  <div className="space-y-5">

                    <select
                      className="w-full h-10 rounded-md border px-3"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >

                      <option value="">
                        Select Experience
                      </option>

                      <option>Fresher</option>

                      <option>6 Month</option>

                      <option>1 Year</option>

                      <option>2 Years</option>

                      <option>3 Years</option>

                    </select>

                    <div>

                      <label className="text-sm font-medium">
                        Current Location
                      </label>

                      <Input
                        className="mt-2 h-10"
                        placeholder="Surat"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />

                    </div>

                    <div>

                      <label className="text-sm font-medium">
                        Current Company (Optional)
                      </label>

                      <Input
                        className="mt-2 h-10"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />

                    </div>

                    <div>

                      <label className="text-sm font-medium">
                        Current Role (Optional)
                      </label>

                      <Input
                        className="mt-2 h-10"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      />

                    </div>

                  </div>

                  <div className="flex justify-between mt-10">

                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      ← Previous
                    </Button>

                    <Button
                      disabled={
                        !experience ||
                        !location
                      }
                      onClick={() => setStep(3)}
                    >
                      Continue →
                    </Button>

                  </div>

                </div>

              )}
              {/* STEP 3 */}

              {step === 3 && (

                <div className="max-w-xl mx-auto">

                  <h3 className="text-xl font-semibold">
                    Resume
                  </h3>

                  <p className="text-slate-500 mt-1 mb-6">
                    Upload your latest resume.
                  </p>

                  <div className="border rounded-xl p-8">

                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {

                        if (e.target.files?.length) {

                          setResume(e.target.files[0]);

                        }

                      }}
                    />

                    {resume && (

                      <p className="mt-4 text-sm text-green-600">

                        {resume.name}

                      </p>

                    )}

                  </div>

                  <div className="flex justify-between mt-10">

                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                    >

                      ← Previous

                    </Button>

                    <Button
                      disabled={!resume}
                      onClick={() => setStep(4)}
                    >

                      Continue →

                    </Button>

                  </div>

                </div>

              )}

              {/* Step 4  */}

              {step === 4 && (

                <div className="max-w-xl mx-auto">

                  <h3 className="text-xl font-semibold">
                    Review Application
                  </h3>

                  <p className="text-slate-500 mt-1 mb-6">
                    Please verify your information.
                  </p>

                  <div className="rounded-xl border divide-y">

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Name</span>
                      <span>{firstName} {lastName}</span>
                    </div>

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Email</span>
                      <span>{email}</span>
                    </div>

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Phone</span>
                      <span>{phone}</span>
                    </div>

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Experience</span>
                      <span>{experience}</span>
                    </div>

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Location</span>
                      <span>{location}</span>
                    </div>

                    <div className="flex justify-between p-4">
                      <span className="text-slate-500">Resume</span>
                      <span>{resume?.name}</span>
                    </div>

                  </div>

                  <div className="flex justify-between mt-8">

                    <Button
                      variant="outline"
                      onClick={() => setStep(3)}
                    >
                      ← Previous
                    </Button>

                    <Button
                      onClick={() => setStep(5)}
                    >
                      Continue →
                    </Button>

                  </div>

                </div>

              )}

              {step === 5 && (

                <div className="max-w-xl mx-auto">

                  <div className="text-center">

                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto border border-blue-100">

                      <span className="text-2xl">
                        📄
                      </span>

                    </div>

                    <h2 className="text-2xl font-semibold mt-5">
                      Submit Application
                    </h2>

                    <p className="text-slate-500 mt-2 leading-7">
                      Please review your application once before submitting.
                      <br />
                      After submission, our hiring team will review your profile.
                    </p>

                  </div>

                  <div className="mt-10 rounded-xl border bg-slate-50 p-5 space-y-3">

                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicant</span>
                      <span className="font-medium">
                        {firstName} {lastName}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Email</span>
                      <span>{email}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Experience</span>
                      <span>{experience}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Resume</span>
                      <span>{resume?.name}</span>
                    </div>

                  </div>

                  <div className="flex justify-between mt-10">

                    <Button
                      variant="outline"
                      onClick={() => setStep(4)}
                    >
                      ← Previous
                    </Button>

                    <Button
                      className="min-w-47.5"
                      onClick={async () => {

                        try {

                          console.log("Submitting application...");

                          const formData = new FormData();

                          formData.append("first_name", firstName);
                          formData.append("last_name", lastName);
                          formData.append("email", email);

                          formData.append("country_code", countryCode);
                          formData.append("phone", phone.replace(/\s/g, ""));

                          formData.append("experience", experience);
                          formData.append("location", location);

                          formData.append("company", company);
                          formData.append("role", role);

                          formData.append("job_title", jobTitle ?? "");

                          if (resume) {
                            formData.append("resume", resume);
                          }

                          const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
                          const response = await fetch(
                            `${API_URL}/career/`,
                            {
                              method: "POST",
                              body: formData,
                            }
                          );

                          const data = await response.json();

                          console.log(data);

                          if (!response.ok) {
                            throw new Error(data.detail || "Submission Failed");
                          }

                          setSubmitted(true);

                          setFirstName("");
                          setLastName("");
                          setEmail("");
                          setPhone("");

                          setExperience("");
                          setLocation("");
                          setCompany("");
                          setRole("");

                          setResume(null);

                        } catch (error) {

                          console.error(error);
                          alert("Failed to submit application.");

                        }

                      }}
                    >
                      Submit Application
                    </Button>

                  </div>

                </div>

              )}

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl text-center"
                  >
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <span className="text-3xl">✓</span>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold">
                      Application Submitted
                    </h2>

                    <p className="mt-3 text-slate-500 leading-7">
                      Thank you for applying at DigiScale Infotech.
                      <br />
                      We'll review your application and get back to you soon.
                    </p>

                    <Button
                      className="w-full mt-8"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                        onClose();
                      }}
                    >
                      Done
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );

}