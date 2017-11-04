export { CorneredSquareChunkGenerator }

import { Chunk } from "./../Chunk";
import { SquareChunkGenerator } from "./SquareChunkGenerator";

class CorneredSquareChunkGenerator extends SquareChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "CorneredSquare";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateCenterCorners(C, 2.0 / 3);
    }
    protected GenerateCenterCorners(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Half = Math.floor(C.Dimensions.X / 2);
        let Radius = Math.floor(C.Dimensions.X * Factor / 2);
        if(C.Dimensions.X < 25) Radius -= 2;
        C.Fields[Half-Radius][Half-Radius] = 1;
        C.Fields[Half-Radius][Half+Radius] = 1;
        C.Fields[Half+Radius][Half-Radius] = 1;
        C.Fields[Half+Radius][Half+Radius] = 1;
    }
}