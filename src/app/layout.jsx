import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from './components/Sidebar.jsx';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Skole",
  description: "En hjemmeside til håndtering af skole",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-screen h-screen bg-[#ECEDF1] select-none">
        <div id="Container" className="h-full flex flex-row">
          <div id="SidebarContainer" className="h-full">
            <Sidebar />
          </div>
          <div id="ContentContainer" className="w-full h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
