const stripIndents = require('common-tags').stripIndents;
const commando = require("discord.js-commando");
const Discord = require("discord.js");
const {Guild, Channel} = Discord;

module.exports = class SetFormatCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'setimformat',
			memberName: 'setimformat',
      description: 'Sets the format of the text in the welcome image',
      details: 'In the format, %person% will be replaced by the mention of the user and %guild% will be replaced with your guild\'s name as specified by setguild',
      guildOnly: true,
      group: "welcomer",
      userPermissions: ['MANAGE_SERVER'],
      examples: ['setformat Everyone welcome %person% to %guild%! :tada:'],
      argsType: "single",
      args: [
        {
          type: "string",
          key: "format",
          label: "format",
          default: "Welcome %person% to %guild%!",
          prompt: ''
        }
      ]
		});
	}

	async run(msg, args) {
    msg.guild.settings.set("im_format", args.format)
    msg.react("👌")
    msg.channel.send(new Discord.RichEmbed().setTitle("Available Backgrounds").setColor(0x5f42f4).setDescription("I successfully set the format").addField("Preview", args.format.replace("%person%", "<@" + msg.author.id + ">").replace("%guild%", msg.guild.settings.get("guildname", msg.guild.name))))
	}
};
