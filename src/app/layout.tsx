import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/DarkMode/theme-provider";
import { config } from "@/config"

export const metadata: Metadata = {
  title: config.appName,
  description: `Welcome to ${config.appName}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
