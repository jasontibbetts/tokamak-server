import { Http2ServerRequest } from "http2";
import { Http2Response } from "../http2/types";

export type Router = (
  request: Http2ServerRequest
) => Promise<Http2Response | undefined>;
