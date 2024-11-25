import { config } from "@/config";
import { ButtonScheduler } from "./ButtonScheduler";
import { InlineScheduler } from "./InlineScheduler";

export function Scheduler({ inline = false }) {
    if (!config.scheduler.enabled) return null;
    
    return inline ? <InlineScheduler /> : <ButtonScheduler />;
}
export { ButtonScheduler, InlineScheduler };