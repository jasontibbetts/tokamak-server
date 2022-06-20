import { Http2ServerRequest } from "http2";
import { Http2Response } from "../http2/types";
import createRoute from "./route";
import { Route, RouteContext, RouteDefinition, Router } from "./types";

export default function createRouter<T extends RouteContext>(definitions: RouteDefinition[]): Router<T> {
    const routes: Route<T>[] = definitions.map(createRoute);
    return async (req: Http2ServerRequest, ctx: T): Promise<Http2Response | undefined> => {
        for (const { match, handler } of routes) {
            const matchResult = match(req);
            if (matchResult !== false) {
                // return handler(req, (await middleware(req, { ...ctx })), matchResult);
                return handler(req, ctx, matchResult);
            }
        }
        return undefined;
    };
}