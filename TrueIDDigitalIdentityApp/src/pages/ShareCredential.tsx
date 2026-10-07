import { useState } from "react";
import { Search, CheckCircle, ArrowRight, Shield, Clock, Building2, QrCode } from "lucide-react";
import { credentials, consentOrganizations } from "../data/demo";

const dataFields: Record<string, string[]> = {
  "cred-001": ["Full Name", "NIN Number", "Date of Birth", "Gender", "Phone Number"],
  "cred-002": ["Full Name", "BVN Number", "Date of Birth", "Phone Number"],
  "cred-003": ["Full Name", "Passport Number", "Date of Birth", "Expiry Date", "Nationality"],
  "cred-004": ["Full Name", "License Number", "Expiry Date", "State of Issue"],
  "cred-005": ["Full Name", "PVC Number", "LGA", "Ward"],
  "cred-006": ["Full Name", "TIN Number", "Tax Authority"],
};

interface Props { navigate: (page: string) => void }

export default function ShareCredential({ navigate }: Props) {
  const [step, setStep] = useState(0);
  const [selectedCred, setSelectedCred] = useState<string | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [expiry, setExpiry] = useState("30");
  const [shared, setShared] = useState(false);
  const [searchOrg, setSearchOrg] = useState("");

  const verifiedCreds = credentials.filter(c => c.status === "verified");
  const cred = verifiedCreds.find(c => c.id === selectedCred);
  const org = consentOrganizations.find(o => o.id === selectedOrg);
  const fields = selectedCred ? dataFields[selectedCred] || [] : [];

  const filteredOrgs = consentOrganizations.filter(o =>
    o.name.toLowerCase().includes(searchOrg.toLowerCase())
  );

  const toggleField = (f: string) => {
    setSelectedFields(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  if (shared) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto page-transition">
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 text-center">
          <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#ECFDF5" }}>
            <CheckCircle size={40} color="#059669" />
          </div>
          <h2 className="font-display font-bold text-[#0F172A] text-xl mb-2">Credentials Shared</h2>
          <p className="text-sm text-[#64748B] mb-1">
            Your <strong>{cred?.shortType}</strong> has been securely shared with <strong>{org?.name}</strong>
          </p>
          <p className="text-xs text-[#94A3B8] mb-6">Access expires in {expiry} days · {selectedFields.length} fields shared</p>

          {/* Sharing token */}
          <div className="p-4 rounded-xl mb-6" style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
            <div className="text-xs text-[#64748B] mb-1.5">Sharing Reference Token</div>
            <div className="font-mono-data text-sm text-[#0F172A] font-semibold">SHR-{Date.now().toString(36).toUpperCase()}</div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setShared(false); setStep(0); setSelectedCred(null); setSelectedOrg(null); setSelectedFields([]); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-[#E2E8F0]"
              style={{ color: "#0F172A" }}
            >
              Share Another
            </button>
            <button
              onClick={() => navigate("consent-center")}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "#1D6AFF" }}
            >
              View Consents
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto page-transition">
      <div className="mb-6">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Share Credentials</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Selectively share your verified identity with organizations</p>
      </div>

      {/* Step tabs */}
      <div className="flex gap-2 mb-6">
        {["Select Credential", "Choose Recipient", "Set Permissions", "Confirm"].map((s, i) => (
          <div key={s} className="flex items-center gap-1 flex-1">
            <div
              className="flex-1 h-1 rounded-full"
              style={{ background: step >= i ? "#1D6AFF" : "#E2E8F0" }}
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {/* Step 0: Select credential */}
        {step === 0 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Select a Credential</h3>
            <div className="space-y-2">
              {verifiedCreds.map((cred) => (
                <button
                  key={cred.id}
                  onClick={() => setSelectedCred(cred.id)}
                  className="w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all"
                  style={{ borderColor: selectedCred === cred.id ? "#1D6AFF" : "#E2E8F0", background: selectedCred === cred.id ? "#E8EFFF" : "white" }}
                >
                  <div className="text-2xl">{cred.icon}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#0F172A] text-sm">{cred.type}</div>
                    <div className="text-xs text-[#64748B]">{cred.issuer}</div>
                  </div>
                  <CheckCircle size={16} color={selectedCred === cred.id ? "#1D6AFF" : "#E2E8F0"} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Select org */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-3">Choose Recipient Organization</h3>
            <div className="relative mb-3">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#94A3B8" />
              <input
                type="text"
                placeholder="Search organization..."
                value={searchOrg}
                onChange={e => setSearchOrg(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#0F172A]"
              />
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {filteredOrgs.map((org) => (
                <button
                  key={org.id}
                  onClick={() => setSelectedOrg(org.id)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all"
                  style={{ borderColor: selectedOrg === org.id ? "#1D6AFF" : "#E2E8F0", background: selectedOrg === org.id ? "#E8EFFF" : "white" }}
                >
                  <div className="text-xl">{org.logo}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-[#0F172A] text-sm">{org.name}</div>
                    <div className="text-xs text-[#64748B]">{org.type}</div>
                  </div>
                  <Building2 size={14} color={selectedOrg === org.id ? "#1D6AFF" : "#CBD5E1"} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Permissions */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-1">Set Permissions</h3>
            <p className="text-xs text-[#64748B] mb-4">Choose exactly which data to share. You can revoke access at any time.</p>

            <div className="mb-4">
              <div className="text-sm font-medium text-[#0F172A] mb-2">Data Fields</div>
              <div className="space-y-2">
                {fields.map((field) => (
                  <label key={field} className="flex items-center gap-3 p-3 rounded-xl border border-[#E2E8F0] cursor-pointer hover:border-[#A8C4FF] transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field)}
                      onChange={() => toggleField(field)}
                      className="w-4 h-4 rounded"
                      style={{ accentColor: "#1D6AFF" }}
                    />
                    <span className="text-sm text-[#0F172A]">{field}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-[#0F172A] mb-2">Access Duration</div>
              <div className="grid grid-cols-3 gap-2">
                {["7", "30", "90"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setExpiry(d)}
                    className="py-2 rounded-xl text-sm font-medium border-2 transition-all"
                    style={{ borderColor: expiry === d ? "#1D6AFF" : "#E2E8F0", background: expiry === d ? "#E8EFFF" : "white", color: expiry === d ? "#1D6AFF" : "#64748B" }}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Confirm & Share</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm py-2 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Credential</span>
                <span className="font-medium text-[#0F172A]">{cred?.type}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Recipient</span>
                <span className="font-medium text-[#0F172A]">{org?.name}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-[#F1F5F9]">
                <span className="text-[#64748B]">Fields shared</span>
                <span className="font-medium text-[#0F172A]">{selectedFields.length} fields</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-[#64748B]">Access expires</span>
                <span className="font-medium text-[#0F172A]">In {expiry} days</span>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-lg mb-4" style={{ background: "#FFFBEB", border: "1px solid #FDE68A" }}>
              <Shield size={14} color="#D97706" className="flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#92400E]">
                You can revoke this access at any time from the Consent Center. The organization will only see the fields you selected, nothing more.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
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
            onClick={() => step < 3 ? setStep(s => s + 1) : setShared(true)}
            disabled={
              (step === 0 && !selectedCred) ||
              (step === 1 && !selectedOrg) ||
              (step === 2 && selectedFields.length === 0)
            }
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40"
            style={{ background: "#1D6AFF" }}
          >
            {step === 3 ? (
              <><QrCode size={15} /> Share Now</>
            ) : (
              <>Continue <ArrowRight size={15} /></>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
        <Clock size={13} />
        <span>Shared credentials have time-limited access and leave a full audit trail.</span>
      </div>
    </div>
  );
}
