class Level {
  constructor(levelData) {
    this.name = levelData.name;
    this.currentWave = 0;
    this.waveStartTime = undefined;
    this.mapSpawnLocation = 0;
    this.waveSpawns = [];
    for (let i = 0; i < levelData.waveSpawns.length; i++) {
      let spawns = [];
      for (let j = 0; j < levelData.waveSpawns[i].length; j++) {
        let spawn = {
          "mobId": levelData.waveSpawns[i][j].mobId
          ,"spawnTime": levelData.waveSpawns[i][j].spawnTime
          ,"spawnAmount": levelData.waveSpawns[i][j].spawnAmount
          ,"spawned": false
        };
        spawns.push(spawn);
      }
      this.waveSpawns.push(spawns);
    }
  };
};