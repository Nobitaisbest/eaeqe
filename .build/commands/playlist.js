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
var playlist_exports = {};
__export(playlist_exports, {
  default: () => playlist_default
});
module.exports = __toCommonJS(playlist_exports);
var import_voice = require("@discordjs/voice");
var import_discord = require("discord.js");
var import__ = require("../index");
var import_MusicQueue = require("../structs/MusicQueue");
var import_Playlist = require("../structs/Playlist");
var import_i18n = require("../utils/i18n");
var playlist_default = {
  data: new import_discord.SlashCommandBuilder().setName("playlist").setDescription(import_i18n.i18n.__("playlist.description")).addStringOption((option) => option.setName("playlist").setDescription("Playlist name or link").setRequired(true)),
  cooldown: 5,
  permissions: [
    import_discord.PermissionsBitField.Flags.Connect,
    import_discord.PermissionsBitField.Flags.Speak,
    import_discord.PermissionsBitField.Flags.AddReactions,
    import_discord.PermissionsBitField.Flags.ManageMessages
  ],
  async execute(interaction) {
    let argSongName = interaction.options.getString("playlist");
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    const { channel } = guildMemer.voice;
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!channel)
      return interaction.reply({ content: import_i18n.i18n.__("playlist.errorNotChannel"), ephemeral: true }).catch(console.error);
    if (queue && channel.id !== queue.connection.joinConfig.channelId)
      if (interaction.replied)
        return interaction.editReply({ content: import_i18n.i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user.username }) }).catch(console.error);
      else
        return interaction.reply({
          content: import_i18n.i18n.__mf("play.errorNotInSameChannel", { user: interaction.client.user.username }),
          ephemeral: true
        }).catch(console.error);
    let playlist;
    try {
      playlist = await import_Playlist.Playlist.from(argSongName.split(" ")[0], argSongName);
    } catch (error) {
      console.error(error);
      if (interaction.replied)
        return interaction.editReply({ content: import_i18n.i18n.__("playlist.errorNotFoundPlaylist") }).catch(console.error);
      else
        return interaction.reply({ content: import_i18n.i18n.__("playlist.errorNotFoundPlaylist"), ephemeral: true }).catch(console.error);
    }
    if (queue) {
      queue.songs.push(...playlist.videos);
    } else {
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
      newQueue.songs.push(...playlist.videos);
      newQueue.enqueue(playlist.videos[0]);
    }
    let playlistEmbed = new import_discord.EmbedBuilder().setTitle(`${playlist.data.title}`).setDescription(playlist.videos.map((song, index) => `${index + 1}. ${song.title}`).join("\n")).setURL(playlist.data.url).setColor("#F8AA2A").setTimestamp();
    if (playlistEmbed.data.description.length >= 2048)
      playlistEmbed.setDescription(
        playlistEmbed.data.description.substr(0, 2007) + import_i18n.i18n.__("playlist.playlistCharLimit")
      );
    if (interaction.replied)
      return interaction.editReply({
        content: import_i18n.i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
        embeds: [playlistEmbed]
      });
    interaction.reply({
      content: import_i18n.i18n.__mf("playlist.startedPlaylist", { author: interaction.user.id }),
      embeds: [playlistEmbed]
    }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=playlist.js.map
