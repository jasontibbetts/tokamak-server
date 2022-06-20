import { STATUS_CODES } from "http";
import { OutgoingHttpHeaders } from "http2";

export default class Http2Error extends Error {
  status: number;
  headers: OutgoingHttpHeaders;

  constructor(
    message: string,
    status = 500,
    stack?: string,
    headers: OutgoingHttpHeaders = {}
  ) {
    super(`${STATUS_CODES[status]}: ${message}`);
    this.status = status;
    this.stack = stack;
    this.headers = headers;
  }
}
