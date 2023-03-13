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
var remove_exports = {};
__export(remove_exports, {
  default: () => remove_default
});
module.exports = __toCommonJS(remove_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;
var remove_default = {
  data: new import_discord.SlashCommandBuilder().setName("remove").setDescription(import_i18n.i18n.__("remove.description")).addStringOption(
    (option) => option.setName("slot").setDescription(import_i18n.i18n.__("remove.description")).setRequired(true)
  ),
  execute(interaction) {
    const guildMemer = interaction.guild.members.cache.get(interaction.user.id);
    const removeArgs = interaction.options.getString("slot");
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue)
      return interaction.reply({ content: import_i18n.i18n.__("remove.errorNotQueue"), ephemeral: true }).catch(console.error);
    if (!(0, import_queue.canModifyQueue)(guildMemer))
      return import_i18n.i18n.__("common.errorNotChannel");
    if (!removeArgs)
      return interaction.reply({ content: import_i18n.i18n.__mf("remove.usageReply", { prefix: import__.bot.prefix }), ephemeral: true });
    const songs = removeArgs.split(",").map((arg) => parseInt(arg));
    let removed = [];
    if (pattern.test(removeArgs)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.find((songIndex) => songIndex - 1 === index))
          removed.push(item);
        else
          return true;
      });
      interaction.reply(
        import_i18n.i18n.__mf("remove.result", {
          title: removed.map((song) => song.title).join("\n"),
          author: interaction.user.id
        })
      );
    } else if (!isNaN(+removeArgs) && +removeArgs >= 1 && +removeArgs <= queue.songs.length) {
      return interaction.reply(
        import_i18n.i18n.__mf("remove.result", {
          title: queue.songs.splice(+removeArgs - 1, 1)[0].title,
          author: interaction.user.id
        })
      );
    } else {
      return interaction.reply({ content: import_i18n.i18n.__mf("remove.usageReply", { prefix: import__.bot.prefix }) });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=remove.js.map
