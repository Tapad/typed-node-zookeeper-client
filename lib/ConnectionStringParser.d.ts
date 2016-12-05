declare class ConnectionStringParser {
  connectionString: string;
  chrootPath?: string;
  servers: ConnectionStringParser.ConnectionServer[];

  constructor(connectionString: string);

  getConnectionString(): string;
  getChrootPath(): string | undefined;
  getServers(): ConnectionStringParser.ConnectionServer[];
}

declare namespace ConnectionStringParser {
  export interface ConnectionServer {
    host: string;
    port: string;
  }
}

export = ConnectionStringParser;
