import { GuildMember, Message } from 'discord.js';
import { log } from '../../API/logger';
import { Bot } from '../../Bot';
import { confirmationEmbed, errorEmbed } from '../../embed';
import { alreadyMuted, getRole, isAdmin } from '../../utils';
import { muteUser } from '../../utils/mute';

export default async function run(
    { config: { color } }: Bot,
    message: Message,
    [, ...rest]: string[]
): Promise<any> {
    const { author, mentions, guild, channel, member } = message;
    if (mentions.users.size < 1) {
        return channel.send('Invalid user');
    }
    const reason = rest.length >= 1 ? rest.join(' ') : 'Reason not defined';

    const toMute: GuildMember = guild.member(mentions.users.first());
    if (
        isAdmin(toMute) ||
        toMute === member ||
        !toMute ||
        alreadyMuted(toMute)
    ) {
        return channel.send(
            'Cannot mute this user, because he is already muted or he is a moderator.'
        );
    }

    try {
        await muteUser(toMute, guild, reason, author);
        log('Member muted', color, guild, {
            Member: `<@${toMute.id}>`,
            Moderator: `<@${member.id}>`,
            Reason: reason,
        });
        return channel.send(
            `<@${toMute.id}> has been muted for: **${reason}**`
        );
    } catch (e) {
        return channel.send({ embed: errorEmbed(e.toString()) });
    }
}
