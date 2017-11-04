export { DiagonalChunkGenerator }

import { Chunk } from "./../Chunk";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";

class DiagonalChunkGenerator extends CorneredChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "Diagonal";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateDiagonals(C, 2.0 / 3);
    }
    protected GenerateDiagonals(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Radius = Math.floor(C.Dimensions.X * Factor / 2);
        for(let i = 1; i < Radius; i++)
        {
            C.Fields[i][i] = 4;
            C.Fields[i - 1][i] = 4;
            C.Fields[i][i - 1] = 4;

            C.Fields[i][C.Dimensions.X-i-1] = 4;
            C.Fields[i - 1][C.Dimensions.X-i-1] = 4;
            C.Fields[i][C.Dimensions.X-i] = 4;

            C.Fields[C.Dimensions.Y-i-1][C.Dimensions.X-i-1] = 4;
            C.Fields[C.Dimensions.Y-i][C.Dimensions.X-i-1] = 4;
            C.Fields[C.Dimensions.Y-i-1][C.Dimensions.X-i] = 4;

            C.Fields[C.Dimensions.Y-i-1][i] = 4;
            C.Fields[C.Dimensions.Y-i][i] = 4;
            C.Fields[C.Dimensions.Y-i-1][i - 1] = 4;
        }
    }
}