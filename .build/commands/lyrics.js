"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var lyrics_exports = {};
__export(lyrics_exports, {
  default: () => lyrics_default
});
module.exports = __toCommonJS(lyrics_exports);
var import_discord = require("discord.js");
var import_i18n = require("../utils/i18n");
var import_lyrics_finder = __toESM(require("lyrics-finder"));
var import__ = require("../index");
var lyrics_default = {
  data: new import_discord.SlashCommandBuilder().setName("lyrics").setDescription(import_i18n.i18n.__("lyrics.description")),
  async execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue || !queue.songs.length)
      return interaction.reply(import_i18n.i18n.__("lyrics.errorNotQueue")).catch(console.error);
    await interaction.reply("\u23F3 Loading...").catch(console.error);
    let lyrics = null;
    const title = queue.songs[0].title;
    try {
      lyrics = await (0, import_lyrics_finder.default)(queue.songs[0].title, "");
      if (!lyrics)
        lyrics = import_i18n.i18n.__mf("lyrics.lyricsNotFound", { title });
    } catch (error) {
      lyrics = import_i18n.i18n.__mf("lyrics.lyricsNotFound", { title });
    }
    let lyricsEmbed = new import_discord.EmbedBuilder().setTitle(import_i18n.i18n.__mf("lyrics.embedTitle", { title })).setDescription(lyrics.length >= 4096 ? `${lyrics.substr(0, 4093)}...` : lyrics).setColor("#F8AA2A").setTimestamp();
    return interaction.editReply({ content: "", embeds: [lyricsEmbed] }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=lyrics.js.map
