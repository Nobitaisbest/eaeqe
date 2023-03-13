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
var Playlist_exports = {};
__export(Playlist_exports, {
  Playlist: () => Playlist
});
module.exports = __toCommonJS(Playlist_exports);
var import_youtube_sr = __toESM(require("youtube-sr"));
var import_config = require("../utils/config");
var import_Song = require("./Song");
const pattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/i;
class Playlist {
  data;
  videos;
  constructor(playlist) {
    this.data = playlist;
    this.videos = this.data.videos.filter((video) => video.title != "Private video" && video.title != "Deleted video").slice(0, import_config.config.MAX_PLAYLIST_SIZE - 1).map((video) => {
      return new import_Song.Song({
        title: video.title,
        url: `https://youtube.com/watch?v=${video.id}`,
        duration: video.duration / 1e3
      });
    });
  }
  static async from(url = "", search = "") {
    const urlValid = pattern.test(url);
    let playlist;
    if (urlValid) {
      playlist = await import_youtube_sr.default.getPlaylist(url);
    } else {
      const result = await import_youtube_sr.default.searchOne(search, "playlist");
      playlist = await import_youtube_sr.default.getPlaylist(result.url);
    }
    return new this(playlist);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Playlist
});
//# sourceMappingURL=Playlist.js.map
