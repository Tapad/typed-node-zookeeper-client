import * as jute from "./jute";

import { CreateMode } from "./CreateMode";

import Path = require("./Path");
import ACL = require("./ACL");
import Exception = require("./Exception");
import ConnectionManager = require("./ConnectionManager");

declare class Transaction {
  ops: Transaction.TransactionOp[];
  connectionmanager: ConnectionManager;

  constructor (connectionmanager: ConnectionManager);

  create(path: string, data?: Buffer, acls?: ACL[], mode?: CreateMode): this;
  check(path: string, version?: number): this;
  setData(path: string, data: Buffer, version?: number): this;
  remove(path: string, version?: number): this;
  commit(callback: (...args: any[]) => void): void;
}

declare namespace Transaction {
  export interface TransactionOp {
    type: jute.OP_CODES;
    path: string;
    data?: Buffer;
    acls?: ACL[];
    mode?: CreateMode;
    version?: number;
  }
}

export = Transaction;
