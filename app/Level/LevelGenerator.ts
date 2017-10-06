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
        let NewChunk:Chunk = ChunkGenerator.Generate(0, new Engineer.Math.Vertex(11,7,0));
        for(let i = 0; i < NewChunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 1) LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Floor, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                else if(NewChunk.Fields[i][j] == 2) LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Wall, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                else if(NewChunk.Fields[i][j] == 3) LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Ceiling, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            }
        }
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
    public Floor:any;
    public Wall:any;
    public Ceiling:any;
    public constructor()
    {
        this.Floor = new Engineer.Engine.TileCollection(null, ["/build/resources/ground.png"]);
        this.Wall = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        this.Ceiling = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
}