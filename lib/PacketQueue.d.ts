import { EventEmitter } from "events";

declare class PacketQueue<T extends Object> extends EventEmitter {
  queue: T[];

  push(packet: T): void;
  unshift(packet: T): void;
  shift(): T;
}

export = PacketQueue;
