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
var nowplaying_exports = {};
__export(nowplaying_exports, {
  default: () => nowplaying_default
});
module.exports = __toCommonJS(nowplaying_exports);
var import_discord = require("discord.js");
var import_string_progressbar = require("string-progressbar");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var nowplaying_default = {
  data: new import_discord.SlashCommandBuilder().setName("nowplaying").setDescription(import_i18n.i18n.__("nowplaying.description")),
  cooldown: 10,
  execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue || !queue.songs.length)
      return interaction.reply({ content: import_i18n.i18n.__("nowplaying.errorNotQueue"), ephemeral: true }).catch(console.error);
    const song = queue.songs[0];
    const seek = queue.resource.playbackDuration / 1e3;
    const left = song.duration - seek;
    let nowPlaying = new import_discord.EmbedBuilder().setTitle(import_i18n.i18n.__("nowplaying.embedTitle")).setDescription(`${song.title}
${song.url}`).setColor("#F8AA2A");
    if (song.duration > 0) {
      nowPlaying.addFields({
        name: "\u200B",
        value: new Date(seek * 1e3).toISOString().substr(11, 8) + "[" + (0, import_string_progressbar.splitBar)(song.duration == 0 ? seek : song.duration, seek, 20)[0] + "]" + (song.duration == 0 ? " \u25C9 LIVE" : new Date(song.duration * 1e3).toISOString().substr(11, 8)),
        inline: false
      });
      nowPlaying.setFooter({
        text: import_i18n.i18n.__mf("nowplaying.timeRemaining", {
          time: new Date(left * 1e3).toISOString().substr(11, 8)
        })
      });
    }
    return interaction.reply({ embeds: [nowPlaying] });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=nowplaying.js.map
