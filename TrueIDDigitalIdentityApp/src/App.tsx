import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import TopBar from "./components/layout/TopBar";

import Dashboard from "./pages/Dashboard";
import MyIDs from "./pages/MyIDs";
import IdentityVerification from "./pages/IdentityVerification";
import VerifiedDocuments from "./pages/VerifiedDocuments";
import ShareCredential from "./pages/ShareCredential";
import ConsentCenter from "./pages/ConsentCenter";
import ActivityHistory from "./pages/ActivityHistory";
import DigitalWallet from "./pages/DigitalWallet";
import SendMoney from "./pages/SendMoney";
import ReceiveMoney from "./pages/ReceiveMoney";
import QRPayments from "./pages/QRPayments";
import QRIdentityVerification from "./pages/QRIdentityVerification";
import Notifications from "./pages/Notifications";
import SecurityCenter from "./pages/SecurityCenter";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";

type Page =
  | "dashboard" | "my-ids" | "identity-verification" | "verified-documents"
  | "share-credential" | "consent-center" | "activity-history"
  | "digital-wallet" | "send-money" | "receive-money" | "qr-payments" | "qr-identity"
  | "notifications" | "security-center" | "settings" | "help-support";

function PageContent({ page, navigate }: { page: Page; navigate: (p: string) => void }) {
  const props = { navigate };
  switch (page) {
    case "dashboard":            return <Dashboard {...props} />;
    case "my-ids":               return <MyIDs {...props} />;
    case "identity-verification":return <IdentityVerification {...props} />;
    case "verified-documents":   return <VerifiedDocuments {...props} />;
    case "share-credential":     return <ShareCredential {...props} />;
    case "consent-center":       return <ConsentCenter {...props} />;
    case "activity-history":     return <ActivityHistory {...props} />;
    case "digital-wallet":       return <DigitalWallet {...props} />;
    case "send-money":           return <SendMoney {...props} />;
    case "receive-money":        return <ReceiveMoney {...props} />;
    case "qr-payments":          return <QRPayments {...props} />;
    case "qr-identity":          return <QRIdentityVerification {...props} />;
    case "notifications":        return <Notifications {...props} />;
    case "security-center":      return <SecurityCenter {...props} />;
    case "settings":             return <Settings {...props} />;
    case "help-support":         return <HelpSupport {...props} />;
    default:                     return <Dashboard {...props} />;
  }
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    const content = document.getElementById("page-content");
    if (content) content.scrollTop = 0;
  };

  return (
    <div className="h-full flex" style={{ background: "var(--background)" }}>
      {/* Desktop Sidebar */}
      <Sidebar currentPage={currentPage} navigate={navigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopBar currentPage={currentPage} navigate={navigate} />

        {/* Scrollable page content */}
        <main
          id="page-content"
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: 80 }}
        >
          <PageContent page={currentPage} navigate={navigate} />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav currentPage={currentPage} navigate={navigate} />
    </div>
  );
}
