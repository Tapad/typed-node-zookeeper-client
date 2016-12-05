import * as jute from "./jute";

declare class Id {
  static fromRecord(record: jute.data.Id): Id;

  scheme: string;
  id: string;

  constructor(scheme: string, id: string);

  toRecord(): jute.data.Id;
}

declare namespace Id {
  export interface DefinedId<S extends string, I extends string> extends Id {
    scheme: S;
    id: I;
  }

  export type ANYONE_ID_UNSAFE = DefinedId<"world", "anyone">;
  export const ANYONE_ID_UNSAFE: ANYONE_ID_UNSAFE;

  export type AUTH_IDS = DefinedId<"auth", "">;
  export const AUTH_IDS: AUTH_IDS;
}

export = Id;
