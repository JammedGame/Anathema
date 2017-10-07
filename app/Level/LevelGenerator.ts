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
        //let NewChunk:Chunk = ChunkGenerator.Generate(1, new Engineer.Math.Vertex(24,15,0));
        let L = LevelGenerator.GenerateLayout(new Engineer.Math.Vertex(5,5,0), [new LayoutClass(3,1), new LayoutClass(2,3), new LayoutClass(1,1000)]);
        L.Print();
        let NewChunk:Chunk = LevelGenerator.GenerateMegaChunk(L);
        for(let i = 0; i < NewChunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(NewChunk.Fields[i][j] == 1)
                {
                    let Index = Math.floor((Math.random() * 16) + 1);
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
                    LevelGenerator.GenerateCeilingTile(Scene, Tilesets, NewChunk, j, i);
                }
            }
        }
    }
    private static GenerateCeilingTile(Scene:GameScene, Tilesets:LevelTileset, C:Chunk, X:number, Y:number) : void
    {
        let Horizontal = X >= 1 && X + 1 < C.Dimensions.X && C.Fields[Y][X - 1] == 4 && C.Fields[Y][X + 1] == 4;
        let Vertical = Y >= 1 && Y + 1 < C.Dimensions.Y && C.Fields[Y - 1][X] == 4 && C.Fields[Y + 1][X] == 4;
        if(Horizontal && Vertical)
        {
            LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X+1,Y+1,0), Tilesets.Ceiling, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            ColliderGenerator.GenerateColliderTile(Scene,X+1,Y+1,1,1);
        }
        else if (Horizontal)
        {
            LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X+1,Y+1,0), Tilesets.CeilingHorizontal, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            ColliderGenerator.GenerateColliderTile(Scene,X+1,Y+1,1,1);
        }
        else if (Vertical)
        {
            LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X+1,Y+1,0), Tilesets.CeilingVertical, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            ColliderGenerator.GenerateColliderTile(Scene,X+1,Y+1,1,1);
        }
        else
        {
            LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X+1,Y+1,0), Tilesets.Ceiling, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            ColliderGenerator.GenerateColliderTile(Scene,X+1,Y+1,1,1);
        }
    }
    private static GenerateMegaChunk(L:Layout) : Chunk
    {
        let MC:Chunk = new Chunk(new Engineer.Math.Vertex(L.Dimensions.X * 11 - 1, L.Dimensions.Y * 11 - 1), -1);
        for(let i = 0; i < L.Entries.length; i++)
        {
            let Index = Math.floor((Math.random() * 4));
            if(Index == 4) Index = 3;
            let NewChunk:Chunk = ChunkGenerator.GenerateWOFake(Index, new Engineer.Math.Vertex(L.Entries[i].Size * 11 - 1, L.Entries[i].Size * 11 - 1, 0));
            ChunkGenerator.Insert(MC, NewChunk, new Engineer.Math.Vertex(L.Entries[i].Location.X * 11, L.Entries[i].Location.Y * 11, 0));
        }
        LevelGenerator.ConnectMegaChunk(MC, L);
        ChunkGenerator.FakeIsometric(MC);
        return MC;
    }
    private static CalculateLocation(E1:LayoutEntry, E2:LayoutEntry) : any
    {
        let Location = new Engineer.Math.Vertex(0,0,0);
        Location.Y = E1.Location.Y * 11;
        if(E2.Location.Y > E1.Location.Y) Location.Y = E2.Location.Y * 11;
        Location.X = E1.Location.X * 11;
        if(E1.Location.X < E2.Location.X) Location.X = E2.Location.X * 11;
        return Location;
    }
    private static ConnectMegaChunk(MC:Chunk, L:Layout)
    {
        for(let i = 0; i < L.Entries.length; i++)
        {
            for(let j = 0; j < L.Entries[i].Connections.length; j++)
            {
                if(L.Entries[i].ConnectionsSide[j] == 1)
                {
                    ChunkGenerator.ConnectParts(MC, LevelGenerator.CalculateLocation(L.Entries[i], L.Entries[i].Connections[j]), "vertical", 10);
                }
                else if(L.Entries[i].ConnectionsSide[j] == 2)
                {
                    ChunkGenerator.ConnectParts(MC, LevelGenerator.CalculateLocation(L.Entries[i], L.Entries[i].Connections[j]), "horizontal", 10);
                }
            }
        }
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
        LevelGenerator.FindConnections(L);
        return L;
    }
    private static FindConnections(L:Layout)
    {
        for(let i = 0; i < L.Entries.length; i++)
        {
            for(let j = 0; j < L.Entries.length; j++)
            {
                let Con = LevelGenerator.CheckConnection(L.Entries[i], L.Entries[j]);
                if(Con != -1)
                {
                    if(L.Entries[i].Connections.indexOf(L.Entries[j]) == -1 && L.Entries[j].Connections.indexOf(L.Entries[i]) == -1)
                    {
                        L.Entries[i].Connections.push(L.Entries[j]);
                        L.Entries[i].ConnectionsSide.push(Con);
                    }
                }
            }
        }
        LevelGenerator.CullConnections(L.Entries[0], [L.Entries[0]]);
    }
    private static CullConnections(E:LayoutEntry, F:LayoutEntry[])
    {
        for(let i = E.Connections.length - 1; i >= 0; i--)
        {
            if(F.indexOf(E.Connections[i]) != -1)
            {
                E.Connections.splice(i, 1);
                E.ConnectionsSide.splice(i, 1);
            }
            else
            {
                F.push(E.Connections[i]);
                LevelGenerator.CullConnections(E.Connections[i], F);
            }
        }
    }
    private static CheckConnection(E1:LayoutEntry, E2:LayoutEntry) : number
    {
        if(E1 == E2) return -1;
        let Connected = -1;
        if(E2.Size > E1.Size)
        {
            let E = E1;
            E1 = E2;
            E2 = E;
        }
        if(E1.Location.X == E2.Location.X + E2.Size)
        {
            if(E2.Location.Y >= E1.Location.Y && E2.Location.Y < E1.Location.Y + E1.Size) Connected = 1;
            if(E2.Location.Y + E2.Size >= E1.Location.Y && E2.Location.Y + E2.Size < E1.Location.Y + E1.Size) Connected = 1;
        }
        if(E1.Location.X + E1.Size == E2.Location.X)
        {
            if(E2.Location.Y >= E1.Location.Y && E2.Location.Y < E1.Location.Y + E1.Size) Connected = 1;
            if(E2.Location.Y + E2.Size >= E1.Location.Y && E2.Location.Y + E2.Size < E1.Location.Y + E1.Size) Connected = 1;
        }
        if(E1.Location.Y == E2.Location.Y + E2.Size)
        {
            if(E2.Location.X >= E1.Location.X && E2.Location.X < E1.Location.X + E1.Size) Connected = 2;
            if(E2.Location.X + E2.Size >= E1.Location.X && E2.Location.X + E2.Size < E1.Location.X + E1.Size) Connected = 2;
        }
        if(E1.Location.Y + E1.Size == E2.Location.Y)
        {
            if(E2.Location.X >= E1.Location.X && E2.Location.X < E1.Location.X + E1.Size) Connected = 2;
            if(E2.Location.X + E2.Size >= E1.Location.X && E2.Location.X + E2.Size < E1.Location.X + E1.Size) Connected = 2;
        }
        return Connected;
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
    public CeilingHorizontal:any;
    public CeilingVertical:any;
    public constructor()
    {
        let FloorImages  = [];
        for(let i = 1; i < 16; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            FloorImages.push("/build/resources/ruin/g"+s+".png");
        }
        console.log(FloorImages);
        this.Floor = new Engineer.Engine.TileCollection(null, FloorImages);
        this.WallUpper = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/wu01.png"]);
        this.WallLower = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/wd01.png"]);
        this.Ceiling = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/cm01.png"]);
        this.CeilingHorizontal = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/ch01.png"]);
        this.CeilingVertical = new Engineer.Engine.TileCollection(null, ["/build/resources/ruin/cv01.png"]);
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
    public Connections:LayoutEntry[];
    public ConnectionsSide:number[];
    public constructor(Size:number, Location:any)
    {
        this.Size = Size;
        this.Location = Location;
        this.Connections = [];
        this.ConnectionsSide = [];
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