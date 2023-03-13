"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var play_exports = {};
__export(play_exports, {
  default: () => play_default
});
module.exports = __toCommonJS(play_exports);
var import_voice = require("@discordjs/voice");
var import_discord = require("discord.js");
var import__ = require("../index");
var import_MusicQueue = require("../structs/MusicQueue");
var import_Song = require("../structs/Song");
var import_i18n = require("../utils/i18n");
var import_patterns = require("../utils/patterns");
var play_default = {
  data: new import_discord.SlashCommandBuilder().setName("play").setDescription(import_i18n.i18n.__("play.description")).addStringOption((option) => option.setName("song").setDescription("The song you want to play").setRequired(true)),
  cooldown: 3,
  permissions: [
    import_discord.PermissionsBitField.Flags.Connect,
    import_discord.PermissionsBitField.Flags.Speak,
    import_discord.PermissionsBitField.Flags.AddReactions,
    import_discord.PermissionsBitField.Flags.ManageMessages
  ],
  async execute(interaction, input) {
    let argSongName = interaction.options.getString("song");
    if (!argSongName)
      argSongName = input;
    const guildMember = interaction.guild.members.cache.get(interaction.user.id);
    const { channel } = guildMember.voice;
    if (!channel)
      return interaction.reply({ content: import_i18n.i18n.__("play.errorNotChannel"), ephemeral: true }).catch(console.error);
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (queue && channel.id !== queue.connection.joinConfig.channelId)
      return interaction.reply({
        content: import_i18n.i18n.__mf("play.errorNotInSameChannel", { user: import__.bot.client.user.username }),
        ephemeral: true
      }).catch(console.error);
    if (!argSongName)
      return interaction.reply({ content: import_i18n.i18n.__mf("play.usageReply", { prefix: import__.bot.prefix }), ephemeral: true }).catch(console.error);
    const url = argSongName;
    if (interaction.replied)
      await interaction.editReply("\u23F3 Loading...").catch(console.error);
    else
      await interaction.reply("\u23F3 Loading...");
    if (import_patterns.playlistPattern.test(url)) {
      await interaction.editReply("\u{1F517} Link is playlist").catch(console.error);
      return import__.bot.slashCommandsMap.get("playlist").execute(interaction);
    }
    let song;
    try {
      song = await import_Song.Song.from(url, url);
    } catch (error) {
      if (error.name == "NoResults")
        return interaction.reply({ content: import_i18n.i18n.__mf("play.errorNoResults", { url: `<${url}>` }), ephemeral: true }).catch(console.error);
      if (error.name == "InvalidURL")
        return interaction.reply({ content: import_i18n.i18n.__mf("play.errorInvalidURL", { url: `<${url}>` }), ephemeral: true }).catch(console.error);
      console.error(error);
      if (interaction.replied)
        return await interaction.editReply({ content: import_i18n.i18n.__("common.errorCommand") }).catch(console.error);
      else
        return interaction.reply({ content: import_i18n.i18n.__("common.errorCommand"), ephemeral: true }).catch(console.error);
    }
    if (queue) {
      queue.enqueue(song);
      return interaction.channel.send({ content: import_i18n.i18n.__mf("play.queueAdded", { title: song.title, author: interaction.user.id }) }).catch(console.error);
    }
    const newQueue = new import_MusicQueue.MusicQueue({
      interaction,
      textChannel: interaction.channel,
      connection: (0, import_voice.joinVoiceChannel)({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      })
    });
    import__.bot.queues.set(interaction.guild.id, newQueue);
    newQueue.enqueue(song);
    interaction.deleteReply().catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=play.js.map
