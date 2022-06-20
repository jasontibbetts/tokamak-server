// TODO: optimize to only parse cookies once some how (this is likely in the code calling this, but then this will take parsed cookies not a string)
export function getCookieValue(key: string, cookies: string): string | undefined {
    // This is NOT a useless escape, the lint rule is wrong here, the \s is needed to capture the fact that coookies are formatted name1=value; name2=value; 
    // eslint-disable-next-line no-useless-escape
    const match = cookies.match(`\s?${key}=([^;]*);?`);
    if (match === null || match.length < 2) {
        return undefined;
    }
    return decodeURIComponent(match[1].trim());
}

export default function createCookieMatcher(conditions?: Record<string, string | RegExp>): (cookies?: string) => boolean {
    return (cookies?: string) => {
        if (conditions === undefined) {
            return true;
        }
        if (cookies === undefined) {
            return false;
        }
        for (const key in conditions) {
            const condition = conditions[key];
            const value = getCookieValue(key, cookies);
            if (value === undefined || !(condition instanceof RegExp ? condition.test(value) : value === condition)) {
                return false;
            }
        }
        return true;
    };
}