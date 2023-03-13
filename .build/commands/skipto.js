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
var skipto_exports = {};
__export(skipto_exports, {
  default: () => skipto_default
});
module.exports = __toCommonJS(skipto_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var skipto_default = {
  data: new import_discord.SlashCommandBuilder().setName("skipto").setDescription(import_i18n.i18n.__("skipto.description")).addIntegerOption(
    (option) => option.setName("number").setDescription(import_i18n.i18n.__("skipto.args.number")).setRequired(true)
  ),
  execute(interaction) {
    const playlistSlotArg = interaction.options.getInteger("number");
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    if (!playlistSlotArg || isNaN(playlistSlotArg))
      return interaction.reply({
        content: import_i18n.i18n.__mf("skipto.usageReply", { prefix: import__.bot.prefix, name: module.exports.name }),
        ephemeral: true
      }).catch(console.error);
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ content: import_i18n.i18n.__("skipto.errorNotQueue"), ephemeral: true }).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return import_i18n.i18n.__("common.errorNotChannel");
    if (playlistSlotArg > queue.songs.length)
      return interaction.reply({ content: import_i18n.i18n.__mf("skipto.errorNotValid", { length: queue.songs.length }), ephemeral: true }).catch(console.error);
    if (queue.loop) {
      for (let i = 0; i < playlistSlotArg - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(playlistSlotArg - 2);
    }
    queue.player.stop();
    interaction.reply({ content: import_i18n.i18n.__mf("skipto.result", { author: interaction.user.id, arg: playlistSlotArg - 1 }) }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=skipto.js.map
