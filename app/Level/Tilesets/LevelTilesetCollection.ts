export { LevelTilesetCollection };

import Engineer from "./../../Engineer";
import { LevelTileset, LevelTilesetCeilingType, LevelTilesetFloorType, LevelTilesetWallType, LevelTilesetFillType } from "./LevelTileset";

class LevelTilesetCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};

        this.Items["Beach"] = new LevelTileset("Beach");
        this.Items["Beach"].FillType = LevelTilesetFillType.Ceiling;
        this.Items["Beach"].ChunkTypes = ["Cornered", "Torus"];
        this.Items["Beach"].Init([5,1,0]);

        this.Items["Forest"] = new LevelTileset("Forest");
        this.Items["Forest"].FillType = LevelTilesetFillType.Ceiling;
        this.Items["Forest"].Init([1,1,0]);

        this.Items["Town"] = new LevelTileset("Town");
        this.Items["Town"].WallType = LevelTilesetWallType.Bordered;
        this.Items["Town"].CeilingType = LevelTilesetCeilingType.Roofed;
        this.Items["Town"].FillType = LevelTilesetFillType.Ceiling;
        this.Items["Town"].Init([3,7,0]);
        
        this.Items["Cathedral"] = new LevelTileset("Cathedral");
        this.Items["Cathedral"].FloorType = LevelTilesetFloorType.Checkered;
        this.Items["Cathedral"].CeilingType = LevelTilesetCeilingType.Crested;
        this.Items["Cathedral"].Init([8,8,0]);

        this.Items["Graveyard"] = new LevelTileset("Graveyard");
        this.Items["Graveyard"].FillType = LevelTilesetFillType.Separate;
        this.Items["Graveyard"].Init([1,1,1]);

        this.Items["Castle"] = new LevelTileset("Castle");
        this.Items["Castle"].Init([1,1,0]);
        
        this.Items["Dungeon"] = new LevelTileset("Dungeon");
        this.Items["Dungeon"].Init([1,1,0]);

        this.Items["Ruin"] = new LevelTileset("Ruin");
        this.Items["Ruin"].CeilingType = LevelTilesetCeilingType.Bordered;
        this.Items["Ruin"].Init([16,1,0]);

        this.Items["Tower"] = new LevelTileset("Tower");
        this.Items["Tower"].Init([1,1,0]);
    }
    public static Single:LevelTilesetCollection;
}