import { Bot } from './Bot';
import simpleCommands from './registerSimpleCommands';

export default function registerCommand(bot: Bot) {
    bot.registerSimpleCommands(simpleCommands)
        .module('moderation', registerModModule)
        .module('misc', registerMiscModule)
        .module('utility', registerUtilityModule)
        .module('features', registerFeaturesModule);
}

function registerUtilityModule() {
    return [
        {
            aliases: [],
            description: 'Get general information about the server',
            handler: require('./commands/utility/ServerInfo').default,
            name: 'serverinfo',
            notEnabledInDm: true,
        },
        {
            aliases: [],
            description: 'Get information about the bot',
            handler: require('./commands/utility/About').default,
            name: 'about',
        },
        {
            aliases: [],
            argsName: ['Issue'],
            description: 'Report an issue with the bot',
            example: 'report Oh no, something went wrong with the bot',
            handler: require('./commands/utility/Report').default,
            minArgs: 1,
            name: 'report',
            notEnabledInDm: true,
            permissions: ['MANAGE_CHANNELS'],
        },
        {
            aliases: ['list'],
            description:
                'Get a list the the servers that the bot is currently in',
            handler: require('./commands/utility/Serverslist').default,
            name: 'serverslist',
        },
    ];
}

function registerFeaturesModule() {
    return [
        {
            aliases: ['ef'],
            argsName: ['Features'],
            description: 'Enable one or more features',
            example: 'enablefeature badwords logs',
            handler: require('./commands/features/EnableFeature').default,
            minArgs: 1,
            name: 'enablefeature',
            notEnabledInDm: true,
            permissions: ['MANAGE_GUILD'],
        },
        {
            aliases: ['df'],
            argsName: ['Features'],
            description: 'Disable one or more features',
            example: 'disablefeature badwords logs',
            handler: require('./commands/features/DisableFeature').default,
            minArgs: 1,
            name: 'disablefeature',
            notEnabledInDm: true,
            permissions: ['MANAGE_GUILD'],
        },
        {
            aliases: [],
            argsName: ['Words'],
            description: 'Add one or more bad words',
            example: 'addbadwords word1 word2 ...',
            handler: require('./commands/features/AddBadWords').default,
            minArgs: 1,
            name: 'addbadwords',
            notEnabledInDm: true,
            permissions: ['MANAGE_GUILD'],
        },
        {
            aliases: [],
            argsName: ['Words'],
            description: 'Remove on or more bad words',
            example: 'removebadwords word1 word2 ...',
            handler: require('./commands/features/RemoveBadWords').default,
            minArgs: 1,
            name: 'removebadwords',
            notEnabledInDm: true,
            permissions: ['MANAGE_GUILD'],
        },
        {
            aliases: ['lswords'],
            description: 'Get the list of bad words on this server',
            handler: require('./commands/features/ListBadWords').default,
            name: 'listbadwords',
            notEnabledInDm: true,
            permissions: ['MANAGE_GUILD'],
        },
        {
            aliases: ['setlogs'],
            argsName: ['Channel'],
            description: 'Set the logs channel',
            example: 'setlogschannel #logs',
            handler: require('./commands/features/SetLogsChannel').default,
            name: 'setlogschannel',
            notEnabledInDm: true,
            numArgs: 1,
            permissions: ['MANAGE_GUILD'],
        },
    ];
}

function registerMiscModule() {
    return [
        {
            aliases: [],
            description: 'Get the ping of the bot',
            handler: require('./commands/misc/Ping').default,
            name: 'ping',
        },
        {
            aliases: [],
            argsName: ['Query'],
            description: 'Send a link to lmgtfy',
            example: 'lmgtfy How to do anything',
            handler: require('./commands/misc/Lmgtfy').default,
            minArgs: 1,
            name: 'lmgtfy',
        },
        {
            aliases: [],
            argsName: ['Member'],
            description: 'Send the profile picture of a member',
            example: 'pfp @someone',
            handler: require('./commands/misc/Pfp').default,
            minArgs: 1,
            name: 'pfp',
        },
        {
            aliases: [],
            argsName: ['Choice'],
            description: 'Play Rock-Paper-Scissors with the bot',
            example: 'rps paper',
            handler: require('./commands/misc/Rps').default,
            name: 'rps',
            numArgs: 1,
        },
        {
            aliases: [],
            description: 'Get the awesome quote of the day',
            handler: require('./commands/misc/Quote').default,
            name: 'quote',
        },
        {
            aliases: ['searchbook', 'novel'],
            argsName: ['Query'],
            description: 'Get information about a book',
            example: 'book an awesome book',
            handler: require('./commands/misc/Book').default,
            minArgs: 1,
            name: 'book',
        },
    ];
}

function registerModModule() {
    return [
        {
            aliases: ['purge'],
            argsName: ['Amount'],
            description: 'Delete x message(s)',
            example: 'nuke 40',
            handler: require('./commands/moderation/Nuke').default,
            name: 'nuke',
            notEnabledInDm: true,
            numArgs: 1,
            permissions: ['manage_messages'],
        },
        {
            aliases: [],
            argsName: ['Member', 'Reason'],
            description: 'Mute a member',
            example: 'mute @someone spamming',
            handler: require('./commands/moderation/Mute').default,
            minArgs: 1,
            name: 'mute',
            notEnabledInDm: true,
            permissions: ['manage_messages'],
        },
        {
            aliases: [],
            argsName: ['Member', 'Time', 'Reason'],
            description: 'Mute a member for a specific time',
            example: 'tempmute @someone 1d spamming',
            handler: require('./commands/moderation/Tempmute').default,
            minArgs: 2,
            name: 'tempmute',
            notEnabledInDm: true,
            permissions: ['manage_messages'],
        },
        {
            aliases: [],
            argsName: ['Member'],
            description: 'Unmute a member',
            example: 'unmute @someone',
            handler: require('./commands/moderation/Unmute').default,
            name: 'unmute',
            notEnabledInDm: true,
            numArgs: 1,
            permissions: ['manage_messages'],
        },
        {
            aliases: [],
            argsName: ['Member', 'Reason'],
            description: 'Kick a member',
            example: 'kick @someone ghost pings',
            handler: require('./commands/moderation/Kick').default,
            minArgs: 1,
            name: 'kick',
            notEnabledInDm: true,
            permissions: ['KICK_MEMBERS'],
        },
        {
            aliases: ['rename'],
            argsName: ['Member', 'Nickname'],
            description: 'Rename someone',
            example: 'nick @someone a good name',
            handler: require('./commands/moderation/Nick').default,
            minArgs: 2,
            name: 'nick',
            notEnabledInDm: true,
            permissions: ['MANAGE_NICKNAMES'],
        },
        {
            aliases: [],
            argsName: ['Member', 'Reason'],
            description: 'Ban a member',
            example: 'ban @someone insults',
            handler: require('./commands/moderation/Ban').default,
            minArgs: 1,
            name: 'ban',
            notEnabledInDm: true,
            permissions: ['BAN_MEMBERS'],
        },
        {
            aliases: [],
            argsName: ['Member', 'Message'],
            description: 'Warn a member',
            example: 'warn @something no NSFW content',
            handler: require('./commands/moderation/Warn').default,
            minArgs: 2,
            name: 'warn',
            notEnabledInDm: true,
            permissions: ['manage_messages'],
        },
    ];
}
