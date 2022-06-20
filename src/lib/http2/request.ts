import { Http2ServerRequest, Http2ServerResponse } from "http2";
import sendResponse from "./response";
import { Http2RequestHandler, Http2Response } from "./types";

export default function createHttp2RequestHandler(
  handler: (req: Http2ServerRequest) => Promise<Http2Response>,
  handleError: (error: unknown) => Promise<Http2Response>
): Http2RequestHandler {
  return async (
    req: Http2ServerRequest,
    res: Http2ServerResponse
  ): Promise<void> => {
    let response: Http2Response;
    try {
      response = await handler(req);
    } catch (e) {
      response = await handleError(e);
    }
    // TODO: Handle negotiation of content-type etc here, also set content-length etc in addition to compression
    return sendResponse(response, res);
  };
}
