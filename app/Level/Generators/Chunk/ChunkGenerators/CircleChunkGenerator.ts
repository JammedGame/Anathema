export { CircleChunkGenerator }

import { Chunk } from "./../Chunk";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";

class CircleChunkGenerator extends CorneredChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Circle";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateCircle(C, 1.0 / 2);
    }
    protected GenerateCircle(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Half = Math.floor(C.Dimensions.X / 2);
        let Radius = Math.floor(Factor * C.Dimensions.X / 2);
        for(let Y = -Radius; Y <= Radius; Y++)
        {
            for(let X = -Radius; X <= Radius; X++)
            {
                if(X * X + Y * Y <= Radius * Radius)
                {
                    C.Fields[Half + Y][Half + X] = 4;
                }
            }
        }
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