/**
 * Interface for a tcp socket.
 */

// The data types used by TcpSocket
declare module freedom.TcpSocket {
  export interface CreateInfo {
    socketId:number;
  }

  export interface DisconnectInfo {
    socketId:number;
    error:string;
  }

  export interface ReadInfo {
    socketId:number;
    data:ArrayBuffer;
  }

  export interface WriteInfo {
    bytesWritten: number;
  }

  export interface SocketOptions {
  }

  export interface SocketInfo {
    socketType: string;
    localPort?: number;
    peerAddress?: string;
    peerPort?: number;
    localAddress?: string;
    connected: boolean;
  }

  // TODO: move to tcp socket implementation; drop the type argument.
  export interface Implementation {
    create(type:string, options:SocketOptions,
        continuation:(createInfo:CreateInfo) => void): void;
    write(socketId:number, data:ArrayBuffer,
        continuation:(writeInfo:WriteInfo) => void): void;
    getInfo(socketId:number, continuation:(result:SocketInfo) => void): void;
    connect(socketId:number, hostname:string, port:number,
        continuation:(result:number) => void): void;
    listen(socketId:number, address:string, port:number,
        continuation: (result: number) => void): void;
    destroy(socketId:number, continuation:() => void): void;
    disconnect(socketId:number, continuation:() => void): void;
  }
}  // module Sockets

// The TcpSocket class (freedom['core.TcpSocket'])
declare module freedom {
  class TcpSocket {
    create:any;
    listen:any;
    connect:any;
    write:any;
    getInfo:any;
    disconnect:any;
    destroy:any;
    on:any;
  }
}
