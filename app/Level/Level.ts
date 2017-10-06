export { Level };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { LevelGenerator, LevelTileset } from "./LevelGenerator";

class Level
{
    private _TileScale:number;
    private _Tiles:any[];
    private _Tileset:any;
    public constructor()
    {
        this._TileScale = 100;
        this._Tiles = [];
        this._Tileset = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
    public Init(Scene:GameScene) : void
    {
        let Tilesets:LevelTileset = new LevelTileset();
        LevelGenerator.Generate(Scene, Tilesets);
    }
}
