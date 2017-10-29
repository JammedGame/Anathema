export { LevelTilesetCollection };

import Engineer from "./../../Engineer";
import { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType, LevelTilesetWallType } from "./LevelTileset";

class LevelTilesetCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        this.Items["Ruin"] = new LevelTileset("Ruin", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Bordered, [16,1]);
        this.Items["Cathedral"] = new LevelTileset("Cathedral", LevelTilesetLayoutType.Story, LevelTilesetFloorType.Checkered, LevelTilesetWallType.Uniform, LevelTilesetCeilingType.Crested, [4,8]);
        this.Items["Town"] = new LevelTileset("Town", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetWallType.Bordered, LevelTilesetCeilingType.Roofed, [1,5]);
    }
    public static Single:LevelTilesetCollection;
}