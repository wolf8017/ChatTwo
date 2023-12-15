import ChatKitty from '@chatkitty/core';

export const chatkitty = ChatKitty.getInstance('98788d6f-210c-41a8-b964-c50d5458dd26');
export function channelDisplayName(channel) {
    if (channel.type === 'DIRECT') {
        return channel.members.map((member) => member.displayName).join(', ');
    } else {
        return channel.name;
    }
}
