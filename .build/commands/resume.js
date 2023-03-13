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
var resume_exports = {};
__export(resume_exports, {
  default: () => resume_default
});
module.exports = __toCommonJS(resume_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
var resume_default = {
  data: new import_discord.SlashCommandBuilder().setName("resume").setDescription(import_i18n.i18n.__("resume.description")),
  execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    if (!queue)
      return interaction.reply({ content: import_i18n.i18n.__("resume.errorNotQueue"), ephemeral: true }).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return import_i18n.i18n.__("common.errorNotChannel");
    if (queue.player.unpause()) {
      const content2 = { content: import_i18n.i18n.__mf("resume.resultNotPlaying", { author: interaction.user.id }) };
      if (interaction.replied)
        interaction.followUp(content2).catch(console.error);
      else
        interaction.reply(content2).catch(console.error);
      return true;
    }
    const content = { content: import_i18n.i18n.__("resume.errorPlaying") };
    if (interaction.replied)
      interaction.followUp(content).catch(console.error);
    else
      interaction.reply(content).catch(console.error);
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=resume.js.map
