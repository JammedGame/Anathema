export { PillaredChunkGenerator }

import { Chunk } from "./../Chunk";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";

class PillaredChunkGenerator extends CorneredChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Pillared";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GeneratePillars(C);
    }
    protected GeneratePillars(C:Chunk) : void
    {
        // Virtual
        for(let i = 6; i < C.Dimensions.Y - 6; i+=6)
        {
            for(let j = 5; j < C.Dimensions.X - 5; j+=5)
            {
                for(let k = 0; k < 2; k++)
                {
                    for(let l = 0; l < 2; l++)
                    {
                        C.Fields[i+k][j+l] = 4;
                    }
                }
            }
        }
    }
}