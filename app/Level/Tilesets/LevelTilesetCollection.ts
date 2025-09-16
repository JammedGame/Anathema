export { LevelTilesetCollection };

import LevelTilesetBlueprints from "./TilesetsData";
import LevelTilesetBlueprint from "./LevelTilesetBlueprint";

class LevelTilesetCollection {
    public blueprints: { [key: string]: LevelTilesetBlueprint; };

    public constructor() {
        this.blueprints = {};
        LevelTilesetBlueprints.forEach((blueprint: LevelTilesetBlueprint) => {
            this.blueprints[blueprint.name] = blueprint;
        });
    }

    public get(name: string): LevelTilesetBlueprint {
        return this.blueprints[name];
    }
}
