declare class State {
  name: string;
  code: number;

  constructor(name: string, code: number);

  getName(): string;
  getCode(): number;
  toString(): string;
}

declare namespace State {
  export interface DefinedState<N extends string, C extends number> {
    name: N;
    code: C;

    getName(): N;
    getCode(): C;
  }

  export type DISCONNECTED = DefinedState<"DISCONNECTED", 0>;
  export const DISCONNECTED: DISCONNECTED;

  export type SYNC_CONNECTED = DefinedState<"SYNC_CONNECTED", 3>;
  export const SYNC_CONNECTED: SYNC_CONNECTED;

  export type AUTH_FAILED = DefinedState<"AUTH_FAILED", 4>;
  export const AUTH_FAILED: AUTH_FAILED;

  export type CONNECTED_READ_ONLY = DefinedState<"CONNECTED_READ_ONLY", 5>;
  export const CONNECTED_READ_ONLY: CONNECTED_READ_ONLY;

  export type SASL_AUTHENTICATED = DefinedState<"SASL_AUTHENTICATED", 6>;
  export const SASL_AUTHENTICATED: SASL_AUTHENTICATED;

  export type EXPIRED = DefinedState<"EXPIRED", -122>;
  export const EXPIRED: EXPIRED;
}

export = State;
