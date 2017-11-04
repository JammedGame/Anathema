export { VaryingCorneredSquareChunkGenerator }

import { Chunk } from "./../Chunk";
import { CorneredSquareChunkGenerator } from "./CorneredSquareChunkGenerator";

class VaryingCorneredSquareChunkGenerator extends CorneredSquareChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "VaryingCorneredSquare";
    }
    protected GenerateCenterCorners(C:Chunk, Factor:number) : void
    {
        // Override
        if(C.Dimensions.X < 15) return;
        let Half = Math.floor(C.Dimensions.X / 2);
        let Radius = Math.floor(C.Dimensions.X * Factor / 2);
        if(C.Dimensions.X < 25) Radius -= 2;
        if(this.RandomNumber(2) == 1)
        {
            C.Fields[Half-Radius][Half-Radius] = 1;
            C.Fields[Half-Radius][Half+Radius] = 1;
            C.Fields[Half+Radius][Half-Radius] = 1;
            C.Fields[Half+Radius][Half+Radius] = 1;
        }
    }
}