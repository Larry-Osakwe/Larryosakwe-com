export interface SchedulerConfig {
    enabled: boolean;
    defaultConfig: {
        url: string;
        color?: string;
        label?: string;
        inline?: boolean;
        width?: string;
        height?: string;
    }
}