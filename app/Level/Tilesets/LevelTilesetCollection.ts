export { LevelTilesetCollection };

import Engineer from "./../../Engineer";
import { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType, LevelTilesetWallType, LevelTilesetFillType } from "./LevelTileset";

class LevelTilesetCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        this.Items["Beach"] = new LevelTileset("Beach", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.Ceiling, [5,1,0]);
        this.Items["Forest"] = new LevelTileset("Forest", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.Ceiling, [1,1,0]);
        this.Items["Town"] = new LevelTileset("Town", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Bordered, LevelTilesetCeilingType.Roofed, LevelTilesetFillType.Ceiling, [3,7,0]);
        this.Items["Cathedral"] = new LevelTileset("Cathedral", LevelTilesetLayoutType.Story, LevelTilesetFloorType.Checkered, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Crested, LevelTilesetFillType.Floor, [8,8,0]);
        this.Items["Graveyard"] = new LevelTileset("Graveyard", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.Separate, [1,1,1]);
        this.Items["Castle"] = new LevelTileset("Castle", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.None, [1,1,0]);
        this.Items["Dungeon"] = new LevelTileset("Dungeon", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.None, [1,1,0]);
        this.Items["Ruin"] = new LevelTileset("Ruin", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Bordered, LevelTilesetFillType.None, [16,1,0]);
        this.Items["Tower"] = new LevelTileset("Tower", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Uniform, LevelTilesetFillType.None, [1,1,0]);
    }
    public static Single:LevelTilesetCollection;
}