import { Http2ServerRequest } from "http2";
import { Match } from "path-to-regexp";
import { Http2Response } from "../http2/types";

export interface RouteContext {
}

export type Router<T extends RouteContext = {}> = (
  request: Http2ServerRequest,
  context: T
) => Promise<Http2Response | undefined>;

export type RouteHandler<T extends RouteContext> = (request: Http2ServerRequest, context: T, match: Match) => Promise<Http2Response | undefined>
export type RouteMatcher = (request: Http2ServerRequest) => Match

export type RouteDefinition<T extends RouteContext = {}> = {
    path?: string | string[]
    method?: string | string[]
    query?: Record<string, string | RegExp>
    cookie?: Record<string, string | RegExp>
    domain?: string | string[]
    handler: RouteHandler<T>
};

export type Route<T extends RouteContext = {}> = {
  match: RouteMatcher
  handler: RouteHandler<T>
};
