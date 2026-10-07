import { useState } from "react";
import { Camera, Upload, CheckCircle, ChevronRight, ScanFace, FileText, Shield, ArrowRight } from "lucide-react";

const docTypes = [
  { id: "nin", label: "National ID (NIN)", desc: "NIMC Identity Card", icon: "🪪" },
  { id: "passport", label: "International Passport", desc: "Nigerian Immigration Service", icon: "📕" },
  { id: "license", label: "Driver's License", desc: "FRSC Nigeria", icon: "🚗" },
  { id: "voter", label: "Voter's Card (PVC)", desc: "INEC Nigeria", icon: "🗳️" },
];

const steps = ["Select Document", "Capture", "Face Match", "Review", "Complete"];

interface Props { navigate: (page: string) => void }

export default function IdentityVerification({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [captureMethod, setCaptureMethod] = useState<"camera" | "upload" | null>(null);

  const canNext = step === 0 ? !!selectedDoc : true;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto page-transition">
      <div className="mb-6">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Verify Your Identity</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Add a verified identity document to your TrueID profile</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                style={{
                  background: i < step ? "#059669" : i === step ? "#1D6AFF" : "#F1F5F9",
                  color: i <= step ? "white" : "#94A3B8",
                }}
              >
                {i < step ? <CheckCircle size={16} /> : i + 1}
              </div>
              <div className="text-xs mt-1.5 text-center whitespace-nowrap" style={{ color: i === step ? "#1D6AFF" : "#94A3B8", fontWeight: i === step ? 600 : 400, fontSize: 10 }}>
                {s}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-8 md:w-12 mx-1 flex-shrink-0 mt-[-12px]" style={{ background: i < step ? "#059669" : "#E2E8F0" }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
        {step === 0 && (
          <div className="p-6">
            <h2 className="font-display font-semibold text-[#0F172A] text-lg mb-1">Select Document Type</h2>
            <p className="text-sm text-[#64748B] mb-5">Choose which identity document you want to verify</p>
            <div className="space-y-3">
              {docTypes.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc.id)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
                  style={{
                    borderColor: selectedDoc === doc.id ? "#1D6AFF" : "#E2E8F0",
                    background: selectedDoc === doc.id ? "#E8EFFF" : "white",
                  }}
                >
                  <div className="text-2xl">{doc.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#0F172A] text-sm">{doc.label}</div>
                    <div className="text-xs text-[#64748B]">{doc.desc}</div>
                  </div>
                  <div
                    className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                    style={{ borderColor: selectedDoc === doc.id ? "#1D6AFF" : "#CBD5E1" }}
                  >
                    {selectedDoc === doc.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#1D6AFF" }} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="p-6">
            <h2 className="font-display font-semibold text-[#0F172A] text-lg mb-1">Capture Document</h2>
            <p className="text-sm text-[#64748B] mb-5">Take a clear photo or upload an image of your document</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setCaptureMethod("camera")}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all"
                style={{ borderColor: captureMethod === "camera" ? "#1D6AFF" : "#E2E8F0", background: captureMethod === "camera" ? "#E8EFFF" : "#F8FAFC" }}
              >
                <Camera size={32} color={captureMethod === "camera" ? "#1D6AFF" : "#94A3B8"} />
                <div className="text-sm font-semibold text-[#0F172A]">Use Camera</div>
                <div className="text-xs text-[#64748B] text-center">Take a photo with your device camera</div>
              </button>
              <button
                onClick={() => setCaptureMethod("upload")}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all"
                style={{ borderColor: captureMethod === "upload" ? "#1D6AFF" : "#E2E8F0", background: captureMethod === "upload" ? "#E8EFFF" : "#F8FAFC" }}
              >
                <Upload size={32} color={captureMethod === "upload" ? "#1D6AFF" : "#94A3B8"} />
                <div className="text-sm font-semibold text-[#0F172A]">Upload File</div>
                <div className="text-xs text-[#64748B] text-center">Upload a JPEG, PNG, or PDF</div>
              </button>
            </div>
            {captureMethod && (
              <div className="rounded-xl border-2 border-dashed p-8 text-center" style={{ borderColor: "#CBD5E1", background: "#F8FAFC" }}>
                <FileText size={40} className="mx-auto mb-3" color="#94A3B8" />
                <div className="text-sm font-medium text-[#64748B]">
                  {captureMethod === "camera" ? "Camera preview will appear here" : "Drop your file here or click to browse"}
                </div>
                <div className="text-xs text-[#94A3B8] mt-1">Ensure the document is fully visible and well-lit</div>
              </div>
            )}
            <div className="mt-4 p-3 rounded-lg" style={{ background: "#FFFBEB" }}>
              <div className="text-xs text-[#92400E] font-medium">💡 Tips for a good capture</div>
              <ul className="text-xs text-[#92400E] mt-1.5 space-y-0.5 list-disc list-inside">
                <li>Ensure all text and numbers are clearly readable</li>
                <li>Avoid glare, shadows, and blurry images</li>
                <li>Place document on a flat, dark surface</li>
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-6 text-center">
            <h2 className="font-display font-semibold text-[#0F172A] text-lg mb-1">Face Verification</h2>
            <p className="text-sm text-[#64748B] mb-6">Look at the camera and follow the on-screen instructions</p>
            <div
              className="w-48 h-48 rounded-full mx-auto mb-6 flex items-center justify-center border-4"
              style={{ borderColor: "#1D6AFF", background: "#E8EFFF" }}
            >
              <ScanFace size={64} color="#1D6AFF" />
            </div>
            <div className="space-y-2 text-sm text-[#64748B] mb-6">
              <div className="flex items-center gap-2 justify-center"><CheckCircle size={14} color="#059669" /> Face detected</div>
              <div className="flex items-center gap-2 justify-center text-[#94A3B8]"><div className="w-3.5 h-3.5 rounded-full border-2 border-current" /> Looking straight</div>
              <div className="flex items-center gap-2 justify-center text-[#94A3B8]"><div className="w-3.5 h-3.5 rounded-full border-2 border-current" /> Liveness check</div>
            </div>
            <p className="text-xs text-[#94A3B8]">Keep your face centered in the circle. Do not wear glasses or hats.</p>
          </div>
        )}

        {step === 3 && (
          <div className="p-6">
            <h2 className="font-display font-semibold text-[#0F172A] text-lg mb-1">Review Details</h2>
            <p className="text-sm text-[#64748B] mb-5">Confirm the information extracted from your document</p>
            <div className="space-y-3">
              {[
                { label: "Full Name", value: "EMEKA CHUKWUEMEKA OKONKWO" },
                { label: "Date of Birth", value: "14/07/1990" },
                { label: "Gender", value: "Male" },
                { label: "Document Number", value: "A12345678" },
                { label: "Expiry Date", value: "02/11/2030" },
                { label: "Issuing Authority", value: "Nigerian Immigration Service" },
              ].map((field) => (
                <div key={field.label} className="flex items-center justify-between py-2.5 border-b border-[#F1F5F9]">
                  <span className="text-sm text-[#64748B]">{field.label}</span>
                  <span className="text-sm font-medium text-[#0F172A]">{field.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg" style={{ background: "#ECFDF5", border: "1px solid #A7F3D0" }}>
              <CheckCircle size={14} color="#059669" className="flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#065F46]">
                Face match successful — 98.4% confidence. Details extracted from document.
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="p-6 text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#ECFDF5" }}>
              <CheckCircle size={40} color="#059669" />
            </div>
            <h2 className="font-display font-bold text-[#0F172A] text-xl mb-2">Verification Complete!</h2>
            <p className="text-sm text-[#64748B] mb-1">Your International Passport has been successfully verified</p>
            <p className="text-xs text-[#94A3B8] mb-6">and added to your TrueID profile</p>
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="p-3 rounded-xl" style={{ background: "#F8FAFC" }}>
                <div className="text-[#64748B] text-xs">Trust Score</div>
                <div className="font-display font-bold text-[#059669] text-lg">94 / 100</div>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "#F8FAFC" }}>
                <div className="text-[#64748B] text-xs">Documents</div>
                <div className="font-display font-bold text-[#0F172A] text-lg">4 Verified</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("verified-documents")}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
                style={{ color: "#0F172A" }}
              >
                View Documents
              </button>
              <button
                onClick={() => navigate("dashboard")}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ background: "#1D6AFF" }}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="px-6 pb-6 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
                style={{ color: "#0F172A" }}
              >
                Back
              </button>
            )}
            <button
              onClick={() => canNext && setStep(s => s + 1)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity"
              style={{ background: "#1D6AFF", opacity: canNext ? 1 : 0.4 }}
            >
              {step === 3 ? "Submit Verification" : "Continue"}
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Security note */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
        <Shield size={13} />
        <span>Your data is encrypted end-to-end. TrueID never stores raw document images.</span>
      </div>
    </div>
  );
}
