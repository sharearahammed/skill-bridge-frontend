import { Manrope, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { cn } from "@/lib/utils";
import { userService } from "../services/user.service";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={manrope.className}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        ></ThemeProvider> */}
        <Navbar user={user} />
        <div className="mt-20">
          {children}
        </div>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
