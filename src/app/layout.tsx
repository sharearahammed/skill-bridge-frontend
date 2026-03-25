import { Manrope, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { cn } from "@/lib/utils";
import { userService } from "../services/user.service";

export const dynamic = "force-dynamic";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Skill Bridge",
  description: "Online Tutor Booking Platform",
  icons: {
    icon: "../app/favicon.png",
  },
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await userService.getSession();
  const user = data?.user;
  console.log({user});
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={manrope.className}>
        <Navbar user={user} />
        <div className="mt-10">{children}</div>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
