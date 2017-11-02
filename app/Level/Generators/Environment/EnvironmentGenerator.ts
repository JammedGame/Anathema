export { EnvironmentGenerator }

import Engineer from "./../../../Engineer";

import { Level } from "./../../Level";
import { Chunk } from "./../ChunkGenerator";
import { GameScene } from "./../../../GameScene";
import { ColliderGenerator } from "./../ColliderGenerator";
import { LevelTileset } from "./../../Tilesets/LevelTileset"; 
import { EnvironmentFloorGenerator } from "./EnvironmentFloorGenerator";
import { EnvironmentWallGenerator } from "./EnvironmentWallGenerator";
import { EnvironmentCeilingGenerator } from "./EnvironmentCeilingGenerator";

enum EnvironmentClass
{
    None = 0,
    Floor = 1,
    WallLower = 2,
    WallUpper = 3,
    Ceiling = 4
}
class EnvironmentGenerator
{
    private static _FieldSize:number = 120;
    public static Generate(Scene:GameScene, Level:Level) : void
    {
        let ArtIndices = new Chunk(Level.Layout.Chunk.Dimensions, -1);
        EnvironmentFloorGenerator.Generate(Level, ArtIndices);
        EnvironmentWallGenerator.Generate(Level, ArtIndices);
        EnvironmentCeilingGenerator.Generate(Level, ArtIndices);
        EnvironmentGenerator.GenerateTiles(Scene, Level, ArtIndices);
    }
    private static GenerateTiles(Scene:GameScene, Level:Level, Art:Chunk)
    {
        let C:Chunk = Level.Layout.Chunk;
        for(let i = 0; i < C.Dimensions.Y; i++)
        {
            for(let j = 0; j < C.Dimensions.X; j++)
            {
                if(Art.Fields[i][j] == -1) continue;
                if(C.Fields[i][j] == EnvironmentClass.Floor)
                {
                    EnvironmentGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.Floor, Art.Fields[i][j], Engineer.Math.Color.White);
                }
                if(C.Fields[i][j] == EnvironmentClass.WallLower)
                {
                    EnvironmentGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.Floor, 0, Engineer.Math.Color.White);
                    EnvironmentGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.WallLower, Art.Fields[i][j], Engineer.Math.Color.White);
                }
                if(C.Fields[i][j] == EnvironmentClass.WallUpper)
                {
                    EnvironmentGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.WallUpper, Art.Fields[i][j], Engineer.Math.Color.White);
                }
                if(C.Fields[i][j] == EnvironmentClass.Ceiling)
                {
                    EnvironmentGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.Ceiling, Art.Fields[i][j], Engineer.Math.Color.White);
                }
            }
        }
    }
    private static GenerateTile(Scene:GameScene, Location:any, Tileset:any, Index:number, Color:any) : any
    {
        let NewTile:any = new Engineer.Engine.Tile();
        NewTile.Name = "Tile(" + Location.X + "," + Location.Y + ")";
        NewTile.Collection = Tileset;
        NewTile.Index = Index;
        NewTile.Paint = Color;
        NewTile.Trans.Scale = new Engineer.Math.Vertex(EnvironmentGenerator._FieldSize, EnvironmentGenerator._FieldSize, 1);
        NewTile.Trans.Translation = new Engineer.Math.Vertex(EnvironmentGenerator._FieldSize * Location.X, EnvironmentGenerator._FieldSize * Location.Y, 0);
        Scene.AddSceneObject(NewTile);
    }
    private static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}
