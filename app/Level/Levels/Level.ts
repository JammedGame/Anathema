export { Level };

import { GameScene } from "../../GameScene";
import LevelGenerator from "../Generators/LevelGenerator";
import { Enemy } from "../../Unit/Enemies/Enemy";
import { Layout } from "./Layout";
import LevelTileset from "../Tilesets/LevelTileset";
import LevelBlueprint from "./LevelBlueprint";
import LevelTilesetBlueprint from "../Tilesets/LevelTilesetBlueprint";

class Level {
    public dimensions: number[];
    public tileset: LevelTileset;
    public layout?: Layout;
    public enemies: Enemy[];
    public blueprint: LevelBlueprint;
    
    public accessMatrix: number[][];

    public constructor(blueprint: LevelBlueprint, tilesetBlueprint: LevelTilesetBlueprint) {
        this.dimensions = blueprint.dimensions;
        this.tileset = new LevelTileset(tilesetBlueprint);
        this.enemies = [];
        this.blueprint = blueprint;
    }

    public duplicate(): Level {
        return new Level(this.blueprint, this.tileset.blueprint);
    }

    public init(Scene: GameScene): void {
        if (!this.tileset.initialized) {
            this.tileset.init();
        }
        LevelGenerator.generate(Scene, this);
    }

    public update() {
        this.enemies.forEach((enemy: Enemy) => enemy.Update());
    }
}
