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
var checkPermissions_exports = {};
__export(checkPermissions_exports, {
  checkPermissions: () => checkPermissions
});
module.exports = __toCommonJS(checkPermissions_exports);
async function checkPermissions(command, interaction) {
  const member = await interaction.guild.members.fetch({ user: interaction.client.user.id });
  const requiredPermissions = command.permissions;
  if (!command.permissions)
    return { result: true, missing: [] };
  const missing = member.permissions.missing(requiredPermissions);
  return { result: !Boolean(missing.length), missing };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkPermissions
});
//# sourceMappingURL=checkPermissions.js.map
