import { EventEmitter } from "events";

import * as jute from "./jute";

declare class WatchManager {
  dataWatchers: Object;
  childWatchers: Object;
  existenceWatchers: Object;

  registerDataWatcher(path: string, watcher: (...args: any[]) => void): void;
  getDataWatcherPaths(): string[];
  registerChildWatcher(path: string, watcher: (...args: any[]) => void): void;
  getChildWatcherPaths(): string[];
  registerExistenceWatcher(path: string, watcher: (...args: any[]) => void): void;
  getExistenceWatcherPaths(): string[];

  emit(watcherEvent: jute.protocol.WatcherEvent): void;

  isEmpty(): boolean;
}

export = WatchManager;
