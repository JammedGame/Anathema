export { SquareChunkGenerator }

import { Chunk } from "./../Chunk";
import { ChunkGenerator } from "./ChunkGenerator";

class SquareChunkGenerator extends ChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Square";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateCenter(C, 2.0 / 3);
    }
    protected GenerateCenter(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Half = Math.floor(C.Dimensions.X / 2);
        let Radius = Math.floor(C.Dimensions.X * Factor / 2);
        if(C.Dimensions.X < 25) Radius -= 2;
        for(let Y = Half - Radius; Y <= Half + Radius; Y++)
        {
            for(let X = Half - Radius; X <= Half + Radius; X++)
            {
                C.Fields[Y][X] = 4;
            }
        }
    }
}