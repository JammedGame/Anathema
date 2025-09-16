import * as TBX from 'toybox-engine';

import { Level } from "./Level";
import { GameScene } from "../../GameScene";
import { Enemy } from '../../Unit/Enemies/Enemy';
import { EnemyCollection } from "../../Unit/Enemies/EnemyCollection";
import { LevelTilesetCollection } from "../Tilesets/LevelTilesetCollection";
import LevelBlueprint, { LevelBlueprintEnemy } from "./LevelBlueprint";
import LevelBlueprints from "./LevelsData";

class LevelManager {
    private game: TBX.Game;
    private runner: TBX.Runner;
    private activeLevel: Level;
    private activeScene: GameScene;
    private enemyCollection: EnemyCollection;
    private tilesetCollection: LevelTilesetCollection;

    public levels: { [key: string]: Level };

    public constructor(runner: TBX.Runner, game: TBX.Game) {
        this.game = game;
        this.runner = runner;
        this.enemyCollection = new EnemyCollection();
        this.tilesetCollection = new LevelTilesetCollection();
        this.levels = {};
        LevelBlueprints.forEach((blueprint: LevelBlueprint) => {
            this.levels[blueprint.name] = new Level(blueprint, this.tilesetCollection.get(blueprint.tilesetId));
        })
    }

    public startLevel(name: string) {
        if (this.activeLevel) this.destroy();
        if (!this.levels[name]) return;
        this.activeLevel = this.levels[name].duplicate();
        this.activeScene = new GameScene();
        this.initEnemies();
        this.game.Attach(this.activeScene);
        this.runner.SwitchScene("GameScene");
        this.activeScene.Init(this.activeLevel);
    }

    private initEnemies(): void {
        let enemies: Enemy[] = [];
        this.activeLevel.blueprint.enemies.forEach((enemy: LevelBlueprintEnemy) => {
            for (let i = 0; i < enemy.number; i++) {
                enemies.push(this.enemyCollection.Items[enemy.enemyId].Copy());
            }
        });
        this.activeLevel.enemies = enemies;
    }

    private destroy(): void {
        this.activeScene.Pause = true;
        this.activeLevel = null;
        this.game.Scenes.splice(this.game.Scenes.indexOf(this.activeScene), 1);
        this.activeScene = null;
    }
}

export default LevelManager;
