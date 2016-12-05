import { EventEmitter } from "events";

import * as jute from "./lib/jute";

import ACL = require("./lib/ACL");
import Id = require("./lib/Id");
import Path = require("./lib/Path");
import Event = require("./lib/Event");
import State = require("./lib/State");
import Permission = require("./lib/Permission");
import CreateMode = require("./lib/CreateMode");
import Exception = require("./lib/Exception");
import Transaction = require("./lib/Transaction");
import ConnectionManager = require("./lib/ConnectionManager");

export interface ClientOptions {
  sessionTimeout: number;
  spinDelay: number;
  retries: number;
}
export class Client extends EventEmitter {
  connectionManager: ConnectionManager;
  options: ClientOptions;
  state: ConnectionManager.State;

  constructor(connectionString: string, options?: ClientOptions);

  connect(): void;
  close(): void;

  onConnectionManagerState(state: ConnectionManager.State);
  getState(): ConnectionManager.State;

  getSessionId(): Buffer;
  getSessionPassword(): Buffer;
  getSessionTimeout(): Buffer;

  addAuthInfo(scheme: string, auth: Buffer): void;


  create(path: string, callback: (...args: any[]) => void): void;
  create(path: string, data: Buffer, callback: (...args: any[]) => void): void;
  create(path: string, acls: ACL[], callback: (...args: any[]) => void): void;
  create(path: string, mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  create(path: string, data: Buffer, acls: ACL[], callback: (...args: any[]) => void): void;
  create(path: string, data: Buffer, mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  create(path: string, acls: ACL[], mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  create(path: string, data: Buffer, acls: ACL[], mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;


  remove(path: string, callback: (...args: any[]) => void): void;
  remove(path: string, version: number, callback: (...args: any[]) => void): void;


  remove(path: string, data: Buffer, callback: (...args: any[]) => void): void;
  remove(path: string, data: Buffer, version: number, callback: (...args: any[]) => void): void;


  getData(path: string, callback: (...args: any[]) => void): void;
  getData(path: string, watcher: (...args: any[]) => void, callback: (...args: any[]) => void): void;


  setACL(path: string, acls: ACL[], callback: (...args: any[]) => void): void;
  setACL(path: string, acls: ACL[], version: number, callback: (...args: any[]) => void): void;


  getACL(path: string, callback: (...args: any[]) => void): void;
  getACL(path: string, version: number, callback: (...args: any[]) => void): void;


  exists(path: string, watcher: (...args: any[]) => void, callback: (...args: any[]) => void): void;
  exists(path: string, watcher: (...args: any[]) => void, version: number, callback: (...args: any[]) => void): void;


  getChildren(path: string, watcher: (...args: any[]) => void, callback: (...args: any[]) => void): void;
  getChildren(path: string, watcher: (...args: any[]) => void, version: number, callback: (...args: any[]) => void): void;


  mkdirp(path: string, callback: (...args: any[]) => void): void;
  mkdirp(path: string, data: Buffer, callback: (...args: any[]) => void): void;
  mkdirp(path: string, acls: ACL[], callback: (...args: any[]) => void): void;
  mkdirp(path: string, mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  mkdirp(path: string, data: Buffer, acls: ACL[], callback: (...args: any[]) => void): void;
  mkdirp(path: string, data: Buffer, mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  mkdirp(path: string, acls: ACL[], mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;
  mkdirp(path: string, data: Buffer, acls: ACL[], mode: CreateMode.CreateMode, callback: (...args: any[]) => void): void;


  transaction(): Transaction;
}

export function createClient(): Client;

export {
  ACL,
  Id,
  Permission,
  CreateMode,
  State,
  Event,
  Exception
};
