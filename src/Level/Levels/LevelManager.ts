import * as TBX from 'toybox-engine';

import Level from "./Level";
import { GameScene } from "../../GameScene";
import LevelBlueprint from "./LevelBlueprint";
import { LevelTilesetCollection } from "../Tilesets/LevelTilesetCollection";
import LevelBlueprints from "./LevelsData";

class LevelManager {
    private game: TBX.Game;
    private runner: TBX.RunnerService;
    private activeLevel: Level;
    private activeScene: GameScene;
    private tilesetCollection: LevelTilesetCollection;

    public levels: { [key: string]: Level };

    public constructor() {
        this.runner = TBX.Inject(TBX.RunnerService);
        this.game = this.runner.Game;
        this.tilesetCollection = new LevelTilesetCollection();
        this.levels = {};
        LevelBlueprints.forEach((blueprint: LevelBlueprint) => {
            this.levels[blueprint.name] = new Level(blueprint, this.tilesetCollection.get(blueprint.tilesetId));
        });
    }

    public startLevel(name: string) {
        if (this.activeLevel) this.destroy();
        if (!this.levels[name]) return;
        this.activeLevel = this.levels[name].duplicate();
        this.activeScene = new GameScene();
        this.game.Attach(this.activeScene);
        this.runner.SwitchScene("GameScene");
        this.activeScene.Init(this.activeLevel);
    }

    private destroy(): void {
        this.activeScene.Pause = true;
        this.activeLevel = null;
        this.game.Scenes.splice(this.game.Scenes.indexOf(this.activeScene), 1);
        this.activeScene = null;
    }
}

export default LevelManager;
