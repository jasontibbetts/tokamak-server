import {
  Http2ServerRequest,
  Http2ServerResponse,
  OutgoingHttpHeaders,
  SecureServerOptions,
} from "http2";

export interface Http2ServerConfig extends SecureServerOptions {
  port?: number;
  hostname?: string;
}

export type ContentEncoding = "gzip" | "compress" | "deflate" | "br";

export interface Http2Response {
  headers?: OutgoingHttpHeaders;
  body?: string | Buffer;
  status?: number;
  encoding?: BufferEncoding;
  contentEncoding?: ContentEncoding | ContentEncoding[];
}

export type Http2RequestHandler = (
  request: Http2ServerRequest,
  response: Http2ServerResponse
) => Promise<void>;
