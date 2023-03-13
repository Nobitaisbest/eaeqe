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
var i18n_exports = {};
__export(i18n_exports, {
  i18n: () => import_i18n.default
});
module.exports = __toCommonJS(i18n_exports);
var import_i18n = __toESM(require("i18n"));
var import_path = require("path");
var import_config = require("./config");
import_i18n.default.configure({
  locales: [
    "ar",
    "cs",
    "de",
    "el",
    "en",
    "es",
    "fa",
    "fr",
    "id",
    "it",
    "ja",
    "ko",
    "mi",
    "nl",
    "pl",
    "pt_br",
    "ru",
    "sv",
    "th",
    "tr",
    "uk",
    "vi",
    "zh_cn",
    "zh_sg",
    "zh_tw"
  ],
  directory: (0, import_path.join)(__dirname, "..", "locales"),
  defaultLocale: "en",
  retryInDefaultLocale: true,
  objectNotation: true,
  register: global,
  logWarnFn: function(msg) {
    console.log(msg);
  },
  logErrorFn: function(msg) {
    console.log(msg);
  },
  missingKeyFn: function(locale, value) {
    return value;
  },
  mustacheConfig: {
    tags: ["{{", "}}"],
    disable: false
  }
});
import_i18n.default.setLocale(import_config.config.LOCALE);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  i18n
});
//# sourceMappingURL=i18n.js.map
