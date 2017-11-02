export { EnvironmentCeilingGenerator }

import Engineer from "./../../../Engineer";

import { Level } from "./../../Level";
import { Chunk } from "./../ChunkGenerator";
import { LevelTilesetCeilingType } from "../../Tilesets/LevelTileset";

class EnvironmentCeilingGenerator
{
    public static Generate(Level:Level, Art:Chunk) : void
    {
        let C:Chunk = Level.Layout.Chunk;
        for(let i = 0; i < C.Dimensions.Y; i++)
        {
            for(let j = 0; j < C.Dimensions.X; j++)
            {
                if(C.Fields[i][j] == 4)
                {
                    Art.Fields[i][j] = EnvironmentCeilingGenerator.GenerateCeiling(Level, C, j, i);
                }
            }
        }
    }
    private static GenerateCeiling(Level:Level, C:Chunk, X:number, Y:number) : number
    {
        if(Level.Tileset.CeilingType == LevelTilesetCeilingType.Uniform) return EnvironmentCeilingGenerator.GenerateUniform();
        if(Level.Tileset.CeilingType == LevelTilesetCeilingType.Roofed) return EnvironmentCeilingGenerator.GenerateRoofed(C, X, Y);
        if(Level.Tileset.CeilingType == LevelTilesetCeilingType.Crested) return EnvironmentCeilingGenerator.GenerateCrested(C, X, Y);
        if(Level.Tileset.CeilingType == LevelTilesetCeilingType.Bordered) return EnvironmentCeilingGenerator.GenerateBordered(C, X, Y);
        if(Level.Tileset.CeilingType == LevelTilesetCeilingType.Divided) return EnvironmentCeilingGenerator.GenerateCrested(C, X, Y);
        return -1;
    }
    private static GenerateUniform() : number
    {
        return 0;
    }
    private static GenerateRoofed(C:Chunk, X:number, Y:number) : number
    {
        let Index = 0;
        let LeftBorder = (X - 1 >= 0 && (C.Fields[Y][X - 1] == 1 || C.Fields[Y][X - 1] == 2 || C.Fields[Y][X - 1] == 3));
        let RightBorder = (X + 1 < C.Dimensions.X && (C.Fields[Y][X + 1] == 1 || C.Fields[Y][X + 1] == 2 || C.Fields[Y][X + 1] == 3));
        if(LeftBorder) Index = 1;
        else if(RightBorder) Index = 2;
        return Index;
    }
    private static GenerateCrested(C:Chunk, X:number, Y:number) : number
    {
        let WM = EnvironmentCeilingGeneratorCalculations.CreateCrestedMatrix(C, X, Y);
        let Index = EnvironmentCeilingGeneratorCalculations.CalculateCrested(WM);
        return Index - 1;
    }
    private static GenerateBordered(C:Chunk, X:number, Y:number) : number
    {
        let Up = Y >= 1 && C.Fields[Y - 1][X] == 4; 
        let Down = Y + 1 < C.Dimensions.Y && C.Fields[Y + 1][X] == 4; 
        let Left = X >= 1 && C.Fields[Y][X - 1] == 4; 
        let Right = X + 1 < C.Dimensions.X && C.Fields[Y][X + 1] == 4; 
        let Index = EnvironmentCeilingGeneratorCalculations.CalculateBordered(Up,Down,Left,Right); 
        return Index - 1;
    }
}
class EnvironmentCeilingGeneratorCalculations
{
    public static CreateCrestedMatrix(C:Chunk, X:number, Y:number) : number[]
    {
        let WM = [];
        for(let i = 0; i < 9; i++) WM.push(0);
        if(X >= 1 && Y >= 1) WM[0] =  C.Fields[Y - 1][X - 1];
        if(Y >= 1) WM[1] =  C.Fields[Y - 1][X];
        if(X + 1 < C.Dimensions.X && Y >= 1) WM[2] =  C.Fields[Y - 1][X + 1];
        if(X >= 1) WM[3] =  C.Fields[Y][X - 1];
        WM[4] =  C.Fields[Y][X];
        if(X + 1 < C.Dimensions.X) WM[5] =  C.Fields[Y][X + 1];
        if(X >= 1 && Y + 1 < C.Dimensions.Y) WM[6] =  C.Fields[Y + 1][X - 1];
        if(Y + 1 < C.Dimensions.Y) WM[7] =  C.Fields[Y + 1][X];
        if(X + 1 < C.Dimensions.X && Y + 1 < C.Dimensions.Y) WM[8] =  C.Fields[Y + 1][X + 1];
        return WM;
    }
    public static CalculateCrested(WM:number[]) : number
    {
        let Index = 0;
        let WM1:boolean[] = [];
        let WM4:boolean[] = [];
        for(let i = 0; i < 9; i++)
        {
            WM1.push(WM[i] == 1 || WM[i] == 2 || WM[i] == 3);
            WM4.push(WM[i] == 4 || WM[i] == 0);
        }
        if(WM1[3] && WM1[7] && WM4[1] && WM4[5]) Index = 12;
        else if(WM1[5] && WM1[7] && WM4[1] && WM4[3]) Index = 11;
        else if(WM1[5] && WM1[1] && WM4[7] && WM4[3]) Index = 10;
        else if(WM1[3] && WM1[1] && WM4[7] && WM4[5]) Index = 9;
        else if(WM1[3] && WM4[1] && WM4[7]) Index = 8;
        else if(WM1[7] && WM4[3] && WM4[5]) Index = 7;
        else if(WM1[5] && WM4[1] && WM4[7]) Index = 6;
        else if(WM1[1] && WM4[3] && WM4[5]) Index = 5;
        else if(WM1[6] && WM4[3] && WM4[7]) Index = 4;
        else if(WM1[8] && WM4[5] && WM4[7]) Index = 3;
        else if(WM1[2] && WM4[5] && WM4[1]) Index = 2;
        else if(WM1[0] && WM4[1] && WM4[3]) Index = 1;
        return Index;
    }
    public static CalculateBordered(Up:boolean, Down:boolean, Left:boolean, Right:boolean) : number
    {
        let Index = 17;
        if(Up)
        {
            if(Down)
            {
                if(Left)
                {
                    if(Right) Index = 17;
                    else Index = 14;
                }
                else
                {
                    if(Right) Index = 16;
                    else Index = 6;
                }
            }
            else
            {
                if(Left)
                {
                    if(Right) Index = 15;
                    else Index = 3;
                }
                else
                {
                    if(Right) Index = 4;
                    else Index = 12;
                }
            }
        }
        else
        {
            if(Down)
            {
                if(Left)
                {
                    if(Right) Index = 13;
                    else Index = 2;
                }
                else
                {
                    if(Right) Index = 1;
                    else Index = 10;
                }
            }
            else
            {
                if(Left)
                {
                    if(Right) Index = 5;
                    else Index = 11;
                }
                else
                {
                    if(Right) Index = 9;
                    else Index = 17;
                }
            }
        }
        return Index;
    }
    public static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}