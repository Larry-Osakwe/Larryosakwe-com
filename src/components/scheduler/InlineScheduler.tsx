import { config } from "@/config";

export function InlineScheduler() {
    const { url, width, height } = config.scheduler.defaultConfig;
    
    return (
      <iframe 
        src={url}
        style={{ border: 0, width, height }}
      />
    );
  }