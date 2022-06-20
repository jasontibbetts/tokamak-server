import { OutgoingHttpHeaders } from "http2";

export const HTTP_STATUS_OK: number = 200 as const;
export const HTTP_STATUS_NO_CONTENT: number = 204 as const;
export const HTTP_DEFAULT_ERROR_STATUS: number = 500 as const;
export const DEFAULT_HEADERS: OutgoingHttpHeaders = {} as const;
export const DEFAULT_HTTPS_PORT: number = 443 as const;
export const CONTENT_LENGTH: string = "content-length" as const;
export const DEFAULT_CONTENT_TYPE: string = "text/plain" as const;
export const MIN_COMPRESSABLE_SIZE: number = 24 as const;
export const DEFAULT_ENCODING: BufferEncoding = "utf-8" as const;
export const CONTENT_ENCODING: string = "content-encoding" as const;
