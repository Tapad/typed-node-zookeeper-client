import { EventEmitter } from "events";
import { Socket } from "net";

import * as jute from "./jute";

import ConnectionStringParser = require("./ConnectionStringParser");
import WatcherManager = require("./WatcherManager");
import PacketQueue = require("./PacketQueue");
import Exception = require("./Exception");

declare class ConnectionManager extends EventEmitter {
  watcherManager: WatcherManager;
  connectionStringParser: ConnectionStringParser;

  servers: ConnectionStringParser.ConnectionServer[];
  chrootPath: string;
  nextServerIndex: number;
  serverAttempts: number;

  state: ConnectionManager.State;

  options: ConnectionManager.ConnectionManagerOptions;
  spinDelay: number;
  sessionTimeout: number;
  connectTimeout: number;
  pingTimeout: number;

  connectTimeoutHandler: NodeJS.Timer | null;
  xid: number;
  sessionId: Buffer;
  sessionPassword: Buffer;
  credentials: ConnectionManager.ConnectionCredential[];
  zxid: Buffer;
  pendingBuffer: Buffer | null;
  packetQueue: PacketQueue<ConnectionManager.ConnectionPacket>;

  socket: Socket;

  constructor(connectionString: string, options: ConnectionManager.ConnectionManagerOptions, stateListener: Object);

  updateTimeout(sessionTimeout: number): void;
  findNextServer(callback: (server: ConnectionStringParser.ConnectionServer) => void): void;
  setState(state: ConnectionManager.State): void;

  registerDataWatcher(path: string, watcher: (...args: any[]) => void): void;
  registerChildWatcher(path: string, watcher: (...args: any[]) => void): void;
  registerExistenceWatcher(path: string, watcher: (...args: any[]) => void): void;

  getSessionId(): Buffer;
  getSessionPassword(): Buffer;
  getSessionTimeout(): number;

  connect(): void;
  close(): void;

  onSocketClosed(hasError: boolean): void;
  onSocketError(error: Error): void;
  onSocketConnectTimeout(): void;
  onSocketConnected(): void;
  onSocketTimeout(): void;
  onSocketData(buffer: Buffer): void;
  onSocketDrain(): void;
  onPacketQueueReadable(): void;

  addAuthInfo(scheme: string, auth: Buffer): void;
  queue(request: jute.Request, callback: (...args: any[]) => void): void;
}

declare namespace ConnectionManager {
  export interface ConnectionManagerOptions {
    sessionTimeout: number;
    spinDelay: number;
    sessionPassword?: Buffer;
    sessionId?: Buffer;
  }

  export interface ConnectionPacket {
    request: jute.Request;
    callback: (...args: any[]) => void;
  }

  export interface ConnectionCredential {
    scheme: string;
    auth: Buffer;
  }

  export enum State {
    DISCONNECTED = 0,
    CONNECTING = 1,
    CONNECTED = 2,
    CONNECTED_READ_ONLY = 3,
    CLOSING = -1,
    CLOSED = -2,
    SESSION_EXPIRED = -3,
    AUTHENTICATION_FAILED = -4
  }
  export const STATES: {
    DISCONNECTED: State.DISCONNECTED,
    CONNECTING: State.CONNECTING,
    CONNECTED: State.CONNECTED,
    CONNECTED_READ_ONLY: State.CONNECTED_READ_ONLY,
    CLOSING: State.CLOSING,
    CLOSED: State.CLOSED,
    SESSION_EXPIRED: State.SESSION_EXPIRED,
    AUTHENTICATION_FAILED: State.AUTHENTICATION_FAILED
  };
}

export = ConnectionManager;
