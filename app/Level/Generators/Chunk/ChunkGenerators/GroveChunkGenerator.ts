export { GroveChunkGenerator }

import { Chunk } from "./../Chunk";
import { DiagonalChunkGenerator } from "./DiagonalChunkGenerator";

class GroveChunkGenerator extends DiagonalChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Grove";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        
        if(C.Dimensions.X < 25)
        {
            super.Generate(C);
        }
        else
        {
            super.GenerateBorders(C);
            super.GenerateCorners(C);
            this.GenerateDiagonals(C, 0.5);
            this.GenerateCenter(C, 0.3);
        }
    }
    protected GenerateCenter(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Half = Math.floor(C.Dimensions.X / 2);
        let Radius = Math.floor(Factor * C.Dimensions.X / 2);
        this.GenerateCircle(C, Half, Half, Radius);
        this.CorrectCircles(C);
    }
    protected GenerateCircle(C:Chunk, XOrigin:number, YOrigin:number, Radius)
    {
        for(let Y = -Radius; Y <= Radius; Y++)
        {
            for(let X = -Radius; X <= Radius; X++)
            {
                if(X * X + Y * Y <= Radius * Radius)
                {
                    C.Fields[YOrigin + Y][XOrigin + X] = 4;
                }
            }
        }
    }
    protected CorrectCircles(C:Chunk)
    {
        for(let Y = 1; Y < C.Dimensions.Y - 1; Y++)
        {
            for(let X = 1; X < C.Dimensions.Y - 1; X++)
            {
                if(C.Fields[Y][X] == 4 && C.Fields[Y][X - 1] == 1 && C.Fields[Y][X + 1] == 1)
                {
                    C.Fields[Y][X - 1] = 4;
                    C.Fields[Y][X + 1] = 4;
                }
            }
        }
    }
}