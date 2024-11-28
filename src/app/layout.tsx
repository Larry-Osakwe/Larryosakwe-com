import "./globals.css";
import { ThemeProvider } from "@/components/theme";

import { OpenPanelComponent } from '@openpanel/nextjs';
import { getSEOTags } from "@/lib/seo/seo";

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <OpenPanelComponent 
        clientId={process.env.OPEN_PANEL_CLIENT_ID || ''} 
        trackScreenViews={true}
        trackOutgoingLinks={true} 
      /> */}
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