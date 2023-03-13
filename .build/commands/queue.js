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
var queue_exports = {};
__export(queue_exports, {
  default: () => queue_default
});
module.exports = __toCommonJS(queue_exports);
var import_discord = require("discord.js");
var import__ = require("../index");
var import_i18n = require("../utils/i18n");
var queue_default = {
  data: new import_discord.SlashCommandBuilder().setName("queue").setDescription(import_i18n.i18n.__("queue.description")),
  cooldown: 5,
  permissions: [import_discord.PermissionsBitField.Flags.AddReactions, import_discord.PermissionsBitField.Flags.ManageMessages],
  async execute(interaction) {
    const queue = import__.bot.queues.get(interaction.guild.id);
    if (!queue || !queue.songs.length)
      return interaction.reply({ content: import_i18n.i18n.__("queue.errorNotQueue") });
    let currentPage = 0;
    const embeds = generateQueueEmbed(interaction, queue.songs);
    await interaction.reply("\u23F3 Loading queue...");
    if (interaction.replied)
      await interaction.editReply({
        content: `**${import_i18n.i18n.__mf("queue.currentPage")} ${currentPage + 1}/${embeds.length}**`,
        embeds: [embeds[currentPage]]
      });
    const queueEmbed = await interaction.fetchReply();
    try {
      await queueEmbed.react("\u2B05\uFE0F");
      await queueEmbed.react("\u23F9");
      await queueEmbed.react("\u27A1\uFE0F");
    } catch (error) {
      console.error(error);
      interaction.channel.send(error.message).catch(console.error);
    }
    const filter = (reaction, user) => ["\u2B05\uFE0F", "\u23F9", "\u27A1\uFE0F"].includes(reaction.emoji.name) && interaction.user.id === user.id;
    const collector = queueEmbed.createReactionCollector({ filter, time: 6e4 });
    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "\u27A1\uFE0F") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit({
              content: import_i18n.i18n.__mf("queue.currentPage", { page: currentPage + 1, length: embeds.length }),
              embeds: [embeds[currentPage]]
            });
          }
        } else if (reaction.emoji.name === "\u2B05\uFE0F") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit({
              content: import_i18n.i18n.__mf("queue.currentPage", { page: currentPage + 1, length: embeds.length }),
              embeds: [embeds[currentPage]]
            });
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(interaction.user.id);
      } catch (error) {
        console.error(error);
        return interaction.channel.send(error.message).catch(console.error);
      }
    });
  }
};
function generateQueueEmbed(interaction, songs) {
  var _a;
  let embeds = [];
  let k = 10;
  for (let i = 0; i < songs.length; i += 10) {
    const current = songs.slice(i, k);
    let j = i;
    k += 10;
    const info = current.map((track) => `${++j} - [${track.title}](${track.url})`).join("\n");
    const embed = new import_discord.EmbedBuilder().setTitle(import_i18n.i18n.__("queue.embedTitle")).setThumbnail((_a = interaction.guild) == null ? void 0 : _a.iconURL()).setColor("#F8AA2A").setDescription(import_i18n.i18n.__mf("queue.embedCurrentSong", { title: songs[0].title, url: songs[0].url, info })).setTimestamp();
    embeds.push(embed);
  }
  return embeds;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=queue.js.map
