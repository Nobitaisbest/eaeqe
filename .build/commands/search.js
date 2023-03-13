"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var search_exports = {};
__export(search_exports, {
  default: () => search_default
});
module.exports = __toCommonJS(search_exports);
var import_discord = require("discord.js");
var import_youtube_sr = __toESM(require("youtube-sr"));
var import__ = require("..");
var import_i18n = require("../utils/i18n");
var search_default = {
  data: new import_discord.SlashCommandBuilder().setName("search").setDescription(import_i18n.i18n.__("search.description")).addStringOption(
    (option) => option.setName("query").setDescription(import_i18n.i18n.__("search.optionQuery")).setRequired(true)
  ),
  async execute(interaction) {
    const query = interaction.options.getString("query", true);
    const member = interaction.guild.members.cache.get(interaction.user.id);
    if (!(member == null ? void 0 : member.voice.channel))
      return interaction.reply({ content: import_i18n.i18n.__("search.errorNotChannel"), ephemeral: true }).catch(console.error);
    const search = query;
    await interaction.reply("\u23F3 Loading...").catch(console.error);
    let results = [];
    try {
      results = await import_youtube_sr.default.search(search, { limit: 10, type: "video" });
    } catch (error) {
      console.error(error);
      interaction.editReply({ content: import_i18n.i18n.__("common.errorCommand") }).catch(console.error);
    }
    if (!results)
      return;
    const options = results.map((video) => {
      return {
        label: video.title ?? "",
        value: video.url
      };
    });
    const row = new import_discord.ActionRowBuilder().addComponents(
      new import_discord.StringSelectMenuBuilder().setCustomId("search-select").setPlaceholder("Nothing selected").setMinValues(1).setMaxValues(10).addOptions(options)
    );
    const followUp = await interaction.followUp({
      content: "Choose songs to play",
      components: [row]
    });
    followUp.awaitMessageComponent({
      time: 3e4
    }).then((selectInteraction) => {
      if (!(selectInteraction instanceof import_discord.StringSelectMenuInteraction))
        return;
      selectInteraction.update({ content: "\u23F3 Loading the selected songs...", components: [] });
      import__.bot.slashCommandsMap.get("play").execute(interaction, selectInteraction.values[0]).then(() => {
        selectInteraction.values.slice(1).forEach((url) => {
          import__.bot.slashCommandsMap.get("play").execute(interaction, url);
        });
      });
    }).catch(console.error);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=search.js.map
