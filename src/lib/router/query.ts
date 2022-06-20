import { URLSearchParams } from 'url';

export default function createQueryParamMatcher(params?: Record<string, string | RegExp>): (query: URLSearchParams) => boolean {
    return (query: URLSearchParams): boolean => {
        if (params === undefined) {
            return true;
        }
        for (const key in params) {
            const condition = params[key];
            if (query.has(key)) {
                const match = query.getAll(key).reduce((accum: boolean, value: string) => accum || (condition instanceof RegExp ? condition.test(value) : value === condition), false);
                if (match) {
                    return true;
                }
            }
        }
        return false;
    };
}