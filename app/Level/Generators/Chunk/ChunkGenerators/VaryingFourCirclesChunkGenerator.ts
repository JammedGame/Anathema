export { VaryingFourCirclesChunkGenerator }

import { Chunk } from "./../Chunk";
import { FourCirclesChunkGenerator } from "./FourCirclesChunkGenerator";

class VaryingFourCirclesChunkGenerator extends FourCirclesChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "VaryingFourCircles";
    }
    protected GenerateFourCircles(C:Chunk, Factor:number) : void
    {
        // Virtual
        let Quarter = Math.floor(C.Dimensions.X / 4);
        let Radius = Math.floor(Factor * C.Dimensions.X / 2);
        this.GenerateCircle(C, Quarter, Quarter + 1, Radius + this.RandomNumber(2));
        this.GenerateCircle(C, C.Dimensions.X - Quarter, Quarter + 1, Radius + this.RandomNumber(2));
        this.GenerateCircle(C, Quarter, C.Dimensions.Y - Quarter - 2, Radius + this.RandomNumber(2));
        this.GenerateCircle(C, C.Dimensions.X - Quarter, C.Dimensions.Y - Quarter - 2, Radius + this.RandomNumber(2));
        this.CorrectCircles(C);
    }
}