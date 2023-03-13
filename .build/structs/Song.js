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
var Song_exports = {};
__export(Song_exports, {
  Song: () => Song
});
module.exports = __toCommonJS(Song_exports);
var import_voice = require("@discordjs/voice");
var import_youtube_sr = __toESM(require("youtube-sr"));
var import_ytdl_core = require("ytdl-core");
var import_ytdl_core_discord = __toESM(require("ytdl-core-discord"));
var import_i18n = require("../utils/i18n");
var import_patterns = require("../utils/patterns");
class Song {
  url;
  title;
  duration;
  constructor({ url, title, duration }) {
    this.url = url;
    this.title = title;
    this.duration = duration;
  }
  static async from(url = "", search = "") {
    const isYoutubeUrl = import_patterns.videoPattern.test(url);
    let songInfo;
    if (isYoutubeUrl) {
      songInfo = await (0, import_ytdl_core.getInfo)(url);
      return new this({
        url: songInfo.videoDetails.video_url,
        title: songInfo.videoDetails.title,
        duration: parseInt(songInfo.videoDetails.lengthSeconds)
      });
    } else {
      const result = await import_youtube_sr.default.searchOne(search);
      result ? null : console.log(`No results found for ${search}`);
      if (!result) {
        let err = new Error(`No search results found for ${search}`);
        err.name = "NoResults";
        if (import_patterns.isURL.test(url))
          err.name = "InvalidURL";
        throw err;
      }
      songInfo = await (0, import_ytdl_core.getInfo)(`https://youtube.com/watch?v=${result.id}`);
      return new this({
        url: songInfo.videoDetails.video_url,
        title: songInfo.videoDetails.title,
        duration: parseInt(songInfo.videoDetails.lengthSeconds)
      });
    }
  }
  async makeResource() {
    let stream;
    let type = this.url.includes("youtube.com") ? import_voice.StreamType.Opus : import_voice.StreamType.OggOpus;
    const source = this.url.includes("youtube") ? "youtube" : "soundcloud";
    if (source === "youtube") {
      stream = await (0, import_ytdl_core_discord.default)(this.url, { quality: "highestaudio", highWaterMark: 1 << 25 });
    }
    if (!stream)
      return;
    return (0, import_voice.createAudioResource)(stream, { metadata: this, inputType: type, inlineVolume: true });
  }
  startMessage() {
    return import_i18n.i18n.__mf("play.startedPlaying", { title: this.title, url: this.url });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Song
});
//# sourceMappingURL=Song.js.map
