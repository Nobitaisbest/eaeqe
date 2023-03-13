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
var config_exports = {};
__export(config_exports, {
  config: () => config
});
module.exports = __toCommonJS(config_exports);
var import_config = require("dotenv/config");
let config;
try {
  config = require("../config.json");
} catch (error) {
  config = {
    TOKEN: process.env.TOKEN || "",
    PREFIX: process.env.PREFIX || "!",
    MAX_PLAYLIST_SIZE: parseInt(process.env.MAX_PLAYLIST_SIZE) || 10,
    PRUNING: process.env.PRUNING === "true" ? true : false,
    STAY_TIME: parseInt(process.env.STAY_TIME) || 30,
    DEFAULT_VOLUME: parseInt(process.env.DEFAULT_VOLUME) || 100,
    LOCALE: process.env.LOCALE || "en"
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config
});
//# sourceMappingURL=config.js.map
