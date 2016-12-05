import * as jute from "./jute";

declare class Event {
  static create(watcherEvent: jute.protocol.WatcherEvent): Event;

  type: number;
  name: string;
  path: string;

  constructor(type: number, name: string, path?: string);

  getType(): number;
  getName(): string;
  getPath(): string | undefined;
  toString(): string;
}

declare namespace Event {
  export enum EventType {
    NODE_CREATED = 1,
    NODE_DELETED = 2,
    NODE_DATA_CHANGED = 3,
    NODE_CHILDREN_CHANGED = 4
  }

  export const NODE_CREATED: EventType.NODE_CREATED;
  export const NODE_DELETED: EventType.NODE_DELETED;
  export const NODE_DATA_CHANGED: EventType.NODE_DATA_CHANGED;
  export const NODE_CHILDREN_CHANGED: EventType.NODE_CHILDREN_CHANGED;
}

export = Event;
