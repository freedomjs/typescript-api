/// <reference path='promise.d.ts' />

declare module freedom {
  interface Port {
    on(eventType:string, handler:Function) : void;
  }
  interface Channel {
    channel : Port
  }
  interface Core {
    createChannel() : Promise<Channel>
  }
  function core() : Core
}
