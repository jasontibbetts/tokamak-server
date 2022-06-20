import { HTTP_DEFAULT_ERROR_STATUS } from "./constants";
import Http2Error from "./Http2Error";
import { Http2Response } from "./types";
/*
export default async function handleError(
  error: unknown
): Promise<Http2Response> {
  if (error instanceof Http2Error) {
    return {
      headers: error.headers,
      body: error.message,
      status: error.status,
    };
  }
  return {};
}
*/

export default function createHttp2ErrorHandler(): (
  error: unknown
) => Promise<Http2Response> {
  return async (error: unknown) => {
    if (error instanceof Http2Error) {
      return {
        headers: error.headers,
        body: error.message,
        status: error.status,
      };
    }
    return {
      status: HTTP_DEFAULT_ERROR_STATUS,
    };
  };
}
