export { GlobalChunkGenerator, Chunk }

import Engineer from "./../../../Engineer";

import { Chunk } from "./Chunk";
import { ChunkGenerator } from "./ChunkGenerators/ChunkGenerator";
import { GeneratorTypesImporter } from "./ChunkGenerators/GeneratorTypesImporter";

class GlobalChunkGenerator
{
    private _Available:ChunkGenerator[];
    private _Data: { [key: string]:any; };
    public constructor()
    {
        this._Available = [];
        this._Data = {};
        GeneratorTypesImporter.Import(this);
    }
    public Init(Available:string[]):void
    {
        this._Available = [];
        for(let i = 0; i < Available.length; i++)
        {
            this._Available.push(this._Data[Available[i]]);
        }
    }
    public Generate(Generator:ChunkGenerator, Dimensions:any) : Chunk
    {
        let NewChunk:Chunk = new Chunk(Dimensions, 1);
        Generator.Generate(NewChunk);
        return NewChunk;
    }
    public GenerateRandom(Dimensions:any) : Chunk
    {
        console.log(this._Available);
        let Index = this.RandomNumber(this._Available.length);
        return this.Generate(this._Available[Index], Dimensions)
    }
    public AddChunkGenerator(CG:ChunkGenerator)
    {
        this._Data[CG.ID] = CG;
    }
    public FakeIsometric(NewChunk:Chunk, WallVoid:boolean) : void
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
    public FakeRoof(NewChunk:Chunk) : void
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
    public Insert(Target:Chunk, Insertion:Chunk, Location:any) : void
    {
        for(let i = 0; i < Insertion.Dimensions.Y; i++)
        {
            for(let j = 0; j < Insertion.Dimensions.X; j++)
            {
                Target.Fields[Location.Y + i][Location.X + j] = Insertion.Fields[i][j];
            }
        }
    }
    public ConnectParts(C:Chunk, Location:any, Type:string, Length:number) : void
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
    private RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}
