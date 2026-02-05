export type Target =
  | { kind: "device"; id: string }
  | { kind: "user"; id: string }
  | { kind: "segment"; tags: string[] };
