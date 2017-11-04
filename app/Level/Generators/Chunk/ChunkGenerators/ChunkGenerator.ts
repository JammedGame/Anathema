export { ChunkGenerator }

import { Chunk } from "./../Chunk";

class ChunkGenerator
{
    protected _ID:string;
    public get ID():string { return this._ID; }
    public constructor()
    {
        this._ID = "Basic";
    }
    public Generate(C:Chunk) : void
    {
        // Virtual
        this.GenerateBorders(C);
    }
    protected GenerateBorders(C:Chunk) : void
    {
        // Virtual
        for(let i = 0; i < C.Dimensions.Y; i++) C.Fields[i][0] = 4;
        for(let i = 0; i < C.Dimensions.Y; i++) C.Fields[i][C.Dimensions.X - 1] = 4;
        for(let i = 0; i < C.Dimensions.X; i++) C.Fields[0][i] = 4;
        for(let i = 0; i < C.Dimensions.X; i++) C.Fields[C.Dimensions.Y - 1][i] = 4;
    }
    protected RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}