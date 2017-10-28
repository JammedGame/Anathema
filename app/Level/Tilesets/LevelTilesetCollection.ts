export { LevelTilesetCollection };

import Engineer from "./../../Engineer";
import { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType } from "./LevelTileset";

class LevelTilesetCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        this.Items["Ruin"] = new LevelTileset("Ruin", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetCeilingType.Bordered, [16,1]);
        this.Items["Cathedral"] = new LevelTileset("Cathedral", LevelTilesetLayoutType.Story, LevelTilesetFloorType.Checkered, LevelTilesetCeilingType.Crested, [1,3]);
    }
    public static Single:LevelTilesetCollection;
}