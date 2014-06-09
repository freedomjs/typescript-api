/**
 * Interface for a tcp socket.
 */

// The data types used by TcpSocket
declare module freedom.TcpSocket {
  export interface DisconnectInfo {
    errcode :string;
    message :string;
  }

  export interface ReadInfo {
    data :ArrayBuffer;
  }

  export interface WriteInfo {
    bytesWritten :number;
  }

  export interface SocketInfo {
    connected :boolean;
    localAddress :string;
    localPort :number;
    peerAddress :string;
    peerPort :number;
  }

  export interface ConnectInfo {
    socket :number;
    host :string;
    port :number;
  }
}  // module Sockets

// The TcpSocket class (freedom['core.TcpSocket'])
declare module freedom {
  export interface TcpSocket {
    listen(address:string, port:number) : Promise<void>;
    connect(hostname:string, port:number) : Promise<void>;
    write(data:ArrayBuffer) : Promise<TcpSocket.WriteInfo>;
    getInfo() : Promise<TcpSocket.SocketInfo>;
    close() : Promise<void>;
    // TcpSockets have 3 types of events:
    on(eventType:string, f:Function) : void;
    on(type:'onConnection', f:(i:TcpSocket.ConnectInfo) => void) : void;
    on(type:'onData', f:(i:TcpSocket.ReadInfo) => void) : void;
    on(type:'onDisconnect', f:(i:TcpSocket.DisconnectInfo) => void) : void;
  }
}
