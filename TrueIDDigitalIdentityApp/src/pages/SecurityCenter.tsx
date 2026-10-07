import { useState } from "react";
import { Shield, Fingerprint, Smartphone, Monitor, AlertTriangle, CheckCircle, Lock, Eye, ChevronRight } from "lucide-react";
import { securityEvents, user } from "../data/demo";

const securityScore = 87;

interface Props { navigate: (page: string) => void }

export default function SecurityCenter({ navigate }: Props) {
  const [twoFA, setTwoFA] = useState(true);
  const [biometric, setBiometric] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [shareAlerts, setShareAlerts] = useState(true);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto page-transition">
      <div className="mb-5">
        <h1 className="font-display font-bold text-[#0F172A] text-xl md:text-2xl">Security Center</h1>
        <p className="text-sm text-[#64748B] mt-0.5">Monitor and manage your account security</p>
      </div>

      {/* Security Score */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-[#64748B] mb-1">Security Score</div>
            <div className="font-display font-bold text-4xl" style={{ color: "#059669", letterSpacing: "-0.03em" }}>{securityScore}</div>
            <div className="text-sm font-medium text-[#059669] mt-0.5">Good — Keep it up</div>
          </div>
          <div className="relative w-24 h-24">
            <svg width="96" height="96" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="#059669"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(securityScore / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}`}
                transform="rotate(-90 48 48)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield size={24} color="#059669" />
            </div>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-[#F1F5F9]">
          {[
            { label: "2FA", score: 100, ok: true },
            { label: "Biometric", score: 100, ok: true },
            { label: "Device Trust", score: 60, ok: false },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-sm font-display font-bold" style={{ color: s.ok ? "#059669" : "#D97706" }}>{s.score}%</div>
              <div className="text-xs text-[#94A3B8]">{s.label}</div>
              <div className="h-1 rounded-full mt-1.5" style={{ background: "#E2E8F0" }}>
                <div className="h-1 rounded-full" style={{ background: s.ok ? "#059669" : "#D97706", width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Security Settings */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Authentication</h3>
            <div className="space-y-4">
              {[
                { label: "Two-Factor Authentication", desc: "SMS + Authenticator App", icon: Smartphone, value: twoFA, set: setTwoFA },
                { label: "Biometric Login", desc: "Face ID & Fingerprint", icon: Fingerprint, value: biometric, set: setBiometric },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#E8EFFF" }}>
                      <Icon size={16} color="#1D6AFF" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#0F172A]">{item.label}</div>
                      <div className="text-xs text-[#64748B]">{item.desc}</div>
                    </div>
                    <button
                      onClick={() => item.set(!item.value)}
                      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
                      style={{ background: item.value ? "#1D6AFF" : "#CBD5E1" }}
                    >
                      <div
                        className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all"
                        style={{ left: item.value ? 24 : 4 }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Alerts</h3>
            <div className="space-y-4">
              {[
                { label: "Login Alerts", desc: "New device sign-ins", value: loginAlerts, set: setLoginAlerts },
                { label: "Credential Share Alerts", desc: "When credentials are shared", value: shareAlerts, set: setShareAlerts },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#0F172A]">{item.label}</div>
                    <div className="text-xs text-[#64748B]">{item.desc}</div>
                  </div>
                  <button
                    onClick={() => item.set(!item.value)}
                    className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
                    style={{ background: item.value ? "#1D6AFF" : "#CBD5E1" }}
                  >
                    <div className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: item.value ? 24 : 4 }} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-3">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Change PIN", icon: Lock },
                { label: "Change Password", icon: Lock },
                { label: "Review Trusted Devices", icon: Monitor },
                { label: "Download Account Data", icon: Eye },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <button key={a.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors text-left">
                    <Icon size={15} color="#64748B" />
                    <span className="flex-1 text-sm text-[#0F172A]">{a.label}</span>
                    <ChevronRight size={14} color="#CBD5E1" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sessions + Events */}
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {securityEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl border" style={{ borderColor: event.status === "blocked" ? "#FECACA" : "#E2E8F0", background: event.status === "blocked" ? "#FEF2F2" : "white" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: event.status === "blocked" ? "#FEF2F2" : "#E8EFFF" }}>
                    {event.device.includes("iPhone") || event.device.includes("Android") ? <Smartphone size={14} color={event.status === "blocked" ? "#DC2626" : "#1D6AFF"} /> : <Monitor size={14} color={event.status === "blocked" ? "#DC2626" : "#1D6AFF"} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#0F172A] truncate">{event.device}</div>
                    <div className="text-xs text-[#64748B]">{event.location}</div>
                    <div className="text-xs text-[#94A3B8]">{new Date(event.time).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    {event.status === "current" && <span className="badge-verified text-xs font-semibold px-2 py-0.5 rounded-full">Current</span>}
                    {event.status === "active" && <span className="badge-active text-xs font-semibold px-2 py-0.5 rounded-full">Active</span>}
                    {event.status === "blocked" && <span className="badge-expired text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"><AlertTriangle size={9} />Blocked</span>}
                    {event.status !== "current" && event.status !== "blocked" && (
                      <button className="text-xs text-[#DC2626] font-medium">Revoke</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security tips */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-5">
            <h3 className="font-display font-semibold text-[#0F172A] mb-3 text-sm">Security Recommendations</h3>
            <div className="space-y-2.5">
              {[
                { text: "Enable 2FA on all devices", done: true },
                { text: "Use biometric authentication", done: true },
                { text: "Review linked organizations monthly", done: false },
                { text: "Set up recovery phone number", done: false },
              ].map((tip) => (
                <div key={tip.text} className="flex items-center gap-2.5">
                  {tip.done ? <CheckCircle size={15} color="#059669" className="flex-shrink-0" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-[#CBD5E1] flex-shrink-0" />}
                  <span className={`text-xs ${tip.done ? "text-[#64748B] line-through" : "text-[#0F172A]"}`}>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
