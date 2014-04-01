/// <reference path='../../third_party/promise/promise.d.ts' />

declare module freedom {

  /*
  // for freedom 0.5, the contextual freedom code that loads up the module
  // defines a property named by the module within the freedom object.
  interface Provider {
    providePromise(Object)
  }
  */

  // Corresponds to Freedom object of type `proxy`.
  interface ProxyEventInterface {
    on(eventType:string, handler:Function) : void;
    emit(eventType:string, handler:Function) : void;
  }
  // Specification for a channel.
  interface ChannelSpecifier {
    channel     :ProxyEventInterface;  // How to communicate over this channel.
    identifier  :string;  // identifier for the created channel
  }
  interface Core {
    // Create a new channel which which to communicate between modules.
    createChannel() : Promise<ChannelSpecifier>;
    // Given a string-identifier for a channel, create a proxy event interface
    // for it.
    bindChannel(identifier:string) : Promise<ProxyEventInterface>;
    // Returns the list of identifiers describing the dependency path.
    getId() : string[];
  }
  function core() : Core

  // This is the first argument given to a core provider's constructor. It is an
  // object that describes the parent module the core provider instance has been
  // created for.
  interface CoreProviderParentApp {
    manifestId :string;
    config :{
      views :{ [viewName:string] : Object };
    };
    global :{
      removeEventListener :(s:string, f:Function, b:boolean) => void;
    };
  }

  // Communicate with the parent module. If this is the outer-page, then
  // communicates with the root module.
  function on(eventType:string, eventHandler:Function) : void
  function emit(eventType:string, value :Object) : void
}

interface Window {
  // The freedom config call registers
  freedomcfg(register:(providerName:string, classFn:Function) => void) : void;
}
