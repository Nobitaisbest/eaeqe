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
var skip_exports = {};
__export(skip_exports, {
  default: () => skip_default
});
module.exports = __toCommonJS(skip_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var skip_default = {
  data: new import_discord.SlashCommandBuilder().setName("skip").setDescription(import_i18n.i18n.__("skip.description")),
  execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    if (!queue)
      return interaction.reply(import_i18n.i18n.__("skip.errorNotQueue")).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return import_i18n.i18n.__("common.errorNotChannel");
    queue.player.stop(true);
    interaction.reply({ content: import_i18n.i18n.__mf("skip.result", { author: interaction.user.id }) }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=skip.js.map
