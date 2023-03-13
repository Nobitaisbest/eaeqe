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
var help_exports = {};
__export(help_exports, {
  default: () => help_default
});
module.exports = __toCommonJS(help_exports);
var import_discord = require("discord.js");
var import_i18n = require("../utils/i18n");
var import__ = require("../index");
var help_default = {
  data: new import_discord.SlashCommandBuilder().setName("help").setDescription(import_i18n.i18n.__("help.description")),
  async execute(interaction) {
    let commands = import__.bot.slashCommandsMap;
    let helpEmbed = new import_discord.EmbedBuilder().setTitle(import_i18n.i18n.__mf("help.embedTitle", { botname: interaction.client.user.username })).setDescription(import_i18n.i18n.__("help.embedDescription")).setColor("#F8AA2A");
    commands.forEach((cmd) => {
      helpEmbed.addFields({
        name: `**${cmd.data.name}**`,
        value: `${cmd.data.description}`,
        inline: true
      });
    });
    helpEmbed.setTimestamp();
    return interaction.reply({ embeds: [helpEmbed] }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=help.js.map
