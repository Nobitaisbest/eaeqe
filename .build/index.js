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
var eaeqe_exports = {};
__export(eaeqe_exports, {
  bot: () => bot
});
module.exports = __toCommonJS(eaeqe_exports);
var import_discord = require("discord.js");
var import_Bot = require("./structs/Bot");
const bot = new import_Bot.Bot(
  new import_discord.Client({
    intents: [
      import_discord.GatewayIntentBits.Guilds,
      import_discord.GatewayIntentBits.GuildVoiceStates,
      import_discord.GatewayIntentBits.GuildMessages,
      import_discord.GatewayIntentBits.GuildMessageReactions,
      import_discord.GatewayIntentBits.MessageContent,
      import_discord.GatewayIntentBits.DirectMessages
    ]
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  bot
});
//# sourceMappingURL=index.js.map
