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
var invite_exports = {};
__export(invite_exports, {
  default: () => invite_default
});
module.exports = __toCommonJS(invite_exports);
var import_discord = require("discord.js");
var import_i18n = require("../utils/i18n");
var invite_default = {
  data: new import_discord.SlashCommandBuilder().setName("invite").setDescription(import_i18n.i18n.__("invite.description")),
  execute(interaction) {
    const inviteEmbed = new import_discord.EmbedBuilder().setTitle(import_i18n.i18n.__mf("Invite me to your server!"));
    const actionRow = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.ButtonBuilder().setLabel(import_i18n.i18n.__mf("Invite")).setStyle(import_discord.ButtonStyle.Link).setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=8&scope=bot%20applications.commands`
      )
    );
    return interaction.reply({ embeds: [inviteEmbed], components: [actionRow] }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=invite.js.map
