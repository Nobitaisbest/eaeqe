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
var MissingPermissionsException_exports = {};
__export(MissingPermissionsException_exports, {
  MissingPermissionsException: () => MissingPermissionsException
});
module.exports = __toCommonJS(MissingPermissionsException_exports);
class MissingPermissionsException {
  constructor(permissions) {
    this.permissions = permissions;
  }
  message = "Missing permissions:";
  toString() {
    return `${this.message} ${this.permissions.join(", ")}`;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MissingPermissionsException
});
//# sourceMappingURL=MissingPermissionsException.js.map
