/// <reference path='../../third_party/promise/promise.d.ts' />

// Common on/emit for message passing interfaces.
interface OnAndEmit {
  on(eventType:string, handler:Function) : void;
  emit(eventType:string, value:Object) : void;
}

declare module freedom {
  // The freedom object's on/emit communicate with the parent module. If this is
  // the outer-page, then on/emit communicate with the root module.
  function on(eventType:string, eventHandler:Function) : void
  function emit(eventType:string, value :Object) : void

  /*
  // for freedom 0.5, the contextual freedom code that loads up the module
  // defines a property named by the module within the freedom object.
  interface Provider {
    providePromise(Object)
  }
  */

  // See |Core_unprivileged| in |core.unprivileged.js|
  interface Core {
    // Create a new channel which which to communicate between modules.
    createChannel() : Promise<ChannelSpecifier>;
    // Given an ChannelEndpointIdentifier for a channel, create a proxy event
    // interface for it.
    bindChannel(identifier:ChannelEndpointIdentifier) : Promise<Channel>;
    // Returns the list of identifiers describing the dependency path.
    getId() : Promise<string[]>;
  }
  function core() : Core

  // Channels are ways that freedom modules can send each other messages.
  interface Channel extends OnAndEmit {
    close() : void;
  }
  // Specification for a channel.
  interface ChannelSpecifier {
    channel     :Channel;  // How to communicate over this channel.
    identifier  :ChannelEndpointIdentifier;
  }
  // An endpoint identifier for a channel. Can be passed over a freedom message-
  // passing boundary.  It is used to create a channel to the freedom module
  // that called createChannel and created this ChannelSpecifier.
  interface ChannelEndpointIdentifier {}

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
}

interface Window {
  // The freedom config variable can be set in the window to let an application
  // register additional core-providers. When Freedom starts up, if the
  // |freedomcfg| var is defined, it will call it passing it the internal core-
  // provider registration function. |providerName| should be a name of a core-
  // provider as defined in |freedom/interface/core.js|, and the function-
  // argument should be a class that meets that interface of |providerName|.
  freedomcfg(register:(providerName:string, classFn:Function) => void) : void;
}
