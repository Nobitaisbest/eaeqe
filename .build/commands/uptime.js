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
var uptime_exports = {};
__export(uptime_exports, {
  default: () => uptime_default
});
module.exports = __toCommonJS(uptime_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var uptime_default = {
  data: new import_discord.SlashCommandBuilder().setName("uptime").setDescription(import_i18n.i18n.__("uptime.description")),
  execute(interaction) {
    let seconds = Math.floor(import__.bot.client.uptime / 1e3);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    return interaction.reply({ content: import_i18n.i18n.__mf("uptime.result", { days, hours, minutes, seconds }) }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=uptime.js.map
