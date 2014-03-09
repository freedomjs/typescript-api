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
