import { Http2ServerResponse } from "http2";
import {
  HTTP_STATUS_OK,
  DEFAULT_HEADERS,
  HTTP_STATUS_NO_CONTENT,
  CONTENT_LENGTH,
  DEFAULT_ENCODING,
  CONTENT_ENCODING,
} from "./constants";
import { Http2Response } from "./types";
import encodeBody from "./encode";

export default async function sendResponse(
  response: Http2Response,
  res: Http2ServerResponse
): Promise<void> {
  const {
    status,
    headers = DEFAULT_HEADERS,
    body,
    encoding = DEFAULT_ENCODING,
    contentEncoding,
  } = response;
  return new Promise<void>(async (resolve, reject) => {
    try {
      const finalHeaders = { ...headers };
      let finalBody: Buffer | undefined = body ? Buffer.from(body) : undefined;
      if (contentEncoding && finalBody) {
        finalBody = await encodeBody(finalBody, contentEncoding);
        finalHeaders[CONTENT_ENCODING] = Array.isArray(contentEncoding)
          ? contentEncoding.join(", ")
          : contentEncoding;
      }
      const contentLength = finalBody?.length || 0;
      const finalStatus =
        status || contentLength > 0 ? HTTP_STATUS_OK : HTTP_STATUS_NO_CONTENT;
      if (contentLength > 0) {
        finalHeaders[CONTENT_LENGTH] = contentLength;
      }

      res.writeHead(finalStatus, finalHeaders);
      if (body) {
        if (encoding) {
          res.end(body, encoding, resolve);
        } else {
          res.end(body, resolve);
        }
      } else {
        res.end(resolve);
      }
    } catch (e) {
      // Reject with any exception from calling the res methods
      reject(e);
    }
  });
}
