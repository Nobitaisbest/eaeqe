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
var move_exports = {};
__export(move_exports, {
  default: () => move_default
});
module.exports = __toCommonJS(move_exports);
var import_array_move = __toESM(require("array-move"));
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var move_default = {
  data: new import_discord.SlashCommandBuilder().setName("move").setDescription(import_i18n.i18n.__("move.description")).addIntegerOption(
    (option) => option.setName("movefrom").setDescription(import_i18n.i18n.__("move.args.movefrom")).setRequired(true)
  ).addIntegerOption(
    (option) => option.setName("moveto").setDescription(import_i18n.i18n.__("move.args.moveto")).setRequired(true)
  ),
  execute(interaction) {
    const movefromArg = interaction.options.getInteger("movefrom");
    const movetoArg = interaction.options.getInteger("moveto");
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue)
      return interaction.reply(import_i18n.i18n.__("move.errorNotQueue")).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return;
    if (!movefromArg || !movetoArg)
      return interaction.reply({ content: import_i18n.i18n.__mf("move.usagesReply", { prefix: import__.bot.prefix }), ephemeral: true });
    if (isNaN(movefromArg) || movefromArg <= 1)
      return interaction.reply({ content: import_i18n.i18n.__mf("move.usagesReply", { prefix: import__.bot.prefix }), ephemeral: true });
    let song = queue.songs[movefromArg - 1];
    queue.songs = (0, import_array_move.default)(queue.songs, movefromArg - 1, movetoArg == 1 ? 1 : movetoArg - 1);
    interaction.reply({
      content: import_i18n.i18n.__mf("move.result", {
        author: interaction.user.id,
        title: song.title,
        index: movetoArg == 1 ? 1 : movetoArg
      })
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=move.js.map
