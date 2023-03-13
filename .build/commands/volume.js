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
var volume_exports = {};
__export(volume_exports, {
  default: () => volume_default
});
module.exports = __toCommonJS(volume_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var volume_default = {
  data: new import_discord.SlashCommandBuilder().setName("volume").setDescription(import_i18n.i18n.__("volume.description")).addIntegerOption((option) => option.setName("volume").setDescription(import_i18n.i18n.__("volume.description"))),
  execute(interaction) {
    var _a;
    const queue = import__.bot.queues.get(interaction.guild.id);
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    const volumeArg = interaction.options.getInteger("volume");
    if (!queue)
      return interaction.reply({ content: import_i18n.i18n.__("volume.errorNotQueue"), ephemeral: true }).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return interaction.reply({ content: import_i18n.i18n.__("volume.errorNotChannel"), ephemeral: true }).catch(console.error);
    if (!volumeArg || volumeArg === queue.volume)
      return interaction.reply({ content: import_i18n.i18n.__mf("volume.currentVolume", { volume: queue.volume }) }).catch(console.error);
    if (isNaN(volumeArg))
      return interaction.reply({ content: import_i18n.i18n.__("volume.errorNotNumber"), ephemeral: true }).catch(console.error);
    if (Number(volumeArg) > 100 || Number(volumeArg) < 0)
      return interaction.reply({ content: import_i18n.i18n.__("volume.errorNotValid"), ephemeral: true }).catch(console.error);
    queue.volume = volumeArg;
    (_a = queue.resource.volume) == null ? void 0 : _a.setVolumeLogarithmic(volumeArg / 100);
    return interaction.reply({ content: import_i18n.i18n.__mf("volume.result", { arg: volumeArg }) }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=volume.js.map
