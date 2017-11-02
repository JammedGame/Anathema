export { EnvironmentFloorGenerator }

import Engineer from "./../../../Engineer";

import { Level } from "./../../Level";
import { Chunk } from "./../ChunkGenerator";
import { LevelTilesetFloorType } from "../../Tilesets/LevelTileset";

class EnvironmentFloorGenerator
{
    public static Generate(Level:Level, Art:Chunk) : void
    {
        let C:Chunk = Level.Layout.Chunk;
        for(let i = 0; i < C.Dimensions.Y; i++)
        {
            for(let j = 0; j < C.Dimensions.X; j++)
            {
                if(C.Fields[i][j] == 1)
                {
                    Art.Fields[i][j] = EnvironmentFloorGenerator.GenerateFloor(Level, C, j, i);
                }
            }
        }
    }
    private static GenerateFloor(Level:Level, C:Chunk, X:number, Y:number) : number
    {
        if(Level.Tileset.FloorType == LevelTilesetFloorType.Uniform) return EnvironmentFloorGenerator.GenerateUniform(Level);
        if(Level.Tileset.FloorType == LevelTilesetFloorType.Checkered) return EnvironmentFloorGenerator.GenerateCheckered(Level, X, Y);
        return -1;
    }
    private static GenerateCheckered(Level:Level, X:number, Y:number) : number
    {
        let Set2:boolean = (X + Y) % 2 == 0;
        if(Set2) return Level.Tileset.Floor.length / 2 + EnvironmentFloorGeneratorCalculations.RandomNumber(Level.Tileset.Floor.length / 2);
        return EnvironmentFloorGeneratorCalculations.RandomNumber(Level.Tileset.Floor.length / 2);
    }
    private static GenerateUniform(Level:Level) : number
    {
        return EnvironmentFloorGeneratorCalculations.RandomNumber(Level.Tileset.Floor.Images.length);
    }
}
class EnvironmentFloorGeneratorCalculations
{
    public static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}