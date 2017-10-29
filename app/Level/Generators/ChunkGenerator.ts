export { ChunkGenerator, Chunk }

import Engineer from "./../../Engineer";

class ChunkGenerator
{
    public static Generate(Type:number, Dimensions:any, WallVoid:boolean) : Chunk
    {
        let NewChunk:Chunk = new Chunk(Dimensions, 1);
        if(Type == 3) ChunkGenerator.GenerateType0(NewChunk);
        if(Type == 2) ChunkGenerator.GenerateType1(NewChunk);
        if(Type == 1) ChunkGenerator.GenerateType2(NewChunk);
        if(Type == 0) ChunkGenerator.GenerateType3(NewChunk);
        ChunkGenerator.FakeIsometric(NewChunk, WallVoid);
        return NewChunk;
    }
    public static GenerateWOFake(Type:number, Dimensions:any) : Chunk
    {
        let NewChunk:Chunk = new Chunk(Dimensions, 1);
        if(Type == 3) ChunkGenerator.GenerateType0(NewChunk);
        if(Type == 2) ChunkGenerator.GenerateType1(NewChunk);
        if(Type == 1) ChunkGenerator.GenerateType2(NewChunk);
        if(Type == 0) ChunkGenerator.GenerateType3(NewChunk);
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
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[i][0] = 4;
        for(let i = 0; i < NewChunk.Dimensions.Y; i++) NewChunk.Fields[i][NewChunk.Dimensions.X - 1] = 4;
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[0][i] = 4;
        for(let i = 0; i < NewChunk.Dimensions.X; i++) NewChunk.Fields[NewChunk.Dimensions.Y - 1][i] = 4;
        let Half = Math.ceil(NewChunk.Dimensions.X / 2);
        console.log(NewChunk);
        console.log("Half " + Half);
        if(NewChunk.Dimensions.X > 10)
        {
            let Radius = 2 + Math.floor(NewChunk.Dimensions.X / 10);
            for(let i = Half - Radius; i < Half + Radius; i++)
            {
                for(let j = Half - Radius; j < Half + Radius; j++)
                {
                    NewChunk.Fields[i][j] = 0;
                }
            }
            for(let i = Half - Radius; i <= Half + Radius; i++)
            {
                NewChunk.Fields[i][Half - Radius] = 4;
                NewChunk.Fields[Half - Radius][i] = 4;
                NewChunk.Fields[i][Half + Radius] = 4;
                NewChunk.Fields[Half + Radius][i] = 4;
            }
        }
    }
    private static GenerateType2(NewChunk:Chunk) : void
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
    private static GenerateType3(NewChunk:Chunk) : void
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
        for(let i = 6; i < NewChunk.Dimensions.Y - 6; i+=6)
        {
            for(let j = 5; j < NewChunk.Dimensions.X - 5; j+=5)
            {
                for(let k = 0; k < 2; k++)
                {
                    for(let l = 0; l < 2; l++)
                    {
                        NewChunk.Fields[i+k][j+l] = 4;
                    }
                }
            }
        }
    }
    public static FakeIsometric(NewChunk:Chunk, WallVoid:boolean) : void
    {
        for(let i = 0; i < NewChunk.Dimensions.Y - 1; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 4 && NewChunk.Fields[i+1][j] == 1)
                {
                    NewChunk.Fields[i+1][j] = 3;
                    if(i < NewChunk.Dimensions.Y - 2 && NewChunk.Fields[i+2][j] < 2) NewChunk.Fields[i+2][j] = 2;
                }
                else if(NewChunk.Fields[i][j] == 4 && (NewChunk.Fields[i+1][j] == 0 || NewChunk.Fields[i+1][j] == -1) && WallVoid)
                {
                    NewChunk.Fields[i+1][j] = 3;
                    if(i < NewChunk.Dimensions.Y - 2 && NewChunk.Fields[i+2][j] < 2) NewChunk.Fields[i+2][j] = 2;
                }
            }
        }
    }
    public static FakeRoof(NewChunk:Chunk) : void
    {
        for(let i = 0; i < NewChunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 4 || NewChunk.Fields[i][j] == 0 || NewChunk.Fields[i][j] == -1)
                {
                    //if(i > NewChunk.Dimensions.Y / 2) NewChunk.Fields[i][j] = 5;
                    //else
                    NewChunk.Fields[i][j] = 4;
                }
            }
        }
    }
    public static Insert(Target:Chunk, Insertion:Chunk, Location:any) : void
    {
        for(let i = 0; i < Insertion.Dimensions.Y; i++)
        {
            for(let j = 0; j < Insertion.Dimensions.X; j++)
            {
                Target.Fields[Location.Y + i][Location.X + j] = Insertion.Fields[i][j];
            }
        }
    }
    public static ConnectParts(C:Chunk, Location:any, Type:string, Length:number) : void
    {
        let X = Location.X;
        let Y = Location.Y;
        let InnerLength = Length / 2;
        if(Type == "horizontal")
        {
            let X2 = X + Length / 2;
            let Pattern = [4,1,1,1,1,4];
            for(let i = X2 - 3; i <= X2 + 2; i++)
            {
                for(let j = Y - 2; j <= Y; j++) C.Fields[j][i] = Pattern[i - X2 + 3];
            }
            
        }
        if(Type == "vertical")
        {
            let Y2 = Y + Length / 2;
            let Pattern = [4,1,1,1,1,1,4];
            for(let i = Y2 - 3; i <= Y2 + 3; i++)
            {
                for(let j = X - 2; j <= X; j++) C.Fields[i][j] = Pattern[i - Y2 + 3];
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
    }
    public AccessMatrix() : number[][]
    {
        let AccessMatrix:number[][];
        AccessMatrix = [];
        for(let i = 0; i < this.Dimensions.Y; i++)
        {
            AccessMatrix.push([]);
            for(let j = 0; j < this.Dimensions.X; j++)
            {
                if(this.Fields[i][j] == 1 || this.Fields[i][j] == 2) AccessMatrix[i].push(1);
                else AccessMatrix[i].push(0);
            }
        }
        return AccessMatrix;
    }
}