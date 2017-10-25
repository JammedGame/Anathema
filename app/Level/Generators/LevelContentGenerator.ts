export { LevelContentGenerator }

import Engineer from "./../../Engineer";

import { Chunk, ChunkGenerator } from "./ChunkGenerator";
import { GameScene } from "./../../GameScene";
import { Level } from "./../Level";
import { LevelTileset, LevelTilesetCeilingType, LevelTilesetLayoutType, LevelTilesetFloorType} from "./../Tilesets/LevelTileset";
import { Layout, LayoutClass, LayoutEntry } from "./../Layout";

class LevelContentGenerator
{
    public static Generate(L:Level) : any
    {
        let EntriesStrength = 0;
        for(let i = 0; i < L.Layout.Entries.length; i++) EntriesStrength += L.Layout.Entries[i].Size;

    }
}
