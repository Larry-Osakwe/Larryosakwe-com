import "./globals.css";
import { ThemeProvider } from "@/components/DarkMode/theme-provider";
import { getSEOTags } from "@/lib/seo/seo";

export const metadata = getSEOTags();

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
