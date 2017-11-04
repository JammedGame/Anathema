export { FourCirclesChunkGenerator }

import { Chunk } from "./../Chunk";
import { CircleChunkGenerator } from "./CircleChunkGenerator";

class FourCirclesChunkGenerator extends CircleChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "FourCircles";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        if(C.Dimensions.X < 25)
        {
            super.Generate(C);
        }
        else
        {
            super.GenerateBorders(C);
            super.GenerateCorners(C);
            this.GenerateFourCircles(C, 0.2);
        }
    }
    protected GenerateFourCircles(C:Chunk, Factor:number) : void
    {
        // Virtual
        let Quarter = Math.floor(C.Dimensions.X / 4);
        let Radius = Math.floor(Factor * C.Dimensions.X / 2);
        this.GenerateCircle(C, Quarter, Quarter + 1, Radius);
        this.GenerateCircle(C, C.Dimensions.X - Quarter, Quarter + 1, Radius);
        this.GenerateCircle(C, Quarter, C.Dimensions.Y - Quarter - 2, Radius);
        this.GenerateCircle(C, C.Dimensions.X - Quarter, C.Dimensions.Y - Quarter - 2, Radius);
        this.CorrectCircles(C);
    }
}