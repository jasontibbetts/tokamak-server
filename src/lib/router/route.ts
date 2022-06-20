import { Http2ServerRequest } from "http2";
import { Match } from "path-to-regexp";
import { Route, RouteContext, RouteDefinition } from "./types";
import { match as createMatcher } from 'path-to-regexp';
import createQueryParamMatcher from "./query";
import createCookieMatcher from "./cookie";

export default function createRoute<T extends RouteContext>(definition: RouteDefinition<T>): Route<T> {
    const {
        path,
        handler,
        domain,
        method,
        query,
        cookie
    } = definition;
    const matchPath = path ? createMatcher(path) : (path: string) => ({ path, index: 0, params: {} });
    const matchDomain = (requestDomain: string) => domain === undefined || (Array.isArray(domain) ? domain : [domain]).includes(requestDomain);
    const matchMethod = (requestMethod: string) => method === undefined || (Array.isArray(method) ? method : [method]).includes(requestMethod);
    const matchQuery = createQueryParamMatcher(query);
    const matchCookies = createCookieMatcher(cookie);
    const match = (req: Http2ServerRequest): Match => {
        const url = new URL(req.url, `${req.scheme}:${req.authority}`);
        const cookies = req.headers['cookie'];
        return matchDomain(url.host) && 
               matchMethod(req.method) && 
               matchQuery(url.searchParams) &&
               matchCookies(cookies) && 
               matchPath(url.pathname);
    };
    return {
        handler,
        match
    };
}