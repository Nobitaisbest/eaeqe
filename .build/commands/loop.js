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
var loop_exports = {};
__export(loop_exports, {
  default: () => loop_default
});
module.exports = __toCommonJS(loop_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var loop_default = {
  data: new import_discord.SlashCommandBuilder().setName("loop").setDescription(import_i18n.i18n.__("loop.description")),
  execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    if (!queue)
      return interaction.reply({ content: import_i18n.i18n.__("loop.errorNotQueue"), ephemeral: true }).catch(console.error);
    if (!guildMemer || !(0, import_queue.canModifyQueue)(guildMemer))
      return import_i18n.i18n.__("common.errorNotChannel");
    queue.loop = !queue.loop;
    const content = {
      content: import_i18n.i18n.__mf("loop.result", { loop: queue.loop ? import_i18n.i18n.__("common.on") : import_i18n.i18n.__("common.off") })
    };
    if (interaction.replied)
      interaction.followUp(content).catch(console.error);
    else
      interaction.reply(content).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=loop.js.map
