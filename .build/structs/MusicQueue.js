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
var MusicQueue_exports = {};
__export(MusicQueue_exports, {
  MusicQueue: () => MusicQueue
});
module.exports = __toCommonJS(MusicQueue_exports);
var import_voice = require("@discordjs/voice");
var import_node_util = require("node:util");
var import__ = require("../index");
var import_config = require("../utils/config");
var import_i18n = require("../utils/i18n");
var import_queue = require("../utils/queue");
const wait = (0, import_node_util.promisify)(setTimeout);
class MusicQueue {
  interaction;
  connection;
  player;
  textChannel;
  bot = import__.bot;
  resource;
  songs = [];
  volume = import_config.config.DEFAULT_VOLUME || 100;
  loop = false;
  muted = false;
  waitTimeout;
  queueLock = false;
  readyLock = false;
  stopped = false;
  constructor(options) {
    Object.assign(this, options);
    this.player = (0, import_voice.createAudioPlayer)({ behaviors: { noSubscriber: import_voice.NoSubscriberBehavior.Play } });
    this.connection.subscribe(this.player);
    const networkStateChangeHandler = (oldNetworkState, newNetworkState) => {
      const newUdp = Reflect.get(newNetworkState, "udp");
      clearInterval(newUdp == null ? void 0 : newUdp.keepAliveInterval);
    };
    this.connection.on("stateChange", async (oldState, newState) => {
      var _a, _b;
      (_a = Reflect.get(oldState, "networking")) == null ? void 0 : _a.off("stateChange", networkStateChangeHandler);
      (_b = Reflect.get(newState, "networking")) == null ? void 0 : _b.on("stateChange", networkStateChangeHandler);
      if (newState.status === import_voice.VoiceConnectionStatus.Disconnected) {
        if (newState.reason === import_voice.VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode === 4014) {
          try {
            this.stop();
          } catch (e) {
            console.log(e);
            this.stop();
          }
        } else if (this.connection.rejoinAttempts < 5) {
          await wait((this.connection.rejoinAttempts + 1) * 5e3);
          this.connection.rejoin();
        } else {
          this.connection.destroy();
        }
      } else if (!this.readyLock && (newState.status === import_voice.VoiceConnectionStatus.Connecting || newState.status === import_voice.VoiceConnectionStatus.Signalling)) {
        this.readyLock = true;
        try {
          await (0, import_voice.entersState)(this.connection, import_voice.VoiceConnectionStatus.Ready, 2e4);
        } catch {
          if (this.connection.state.status !== import_voice.VoiceConnectionStatus.Destroyed) {
            try {
              this.connection.destroy();
            } catch {
            }
          }
        } finally {
          this.readyLock = false;
        }
      }
    });
    this.player.on("stateChange", async (oldState, newState) => {
      if (oldState.status !== import_voice.AudioPlayerStatus.Idle && newState.status === import_voice.AudioPlayerStatus.Idle) {
        if (this.loop && this.songs.length) {
          this.songs.push(this.songs.shift());
        } else {
          this.songs.shift();
          if (!this.songs.length)
            return this.stop();
        }
        if (this.songs.length || this.resource.audioPlayer)
          this.processQueue();
      } else if (oldState.status === import_voice.AudioPlayerStatus.Buffering && newState.status === import_voice.AudioPlayerStatus.Playing) {
        this.sendPlayingMessage(newState);
      }
    });
    this.player.on("error", (error) => {
      console.error(error);
      if (this.loop && this.songs.length) {
        this.songs.push(this.songs.shift());
      } else {
        this.songs.shift();
      }
      this.processQueue();
    });
  }
  enqueue(...songs) {
    if (this.waitTimeout !== null)
      clearTimeout(this.waitTimeout);
    this.waitTimeout = null;
    this.stopped = false;
    this.songs = this.songs.concat(songs);
    this.processQueue();
  }
  stop() {
    if (this.stopped)
      return;
    this.stopped = true;
    this.loop = false;
    this.songs = [];
    this.player.stop();
    !import_config.config.PRUNING && this.textChannel.send(import_i18n.i18n.__("play.queueEnded")).catch(console.error);
    if (this.waitTimeout !== null)
      return;
    this.waitTimeout = setTimeout(() => {
      if (this.connection.state.status !== import_voice.VoiceConnectionStatus.Destroyed) {
        try {
          this.connection.destroy();
        } catch {
        }
      }
      import__.bot.queues.delete(this.interaction.guild.id);
      !import_config.config.PRUNING && this.textChannel.send(import_i18n.i18n.__("play.leaveChannel"));
    }, import_config.config.STAY_TIME * 1e3);
  }
  async processQueue() {
    var _a;
    if (this.queueLock || this.player.state.status !== import_voice.AudioPlayerStatus.Idle) {
      return;
    }
    if (!this.songs.length) {
      return this.stop();
    }
    this.queueLock = true;
    const next = this.songs[0];
    try {
      const resource = await next.makeResource();
      this.resource = resource;
      this.player.play(this.resource);
      (_a = this.resource.volume) == null ? void 0 : _a.setVolumeLogarithmic(this.volume / 100);
    } catch (error) {
      console.error(error);
      return this.processQueue();
    } finally {
      this.queueLock = false;
    }
  }
  async sendPlayingMessage(newState) {
    const song = newState.resource.metadata;
    let playingMessage;
    try {
      playingMessage = await this.textChannel.send(newState.resource.metadata.startMessage());
      await playingMessage.react("\u23ED");
      await playingMessage.react("\u23EF");
      await playingMessage.react("\u{1F507}");
      await playingMessage.react("\u{1F509}");
      await playingMessage.react("\u{1F50A}");
      await playingMessage.react("\u{1F501}");
      await playingMessage.react("\u{1F500}");
      await playingMessage.react("\u23F9");
    } catch (error) {
      console.error(error);
      this.textChannel.send(error.message);
      return;
    }
    const filter = (reaction, user) => user.id !== this.textChannel.client.user.id;
    const collector = playingMessage.createReactionCollector({
      filter,
      time: song.duration > 0 ? song.duration * 1e3 : 6e5
    });
    collector.on("collect", async (reaction, user) => {
      var _a, _b, _c, _d;
      if (!this.songs)
        return;
      const member = await playingMessage.guild.members.fetch(user);
      switch (reaction.emoji.name) {
        case "\u23ED":
          reaction.users.remove(user).catch(console.error);
          await this.bot.slashCommandsMap.get("skip").execute(this.interaction);
          break;
        case "\u23EF":
          reaction.users.remove(user).catch(console.error);
          if (this.player.state.status == import_voice.AudioPlayerStatus.Playing) {
            await this.bot.slashCommandsMap.get("pause").execute(this.interaction);
          } else {
            await this.bot.slashCommandsMap.get("resume").execute(this.interaction);
          }
          break;
        case "\u{1F507}":
          reaction.users.remove(user).catch(console.error);
          if (!(0, import_queue.canModifyQueue)(member))
            return import_i18n.i18n.__("common.errorNotChannel");
          this.muted = !this.muted;
          if (this.muted) {
            (_a = this.resource.volume) == null ? void 0 : _a.setVolumeLogarithmic(0);
            this.textChannel.send(import_i18n.i18n.__mf("play.mutedSong", { author: user })).catch(console.error);
          } else {
            (_b = this.resource.volume) == null ? void 0 : _b.setVolumeLogarithmic(this.volume / 100);
            this.textChannel.send(import_i18n.i18n.__mf("play.unmutedSong", { author: user })).catch(console.error);
          }
          break;
        case "\u{1F509}":
          reaction.users.remove(user).catch(console.error);
          if (this.volume == 0)
            return;
          if (!(0, import_queue.canModifyQueue)(member))
            return import_i18n.i18n.__("common.errorNotChannel");
          this.volume = Math.max(this.volume - 10, 0);
          (_c = this.resource.volume) == null ? void 0 : _c.setVolumeLogarithmic(this.volume / 100);
          this.textChannel.send(import_i18n.i18n.__mf("play.decreasedVolume", { author: user, volume: this.volume })).catch(console.error);
          break;
        case "\u{1F50A}":
          reaction.users.remove(user).catch(console.error);
          if (this.volume == 100)
            return;
          if (!(0, import_queue.canModifyQueue)(member))
            return import_i18n.i18n.__("common.errorNotChannel");
          this.volume = Math.min(this.volume + 10, 100);
          (_d = this.resource.volume) == null ? void 0 : _d.setVolumeLogarithmic(this.volume / 100);
          this.textChannel.send(import_i18n.i18n.__mf("play.increasedVolume", { author: user, volume: this.volume })).catch(console.error);
          break;
        case "\u{1F501}":
          reaction.users.remove(user).catch(console.error);
          await this.bot.slashCommandsMap.get("loop").execute(this.interaction);
          break;
        case "\u{1F500}":
          reaction.users.remove(user).catch(console.error);
          await this.bot.slashCommandsMap.get("shuffle").execute(this.interaction);
          break;
        case "\u23F9":
          reaction.users.remove(user).catch(console.error);
          await this.bot.slashCommandsMap.get("stop").execute(this.interaction);
          collector.stop();
          break;
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });
    collector.on("end", () => {
      playingMessage.reactions.removeAll().catch(console.error);
      if (import_config.config.PRUNING) {
        setTimeout(() => {
          playingMessage.delete().catch();
        }, 3e3);
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MusicQueue
});
//# sourceMappingURL=MusicQueue.js.map
