export { Level };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { LevelGenerator } from "./LevelGenerator";
import { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType } from "./LevelTileset";

class Level
{
    private _TileScale:number;
    private _Tiles:any[];
    private _Tileset:any;
    public constructor()
    {
        this._TileScale = 30;
        this._Tiles = [];
        this._Tileset = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
    public Init(Scene:GameScene) : void
    {
        //let Tileset:LevelTileset = new LevelTileset("Ruin", LevelTilesetLayoutType.Bordered, LevelTilesetFloorType.Uniform, LevelTilesetCeilingType.Bordered, [16,1]);
        let Tileset:LevelTileset = new LevelTileset("Cathedral", LevelTilesetLayoutType.Story, LevelTilesetFloorType.Checkered, LevelTilesetCeilingType.Crested, [1,1]);
        LevelGenerator.Generate(Scene, Tileset);
    }
}
