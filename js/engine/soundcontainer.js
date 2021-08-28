class SoundChannel {
  constructor(file, channels, volume=1.0) {
    this.channels = [];
    this.volume = volume;
    for (let i = 0; i < channels; i++) {
      let sound = new Audio();
      sound.src = file;
      sound.volume = volume;
      this.channels.push(sound);
    }
    console.log(`Sound Loaded: ${file} x ${channels} @ ${volume * 100}%`);
  };
  getPlayable() {
    for (let sound of this.channels) {
      if (sound.readyState === 4
        && (sound.currentTime == 0 || sound.currentTime >= sound.duration)) {
        return sound;
      }
    }
    return undefined;
  };
};

class SoundContainer {
  constructor() {
    this.sounds = [];
  };
  load(file, channels, volume=1.0) {
    let channel = new SoundChannel(file, channels, volume);
    this.sounds.push(channel);
  };
  play(id) {
    let sound = this.get(id);
    if (sound !== undefined) {
      sound.currentTime = 0;
      sound.play();
    }
  };
  get(id) {
    if (id >= 0 && id < this.sounds.length) {
      return this.sounds[id].getPlayable();
    }
    return undefined;
  };
};
