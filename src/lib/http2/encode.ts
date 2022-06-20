import { ContentEncoding } from "./types";

export default async function encodeBody(
  body: Buffer,
  contentEncoding: ContentEncoding | ContentEncoding[]
): Promise<Buffer> {
  return (
    Array.isArray(contentEncoding) ? contentEncoding : [contentEncoding]
  ).reduce((accum, encoding) => {
    switch (encoding) {
      case "gzip":
        break;
      case "br":
        break;
      case "deflate":
        break;
    }
    return accum;
  }, Buffer.from(body));
}
