export { ChunkGenerator, Chunk }

import Engineer from "./../Engineer";

class ChunkGenerator
{
    public static Generate(Type:number, Dimensions:any) : Chunk
    {
        let NewChunk:Chunk = new Chunk(Dimensions, 1);
        if(Type == 0) ChunkGenerator.GenerateType0(NewChunk);
        if(Type == 1) ChunkGenerator.GenerateType1(NewChunk);
        ChunkGenerator.FakeIsometric(NewChunk);
        return NewChunk;
    }
    private static GenerateType0(NewChunk:Chunk) : void
    {
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[i][0] = 4;
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[i][NewChunk.Dimensions.X - 1] = 4;
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[0][i] = 4;
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[NewChunk.Dimensions.Y - 1][i] = 4;
    }
    private static GenerateType1(NewChunk:Chunk) : void
    {
        NewChunk.Fields[0][0] = 0;
        NewChunk.Fields[0][NewChunk.Dimensions.X - 1] = 0;
        NewChunk.Fields[NewChunk.Dimensions.Y - 1][NewChunk.Dimensions.X - 1] = 0;
        NewChunk.Fields[NewChunk.Dimensions.Y - 1][0] = 0;
        for(let i = 1; i < NewChunk.Dimensions.Y - 1; i++) NewChunk.Fields[i][0] = 4;
        for(let i = 1; i < NewChunk.Dimensions.Y - 1; i++) NewChunk.Fields[i][NewChunk.Dimensions.X - 1] = 4;
        for(let i = 1; i < NewChunk.Dimensions.X - 1; i++) NewChunk.Fields[0][i] = 4;
        for(let i = 1; i < NewChunk.Dimensions.X - 1; i++) NewChunk.Fields[NewChunk.Dimensions.Y - 1][i] = 4;
        NewChunk.Fields[1][1] = 4;
        NewChunk.Fields[1][NewChunk.Dimensions.X-2] = 4;
        NewChunk.Fields[NewChunk.Dimensions.Y-2][NewChunk.Dimensions.X-2] = 4;
        NewChunk.Fields[NewChunk.Dimensions.Y-2][1] = 4;
    }
    private static FakeIsometric(NewChunk:Chunk) : void
    {
        for(let i = 0; i < NewChunk.Dimensions.Y - 1; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 4 && NewChunk.Fields[i+1][j] < 2)
                {
                    NewChunk.Fields[i+1][j] = 3;
                    if(i < NewChunk.Dimensions.Y - 2 && NewChunk.Fields[i+2][j] < 2) NewChunk.Fields[i+2][j] = 2;
                }
            }
        }
    }
}
class Chunk
{
    public Dimensions:any;
    public Fields:number[][];
    public constructor(Dimensions:any, Value:number)
    {
        this.Dimensions = Dimensions;
        this.Fields = [];
        for(let i = 0; i < Dimensions.Y; i++)
        {
            this.Fields.push([]);
            for(let j = 0; j < Dimensions.X; j++)
            {
                this.Fields[i].push(Value);
            }
        }
        console.log(this.Fields);
    }
}