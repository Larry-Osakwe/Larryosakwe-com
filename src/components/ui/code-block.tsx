"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <pre className={`rounded-lg bg-muted ${className}`}>
        {language && (
          <div className="absolute left-3 top-2 text-xs text-muted-foreground">
            {language}
          </div>
        )}
        {isHovered && (
          <div 
            className="absolute right-2 top-2 transition-opacity"
            onClick={copyToClipboard}
          >
            <div className="hover:bg-muted-foreground/5 p-2 rounded-md cursor-pointer">
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </div>
          </div>
        )}
        <code className={language ? "pt-8 block" : ""}>{code}</code>
      </pre>
    </div>
  )
} 