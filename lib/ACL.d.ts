import * as jute from "./jute";
import { Permission } from "./Permission";

import Id = require("./Id");

declare class ACL {
  static fromRecord(record: jute.data.ACL): ACL;

  permission: Permission;
  id: Id;

  constructor(permission: Permission, id: Id);

  toRecord(): jute.data.ACL;
}

declare namespace ACL {
  export interface DefinedACL<P extends number, I extends Id> {
    permission: P;
    id: I;
  }

  export type OPEN_ACL_UNSAFE = [DefinedACL<Permission.ALL, Id.ANYONE_ID_UNSAFE>];
  export const OPEN_ACL_UNSAFE: OPEN_ACL_UNSAFE;

  export type CREATOR_ALL_ACL = [DefinedACL<Permission.ALL, Id.AUTH_IDS>];
  export const CREATOR_ALL_ACL: CREATOR_ALL_ACL;

  export type READ_ACL_UNSAFE = [DefinedACL<Permission.READ, Id.ANYONE_ID_UNSAFE>];
  export const READ_ACL_UNSAFE: READ_ACL_UNSAFE;
}

export = ACL;
