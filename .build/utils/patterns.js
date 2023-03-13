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
var patterns_exports = {};
__export(patterns_exports, {
  isURL: () => isURL,
  mobileScRegex: () => mobileScRegex,
  playlistPattern: () => playlistPattern,
  scRegex: () => scRegex,
  videoPattern: () => videoPattern
});
module.exports = __toCommonJS(patterns_exports);
const videoPattern = /^(https?:\/\/)?(www\.)?(m\.|music\.)?(youtube\.com|youtu\.?be)\/.+$/;
const playlistPattern = /^.*(list=)([^#\&\?]*).*/;
const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
const mobileScRegex = /^https?:\/\/(soundcloud\.app\.goo\.gl)\/(.*)$/;
const isURL = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isURL,
  mobileScRegex,
  playlistPattern,
  scRegex,
  videoPattern
});
//# sourceMappingURL=patterns.js.map
