import {
  createSecureServer,
  Http2SecureServer,
  Http2ServerRequest,
} from "http2";
import { Http2ServerConfig, Http2Response } from "./types";
import { DEFAULT_HTTPS_PORT } from "./constants";
import createHttp2RequestHandler from "./request";
import createHttp2ErrorHandler from "./error";

export default async function createHttp2Server(
  config: Http2ServerConfig,
  onRequest: (req: Http2ServerRequest) => Promise<Http2Response>
): Promise<Http2SecureServer> {
  const { port = DEFAULT_HTTPS_PORT, hostname } = config;
  const server = createSecureServer(
    config,
    createHttp2RequestHandler(onRequest, createHttp2ErrorHandler())
  );
  return new Promise((resolve) => {
    server.listen(port, hostname, () => resolve(server));
  });
}
