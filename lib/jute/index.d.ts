export const PROTOCOL_VERSION: number;

export enum OP_CODES {
    NOTIFICATION = 0,
    CREATE = 1,
    DELETE = 2,
    EXISTS = 3,
    GET_DATA = 4,
    SET_DATA = 5,
    GET_ACL = 6,
    SET_ACL = 7,
    GET_CHILDREN = 8,
    SYNC = 9,
    PING = 11,
    GET_CHILDREN2 = 12,
    CHECK = 13,
    MULTI = 14,
    AUTH = 100,
    SET_WATCHES = 101,
    SASL = 102,
    CREATE_SESSION = -10,
    CLOSE_SESSION = -11,
    ERROR = -1
}

export const XID_NOTIFICATION: -1;
export const XID_PING: -2;
export const XID_AUTHENTICATION: -4;
// export const XID_SET_WATCHES: -8; // not actually exported, just defined

export interface RecordAttribute {
  name: string;
  type: string;
}
export type RecordSpecification = RecordAttribute[];

export abstract class Record {
  specification: RecordSpecification;
  chrootPath: string | undefined;

  setChrootPath(path: string): void;
  byteLength(): number;
  serialize(buffer: Buffer, offset: number): number;
  deserialize(buffer: Buffer, offset: number): number;
}

export namespace data {
  export class Id extends Record {
    scheme: string;
    id: string;
  }
  export class ACL extends Record {
    perms: string;
    id: string;
  }
  export class Stat extends Record {
    czxid: number;
    mzxid: number;
    ctime: number;
    mtime: number;
    version: number;
    cversion: number;
    aversion: number;
    ephemeralOwner: number;
    dataLength: number;
    numChildren: number;
    pzxid: number;
  }
}

export namespace protocol {
  export class ConnectRequest extends Record {
    protocolVersion: number;
    lastZxidSeen: number;
    timeOut: number;
    sessionId: number;
    passwd: Buffer;
  }
  export class ConnectResponse extends Record {
    protocolVersion: number;
    timeOut: number;
    sessionId: number;
    passwd: Buffer;
  }
  export class RequestHeader extends Record {
    xid: number;
    type: number;
  }
  export class ReplyHeader extends Record {
    xid: number;
    zxid: number;
    err: number;
  }
  export class AuthPacket extends Record {
    type: number;
    scheme: string;
    auth: Buffer;
  }
  export class CreateRequest extends Record {
    path: string;
    data: Buffer;
    acl: data.ACL[];
    flags: number;
  }
  export class CreateResponse extends Record {
    path: string;
  }
  export class DeleteRequest extends Record {
    path: string;
    version: number;
  }
  export class GetChildren2Request extends Record {
    path: string;
    watch: boolean;
  }
  export class GetChildren2Response extends Record {
    children: string[];
    stat: data.Stat;
  }
  export class ExistsRequest extends Record {
    path: string;
    watch: boolean;
  }
  export class ExistsResponse extends Record {
    stat: data.Stat;
  }
  export class SetDataRequest extends Record {
    path: string;
    data: Buffer;
    version: number;
  }
  export class SetDataResponse extends Record {
    stat: data.Stat;
  }
  export class GetDataRequest extends Record {
    path: string;
    watch: boolean;
  }
  export class GetDataResponse extends Record {
    data: Buffer;
    stat: data.Stat;
  }
  export class GetACLRequest extends Record {
    path: string;
  }
  export class GetACLResponse extends Record {
    acl: data.ACL[];
    stat: data.Stat;
  }
  export class SetACLRequest extends Record {
    path: string;
    acl: data.ACL[];
    version: number;
  }
  export class SetACLResponse extends Record {
    stat: data.Stat;
  }
  export class WatcherEvent extends Record {
    type: number;
    state: number;
    path: string;
  }
  export class SetWatches extends Record {
    relativeZxid: number;
    dataWatches: string[];
    existWatches: string[];
    childWatches: string[];
  }
  export class MultiHeader extends Record {
    type: number;
    done: boolean;
    err: number;
  }
  export class CheckVersionRequest extends Record {
    path: string;
    version: number;
  }
  export class ErrorResponse extends Record {
    err: number;
  }
}

export class TransactionRequest {
  ops: any;
  records: Record[];

  constructor(ops);

  setChrootPath(path: string): void;
  byteLength(): number;
  serialize(buffer: Buffer, offset: number): number;
}

export interface TransactionResponseResult {
  type: any;
  path?: any;
  stat?: any;
  err?: any;
}
export class TransactionResponse {
  results: TransactionResponseResult[];
  chrootPath: string | undefined;

  setChrootPath(path: string): void;
  byteLength(): number;
  deserialize(buffer: Buffer, offset: number): number;
}

export type Payload = any;
export class Request {
  constructor(header: Record, payload: Payload);

  toBuffer(): Buffer;
}
export class Response {
  constructor(header: Record, payload: Payload);
}
