// TODO: Make these actually typed, and probably shove into freedom.

// Reference:
// https://github.com/UWNetworksLab/freedom/blob/master/interface/core.js
/// <reference path='../third_party/promise/promise.d.ts' />

declare module freedom.PeerConnection {
  interface ChannelInfo {
    channelLabel :string;
  }

  interface ChannelMessage extends ChannelInfo {
    // Exactly one of the below must be specified.
    text          ?:string;
    buffer        ?:ArrayBuffer;
    binary        ?:Blob;  // Not yet supported in Chrome.
  }
}

declare module freedom {
  // TODO: clarify semantics of close w.r.t. getBufferedAmount: does it close
  // after the buffered amount is set to zero? Or does it throw away what is
  // in the buffer?

  // TODO: add issue for `onOpenDataChannel` to have return value field named
  // `channelLabel`, not `channelId`, to be consistent with `onReceived`.
  class PeerConnection {
    // Setup a new peer connection.
    setup :(freedomChannelId:string, // Freedom signalling channel id.
            debugName:string,  // used for debugging messages.
            stunServers:string[])
          => Promise<void>;

    // Send a message, if the channelLabel does not exist, it is created. TODO:
    // clarify semantics: does a channel created by this class raise an
    // `onOpenDataChannel` event?
    send :(d:PeerConnection.ChannelMessage) => void;
    on:(t:'onReceived', f:(d:PeerConnection.ChannelMessage) => void) => void

    openDataChannel :(channelLabel:string) => void;
    on:(t:'onOpenDataChannel', f:(d:PeerConnection.ChannelInfo) => void) => void

    closeDataChannel :(channelLabel:string) => void;
    on:(t:'onCloseDataChannel', f:(d:PeerConnection.ChannelInfo) => void) => void

    close :() => void;
    on:(t:'onClose', f:() => void) => void

    // Given a channel Label, returns the buffered amount on that channel.
    getBufferedAmount :(string) => Promise<number>;

    // Generic freedom `on` handler.
    on:(event:string, f:Function) => void;
  }
}
