export { ConnectedFourCirclesChunkGenerator }

import { Chunk } from "./../Chunk";
import { FourCirclesChunkGenerator } from "./FourCirclesChunkGenerator";

class ConnectedFourCirclesChunkGenerator extends FourCirclesChunkGenerator
{
    public constructor()
    {
        super();
        this._ID = "ConnectedFourCircles";
    }
    public Generate(C:Chunk) : void
    {
        // Override
        super.Generate(C);
        this.GenerateConnections(C, 0.2);
    }
    protected GenerateConnections(C:Chunk, Factor:number) : void
    {
        // Virtual
        if(C.Dimensions.X < 15) return;
        let Quarter = Math.floor(C.Dimensions.X / 4);
        let Radius = Math.floor(Factor * C.Dimensions.X / 2);
        if(this.RandomNumber(2) == 1) this.GenerateConnection(C, Quarter, Quarter + 1, C.Dimensions.X - Quarter, Quarter + 1, Radius);
        if(this.RandomNumber(2) == 1) this.GenerateConnection(C, Quarter, C.Dimensions.Y - Quarter - 2, C.Dimensions.X - Quarter, C.Dimensions.Y - Quarter - 2, Radius);
        if(this.RandomNumber(2) == 1) this.GenerateConnection(C, Quarter, Quarter + 1, Quarter, C.Dimensions.Y - Quarter - 2, Radius);
        if(this.RandomNumber(2) == 1) this.GenerateConnection(C, C.Dimensions.X - Quarter, Quarter + 1, C.Dimensions.X - Quarter, C.Dimensions.Y - Quarter - 2, Radius);
    }
    protected GenerateConnection(C:Chunk, StartX:number, StartY:number, EndX:number, EndY:number, Radius:number)
    {
        // Virtual
        let Half = Math.floor(Radius / 2);
        if(StartX == EndX)
        {
            for(let i = StartY; i < EndY; i++)
            {
                for(let j = -Half; j <= Half; j++)
                {
                    C.Fields[i][StartX + j] = 4;
                }
            }
        }
        else if(StartY == EndY)
        {
            for(let i = StartX; i < EndX; i++)
            {
                for(let j = -Half; j <= Half; j++)
                {
                    C.Fields[StartY + j][i] = 4;
                }
            }
        }
    }
}