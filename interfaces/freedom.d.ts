/// <reference path='promise.d.ts' />

declare module freedom {
  interface Port {
    on(eventType:string, handler:Function) : void;
  }
  interface Channel {
    channel : Port;
    identifier: string;
  }
  interface Core {
    createChannel() : Promise<Channel>
  }
  function core() : Core

  function on(eventType : string, f : Function) : void
  function emit(eventType : string, value : Object) : void
}
