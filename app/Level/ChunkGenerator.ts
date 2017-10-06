export { ChunkGenerator, Chunk }

import Engineer from "./../Engineer";

class ChunkGenerator
{
    public static Generate(Type:number, Dimensions:any) : Chunk
    {
        let NewChunk:Chunk = new Chunk(Dimensions, 1);
        if(Type == 0) ChunkGenerator.GenerateType0(NewChunk);
        return NewChunk;
    }
    private static GenerateType0(NewChunk:Chunk) : void
    {
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[i][0] = 3;
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[i][NewChunk.Dimensions.Y - 1] = 3;
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[0][i] = 3;
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[NewChunk.Dimensions.Y - 1][i] = 3;
    }
    private static FakeIsometric(NewChunk:Chunk)
    {
        for(let i = 0; i < NewChunk.Dimensions.Y - 1; i++)
        {
            let ToFake = false;
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 3 && NewChunk.Fields[i+1][j] == 1) ToFake = true;
            }
            if(ToFake)
            {
                NewChunk.Fields.splice(i+1, 0, []);
                for(let j = 0; j < NewChunk.Dimensions.X; j++)
                {
                    if(NewChunk.Fields[i][j] == 3 && NewChunk.Fields[i+2][j] == 1) NewChunk.Fields[i+1].push(2);
                    else NewChunk.Fields[i+1].push(1);
                }
                i++;
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
        for(let i = 0; i < Dimensions.Y; i++)
        {
            this.Fields.push([]);
            for(let j = 0; j < Dimensions.X; j++)
            {
                this.Fields[i].push(Value);
            }
        }
    }
}