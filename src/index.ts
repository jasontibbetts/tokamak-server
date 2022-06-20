import { readFileSync } from "fs";
import { Http2Server, Http2ServerRequest } from "http2";
import path from "path";
import createHttp2Server from "./lib/http2/server";

export async function main() {
  const server = await createHttp2Server(
    {
      key: readFileSync(path.resolve("config", "localhost-privkey.pem")),
      cert: readFileSync(path.resolve("config", "localhost-cert.pem")),
      port: 443,
    },
    async (req: Http2ServerRequest) => {
      return {
        status: 200,
        body: `<!doctype html><html>
    <head>
    </head>
    <body>
        <h1>Hello World</h1>
    </body>
</html>`,
      };
    }
  );
}

main();
