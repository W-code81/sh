import { randomBytes } from "node:crypto";

/** Generates a short, non-sequential ID; uniqueness is enforced by MongoDB. */
export function createPassId() {
  return `SHIFT-${randomBytes(5).toString("hex").toUpperCase()}`;
}
