/**
 * Interface for a tcp socket.
 */

// The data types used by TcpSocket
declare module freedom.TcpSocket {
  export interface DisconnectInfo {
    errcode :number;
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
    localPort :number;
    peerAddress :string;
    peerPort :number;
    localAddress :string;
  }

  export interface Implementation {
    write(data:ArrayBuffer,
        continuation:(writeInfo:WriteInfo) => void): void;
    getInfo(continuation:(result:SocketInfo) => void): void;
    connect(hostname:string, port:number,
        continuation:(result:number) => void): void;
    listen(address:string, port:number,
        continuation: (result: number) => void): void;
    close(continuation:() => void): void;
  }
}  // module Sockets

// The TcpSocket class (freedom['core.TcpSocket'])
declare module freedom {
  class TcpSocket {
    listen:any;
    connect:any;
    write:any;
    getInfo:any;
    close:any;
    on:any;
  }
}
