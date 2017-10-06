export { LevelGenerator, LevelTileset }

import Engineer from "./../Engineer";

import { Chunk, ChunkGenerator } from "./ChunkGenerator";
import { ColliderGenerator } from "./ColliderGenerator";
import { GameScene } from "./../GameScene";

class LevelGenerator
{
    private static _FieldSize:number = 100;
    public static Generate(Scene:GameScene, Tilesets:LevelTileset) : void
    {
        let NewChunk:Chunk = ChunkGenerator.Generate(0, new Engineer.Math.Vertex(5,4,0));
        
    }
    private static GenerateTile(Scene:GameScene, Location:any, Tileset:any, Index:number, Color:any) : any
    {
        let NewTile:any = new Engineer.Engine.Tile();
        NewTile.Name = "NewTile";
        NewTile.Collection = Tileset;
        NewTile.Index = Index;
        NewTile.Paint = Color;
        NewTile.Trans.Scale = new Engineer.Math.Vertex(LevelGenerator._FieldSize, LevelGenerator._FieldSize, 1);
        NewTile.Trans.Translation = new Engineer.Math.Vertex(LevelGenerator._FieldSize * Location.X, LevelGenerator._FieldSize * Location.Y, 0);
        Scene.AddSceneObject(NewTile);
    }
}
class LevelTileset
{
    private _Ground:any;
    private _Floor:any;
    private _Ceiling:any;
    public constructor()
    {
        this._Ground = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        this._Floor = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        this._Ceiling = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
}