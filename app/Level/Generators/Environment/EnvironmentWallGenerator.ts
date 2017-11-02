export { EnvironmentWallGenerator }

import Engineer from "./../../../Engineer";

import { Level } from "./../../Level";
import { Chunk } from "./../ChunkGenerator";
import { LevelTilesetWallType } from "../../Tilesets/LevelTileset";

class EnvironmentWallGenerator
{
    public static Generate(Level:Level, Art:Chunk) : void
    {
        let C:Chunk = Level.Layout.Chunk;
        for(let i = 0; i < C.Dimensions.Y; i++)
        {
            for(let j = 0; j < C.Dimensions.X; j++)
            {
                if(C.Fields[i][j] == 3)
                {
                    Art.Fields[i][j] = EnvironmentWallGenerator.GenerateWall(Level, C, j, i);
                    if(i + 1 < C.Dimensions.Y && C.Fields[i + 1][j] == 2) Art.Fields[i + 1][j] = Art.Fields[i][j];
                }
            }
        }
    }
    private static GenerateWall(Level:Level, C:Chunk, X:number, Y:number) : number
    {
        if(Level.Tileset.WallType == LevelTilesetWallType.Uniform) return EnvironmentWallGenerator.GenerateUniform(Level);
        if(Level.Tileset.WallType == LevelTilesetWallType.Bordered) return EnvironmentWallGenerator.GenerateBordered(Level, C, X, Y);
        return -1;
    }
    private static GenerateBordered(Level:Level, C:Chunk, X:number, Y:number) : number
    {
        let LeftBorder = (X - 1 >= 0 && C.Fields[Y][X - 1] == 1) || (Y + 1 < C.Dimensions.Y && X - 1 >= 0 && C.Fields[Y + 1][X - 1] == 1);
        let RightBorder = (X + 1 < C.Dimensions.X && C.Fields[Y][X + 1] == 1) || (Y + 1 < C.Dimensions.Y && X + 1 < C.Dimensions.X && C.Fields[Y + 1][X + 1] == 1);
        if(LeftBorder) return 0;
        if(RightBorder) return 1;
        return 2 + EnvironmentWallGeneratorCalculations.RandomNumber(Level.Tileset.WallUpper.Images.length - 2);
    }
    private static GenerateUniform(Level:Level) : number
    {
        return EnvironmentWallGeneratorCalculations.RandomNumber(Level.Tileset.WallUpper.Images.length);
    }
}
class EnvironmentWallGeneratorCalculations
{
    public static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}