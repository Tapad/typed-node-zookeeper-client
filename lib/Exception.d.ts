declare class Exception extends Error {
  static create(code: number, path: string): Exception;

  code: number;
  name: string;
  path?: string;
  message: string;

  constructor(code: number, name: string, ctor: Function);
  constructor(code: number, name: string, path: string, ctor: Function);
  getCode(): number;
  getPath(): string | undefined;
  toString(): string;
}

declare namespace Exception {
  export enum ExceptionCode {
    OK = 0,
    SYSTEM_ERROR = -1,
    RUNTIME_INCONSISTENCY = -2,
    DATA_INCONSISTENCY = -3,
    CONNECTION_LOSS = -4,
    MARSHALLING_ERROR = -5,
    UNIMPLEMENTED = -6,
    OPERATION_TIMEOUT = -7,
    BAD_ARGUMENTS = -8,
    API_ERROR = -100,
    NO_NODE = -101,
    NO_AUTH = -102,
    BAD_VERSION = -103,
    NO_CHILDREN_FOR_EPHEMERALS = -108,
    NODE_EXISTS = -110,
    NOT_EMPTY = -111,
    SESSION_EXPIRED = -112,
    INVALID_CALLBACK = -113,
    INVALID_ACL = -114,
    AUTH_FAILED = -115
  }

  export const OK: ExceptionCode.OK;
  export const SYSTEM_ERROR: ExceptionCode.SYSTEM_ERROR;
  export const RUNTIME_INCONSISTENCY: ExceptionCode.RUNTIME_INCONSISTENCY;
  export const DATA_INCONSISTENCY: ExceptionCode.DATA_INCONSISTENCY;
  export const CONNECTION_LOSS: ExceptionCode.CONNECTION_LOSS;
  export const MARSHALLING_ERROR: ExceptionCode.MARSHALLING_ERROR;
  export const UNIMPLEMENTED: ExceptionCode.UNIMPLEMENTED;
  export const OPERATION_TIMEOUT: ExceptionCode.OPERATION_TIMEOUT;
  export const BAD_ARGUMENTS: ExceptionCode.BAD_ARGUMENTS;
  export const API_ERROR: ExceptionCode.API_ERROR;
  export const NO_NODE: ExceptionCode.NO_NODE;
  export const NO_AUTH: ExceptionCode.NO_AUTH;
  export const BAD_VERSION: ExceptionCode.BAD_VERSION;
  export const NO_CHILDREN_FOR_EPHEMERALS: ExceptionCode.NO_CHILDREN_FOR_EPHEMERALS;
  export const NODE_EXISTS: ExceptionCode.NODE_EXISTS;
  export const NOT_EMPTY: ExceptionCode.NOT_EMPTY;
  export const SESSION_EXPIRED: ExceptionCode.SESSION_EXPIRED;
  export const INVALID_CALLBACK: ExceptionCode.INVALID_CALLBACK;
  export const INVALID_ACL: ExceptionCode.INVALID_ACL;
  export const AUTH_FAILED: ExceptionCode.AUTH_FAILED;
}

export = Exception;
