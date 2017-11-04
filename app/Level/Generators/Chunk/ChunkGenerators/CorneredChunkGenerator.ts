export { CorneredChunkGenerator }

import { Chunk } from "./../Chunk";
import { ChunkGenerator } from "./ChunkGenerator";

class CorneredChunkGenerator extends ChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Cornered";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateCorners(C);
    }
    protected GenerateCorners(C:Chunk) : void
    {
        // Virtual
        C.Fields[0][0] = 0;
        C.Fields[0][C.Dimensions.X - 1] = 0;
        C.Fields[C.Dimensions.Y - 1][C.Dimensions.X - 1] = 0;
        C.Fields[C.Dimensions.Y - 1][0] = 0;
        C.Fields[1][1] = 4;
        C.Fields[1][C.Dimensions.X-2] = 4;
        C.Fields[C.Dimensions.Y-2][C.Dimensions.X-2] = 4;
        C.Fields[C.Dimensions.Y-2][1] = 4;
    }
}