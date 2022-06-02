const KB = 1024;
const MB = 1024 * 1024;
const GB = 1024 * 1024 * 1024;
const TB = 1024 * 1024 * 1024 * 1024;

export function storage(value: number = 0) {
    let result = `${value} bytes`;
    if (value >= TB) {
        result = `${(value / TB).toFixed(1)} TB`;
    } else if (value >= GB) {
        result = `${(value / GB).toFixed(1)} GB`;
    } else if (value >= MB) {
        result = `${(value / MB).toFixed(1)} MB`;
    } else if (value >= KB) {
        result = `${(value / KB).toFixed(1)} KB`;
    }
    return result;
}

export function files(value: number = 0) {
    let result = `${value}`;
    if (value >= 1000000) {
        result = `${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
        result = `${(value / 1000).toFixed(0)}K`;
    }
    return result;
}
