export { LevelGenerator, LevelTileset }

import Engineer from "./../Engineer";

import { Chunk, ChunkGenerator } from "./ChunkGenerator";
import { ColliderGenerator } from "./ColliderGenerator";
import { GameScene } from "./../GameScene";

class LevelGenerator
{
    private static _FieldSize:number = 80;
    public static Generate(Scene:GameScene, Tilesets:LevelTileset) : void
    {
        let NewChunk:Chunk = ChunkGenerator.Generate(1, new Engineer.Math.Vertex(24,15,0));
        let L = LevelGenerator.GenerateLayout(new Engineer.Math.Vertex(5,5,0), [new LayoutClass(3,1), new LayoutClass(2,3), new LayoutClass(1,1000)]);
        L.Print();
        //let NewChunk:Chunk = LevelGenerator.GenerateMegaChunk(L);
        for(let i = 0; i < NewChunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 1)
                {
                    let Index = Math.floor((Math.random() * 7) + 1);
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Floor, Index, Engineer.Math.Color.FromRGBA(255,255,255,255));
                }
                else if(NewChunk.Fields[i][j] == 2)
                {
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Floor, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.WallLower, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                }
                else if(NewChunk.Fields[i][j] == 3)
                {
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.WallUpper, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                    ColliderGenerator.GenerateColliderTile(Scene,j+1,i+1,1,1);
                }
                else if(NewChunk.Fields[i][j] == 4)
                {
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j+1,i+1,0), Tilesets.Ceiling, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
                    ColliderGenerator.GenerateColliderTile(Scene,j+1,i+1,1,1);
                }
            }
        }
        

    }
    private static GenerateMegaChunk(L:Layout) : Chunk
    {
        let MC:Chunk = new Chunk(new Engineer.Math.Vertex(L.Dimensions.X * 11 - 1, L.Dimensions.Y * 11 - 1), -1);
        for(let i = 0; i < L.Entries.length; i++)
        {
            let NewChunk:Chunk = ChunkGenerator.Generate(1, new Engineer.Math.Vertex(L.Entries[i].Size * 11 - 1, L.Entries[i].Size * 11 - 1, 0));
            ChunkGenerator.Insert(MC, NewChunk, new Engineer.Math.Vertex(L.Entries[i].Location.X * 11, L.Entries[i].Location.Y * 11, 0));
        }
        return MC;
    }
    private static GenerateLayout(Dimensions:any, LayoutClasses:LayoutClass[]) : Layout
    {
        let L = new Layout(Dimensions, -1);
        // For each element of each class
        for(let i = 0; i < LayoutClasses.length; i++)
        {
            for(let j = 0; j < LayoutClasses[i].Number; j++)
            {
                // Going through Layout Matrix
                let Available:LayoutEntry[] = [];
                for(let k = 0; k < Dimensions.Y - LayoutClasses[i].Size + 1; k++)
                {
                    for(let l = 0; l < Dimensions.X - LayoutClasses[i].Size + 1; l++)
                    {
                        // Checking fitting of entry by size
                        let EntryAvailable = true;
                        for(let m = 0; m < LayoutClasses[i].Size; m++)
                        {
                            for(let n = 0; n < LayoutClasses[i].Size; n++)
                            {
                                if(L.Data[k+m][l+n] != -1)
                                {
                                    EntryAvailable = false;
                                    break;
                                }
                            }   
                            if(!EntryAvailable) break;
                        }
                        if(EntryAvailable) Available.push(new LayoutEntry(LayoutClasses[i].Size, new Engineer.Math.Vertex(l,k,0)));
                    }   
                }
                if(Available.length > 0)
                {
                    let Chosen = Math.floor((Math.random() * Available.length));
                    if(Chosen == Available.length) Chosen = Available.length - 1;
                    L.Entries.push(Available[Chosen]);
                    for(let m = 0; m < LayoutClasses[i].Size; m++)
                    {
                        for(let n = 0; n < LayoutClasses[i].Size; n++)
                        {
                            L.Data[Available[Chosen].Location.Y + m][Available[Chosen].Location.X + n] = LayoutClasses[i].Size;
                        }   
                    }
                }
                else break;
            }
        }
        return L;
    }
    private static GenerateTile(Scene:GameScene, Location:any, Tileset:any, Index:number, Color:any) : any
    {
        let NewTile:any = new Engineer.Engine.Tile();
        NewTile.Name = "NewTile";
        NewTile.Collection = Tileset;
        NewTile.Index = Index;
        NewTile.Paint = Color;
        NewTile.Trans.Scale = new Engineer.Math.Vertex(LevelGenerator._FieldSize, LevelGenerator._FieldSize, 1);
        NewTile.Trans.Translation = new Engineer.Math.Vertex(LevelGenerator._FieldSize * Location.X, LevelGenerator._FieldSize * Location.Y, 0);
        Scene.AddSceneObject(NewTile);
    }
}
class LevelTileset
{
    public Floor:any;
    public WallUpper:any;
    public WallLower:any;
    public Ceiling:any;
    public constructor()
    {
        let FloorImages  = [];
        for(let i = 1; i < 7; i++) FloorImages.push("/build/resources/ruin/g0"+i+".png");
        this.Floor = new Engineer.Engine.TileCollection(null, FloorImages);
        this.WallUpper = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/wu01.png"]);
        this.WallLower = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/wd01.png"]);
        this.Ceiling = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/cm01.png"]);
    }
}
class Layout
{
    public Dimensions:any;
    public Data:number[][];
    public Entries:LayoutEntry[];
    public constructor(Dimensions:any, Value:number)
    {
        this.Dimensions = Dimensions;
        this.Data= [];
        for(let i = 0; i < Dimensions.Y; i++)
        {
            this.Data.push([]);
            for(let j = 0; j < Dimensions.X; j++)
            {
                this.Data[i].push(Value);
            }
        }
        this.Entries = [];
    }
    public Print()
    {
        console.log("- - -");
        for(let i = 0; i < this.Dimensions.Y; i++)
        {
            let Line:string = i.toString();
            if(Line.length < 2) Line = "0" + i;
            Line += ": ";
            for(let j = 0; j < this.Dimensions.X; j++)
            {
                if(this.Data[i][j] == -1) Line += "X, ";
                else Line += this.Data[i][j] + ", ";
            }
            console.log(Line);
        }
        console.log("- - -");
    }
}
class LayoutEntry
{
    public Size:number;
    public Location:any;
    public constructor(Size:number, Location:any)
    {
        this.Size = Size;
        this.Location = Location;
    }
}
class LayoutClass
{
    public Size:number;
    public Number:number;
    public constructor(Size:number, Number:number)
    {
        this.Size = Size;
        this.Number = Number;
    }
}