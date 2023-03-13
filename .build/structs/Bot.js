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
var Bot_exports = {};
__export(Bot_exports, {
  Bot: () => Bot
});
module.exports = __toCommonJS(Bot_exports);
var import_discord = require("discord.js");
var import_fs = require("fs");
var import_path = require("path");
var import_checkPermissions = require("../utils/checkPermissions");
var import_config = require("../utils/config");
var import_i18n = require("../utils/i18n");
var import_MissingPermissionsException = require("../utils/MissingPermissionsException");
class Bot {
  constructor(client) {
    this.client = client;
    this.client.login(import_config.config.TOKEN);
    this.client.on("ready", () => {
      console.log(`${this.client.user.username} ready!`);
      this.registerSlashCommands();
    });
    this.client.on("warn", (info) => console.log(info));
    this.client.on("error", console.error);
    this.onInteractionCreate();
  }
  prefix = import_config.config.PREFIX;
  commands = new import_discord.Collection();
  slashCommands = new Array();
  slashCommandsMap = new import_discord.Collection();
  cooldowns = new import_discord.Collection();
  queues = new import_discord.Collection();
  async registerSlashCommands() {
    const rest = new import_discord.REST({ version: "9" }).setToken(import_config.config.TOKEN);
    const commandFiles = (0, import_fs.readdirSync)((0, import_path.join)(__dirname, "..", "commands")).filter((file) => !file.endsWith(".map"));
    for (const file of commandFiles) {
      const command = await import((0, import_path.join)(__dirname, "..", "commands", `${file}`));
      this.slashCommands.push(command.default.data);
      this.slashCommandsMap.set(command.default.data.name, command.default);
    }
    await rest.put(import_discord.Routes.applicationCommands(this.client.user.id), { body: this.slashCommands });
  }
  async onInteractionCreate() {
    this.client.on(import_discord.Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand())
        return;
      const command = this.slashCommandsMap.get(interaction.commandName);
      if (!command)
        return;
      if (!this.cooldowns.has(interaction.commandName)) {
        this.cooldowns.set(interaction.commandName, new import_discord.Collection());
      }
      const now = Date.now();
      const timestamps = this.cooldowns.get(interaction.commandName);
      const cooldownAmount = (command.cooldown || 1) * 1e3;
      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1e3;
          return interaction.reply({
            content: import_i18n.i18n.__mf("common.cooldownMessage", {
              time: timeLeft.toFixed(1),
              name: interaction.commandName
            }),
            ephemeral: true
          });
        }
      }
      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
      try {
        const permissionsCheck = await (0, import_checkPermissions.checkPermissions)(command, interaction);
        if (permissionsCheck.result) {
          command.execute(interaction);
        } else {
          throw new import_MissingPermissionsException.MissingPermissionsException(permissionsCheck.missing);
        }
      } catch (error) {
        console.error(error);
        if (error.message.includes("permissions")) {
          interaction.reply({ content: error.toString(), ephemeral: true }).catch(console.error);
        } else {
          interaction.reply({ content: import_i18n.i18n.__("common.errorCommand"), ephemeral: true }).catch(console.error);
        }
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bot
});
//# sourceMappingURL=Bot.js.map
