import Layout from "./Layout";
import { GameScene } from "../../GameScene";
import Enemy from "../../Unit/Enemies/Enemy";
import LevelBlueprint from "./LevelBlueprint";
import LevelTileset from "../Tilesets/LevelTileset";
import LevelGenerator from "../Generators/LevelGenerator";
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

    public init(scene: GameScene): void {
        if (!this.tileset.initialized) {
            this.tileset.init();
        }
        LevelGenerator.generate(scene, this);
    }

    public update() {
        this.enemies.forEach((enemy: Enemy) => enemy.update());
    }
}

export default Level;
