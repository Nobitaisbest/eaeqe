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
var ping_exports = {};
__export(ping_exports, {
  default: () => ping_default
});
module.exports = __toCommonJS(ping_exports);
var import_discord = require("discord.js");
var import_i18n = require("../utils/i18n");
var ping_default = {
  data: new import_discord.SlashCommandBuilder().setName("ping").setDescription(import_i18n.i18n.__("ping.description")),
  cooldown: 10,
  execute(interaction) {
    interaction.reply({ content: import_i18n.i18n.__mf("ping.result", { ping: Math.round(interaction.client.ws.ping) }), ephemeral: true }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=ping.js.map
