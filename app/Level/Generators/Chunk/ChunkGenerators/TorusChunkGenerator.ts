export { TorusChunkGenerator }

import { Chunk } from "./../Chunk";
import { ChunkGenerator } from "./ChunkGenerator";

class TorusChunkGenerator extends ChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Torus";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateCenter(C);
    }
    protected GenerateCenter(C:Chunk) : void
    {
        // Virtual
        let Half = Math.ceil(C.Dimensions.X / 2);
        if(C.Dimensions.X > 10)
        {
            let Radius = 2 + Math.floor(C.Dimensions.X / 10);
            for(let i = Half - Radius; i < Half + Radius; i++)
            {
                for(let j = Half - Radius; j < Half + Radius; j++)
                {
                    C.Fields[i][j] = 0;
                }
            }
            for(let i = Half - Radius; i <= Half + Radius; i++)
            {
                C.Fields[i][Half - Radius] = 4;
                C.Fields[Half - Radius][i] = 4;
                C.Fields[i][Half + Radius] = 4;
                C.Fields[Half + Radius][i] = 4;
            }
        }
    }
}