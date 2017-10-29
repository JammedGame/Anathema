export { LevelGenerator }

import Engineer from "./../../Engineer";

import { Chunk, ChunkGenerator } from "./ChunkGenerator";
import { ColliderGenerator } from "./ColliderGenerator";
import { LevelContentGenerator } from "./LevelContentGenerator";
import { GameScene } from "./../../GameScene";
import { Level } from "./../Level";
import { LevelTileset, LevelTilesetCeilingType, LevelTilesetLayoutType, LevelTilesetFloorType } from "./../Tilesets/LevelTileset"; 
import { LevelTilesetCeilingCalculation } from "./../Tilesets/LevelTilesetCeilingCalculation";
import { Layout, LayoutClass, LayoutEntry } from "./../Layout";

class LevelGenerator
{
    private static _FieldSize:number = 120;
    public static Generate(Scene:GameScene, Level:Level) : void
    {
        //let NewChunk:Chunk = ChunkGenerator.Generate(1, new Engineer.Math.Vertex(24,15,0));
        let L = LevelGenerator.GenerateLayout(new Engineer.Math.Vertex(5,5,0), [new LayoutClass(3,1), new LayoutClass(2,3), new LayoutClass(1,1000)]);
        Level.Layout = L;
        let NewChunk:Chunk = LevelGenerator.GenerateMegaChunk(L, Level.Tileset);
        Level.AccessMatrix = NewChunk.AccessMatrix();
        for(let i = 0; i < NewChunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < NewChunk.Dimensions.X; j++)
            {
                if(Level.Tileset.LayoutType == LevelTilesetLayoutType.Story && NewChunk.Fields[i][j] != 2)
                {
                    let Index = Math.floor((Math.random() * Level.Tileset.Floor.Images.length) + 1);
                    let Color = Engineer.Math.Color.FromRGBA(255,255,255,255);
                    if(NewChunk.Fields[i][j] == 0 || NewChunk.Fields[i][j] == -1) Color = Engineer.Math.Color.FromRGBA(180, 180, 180,255);
                    if(Level.Tileset.FloorType == LevelTilesetFloorType.Checkered)
                    {
                        if((j + i) % 2 == 0) LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.FloorSet1, Index, Color);
                        else LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.FloorSet2, Index, Color);
                    }
                    else LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.Floor, Index, Color);
                }
                if(NewChunk.Fields[i][j] == 1 && Level.Tileset.LayoutType != LevelTilesetLayoutType.Story)
                {
                    let Index = Math.floor((Math.random() * Level.Tileset.Floor.Images.length) + 1);
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.Floor, Index, Engineer.Math.Color.FromRGBA(255,255,255,255));
                }
                else if(NewChunk.Fields[i][j] == 2)
                {
                    
                }
                else if(NewChunk.Fields[i][j] == 3)
                {
                    let WallIndex = Math.floor((Math.random() * Level.Tileset.WallLower.Images.length) + 1);
                    LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i,0), Level.Tileset.WallUpper, WallIndex, Engineer.Math.Color.FromRGBA(255,255,255,255));
                    ColliderGenerator.GenerateColliderTile(Scene,j,i,1,1);
                    if(i + 1 < NewChunk.Dimensions.Y && NewChunk.Fields[i + 1][j] == 2)
                    {
                        let FloorIndex = Math.floor((Math.random() * Level.Tileset.Floor.Images.length) + 1);
                        LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i+1,0), Level.Tileset.Floor, FloorIndex, Engineer.Math.Color.FromRGBA(255,255,255,255));
                        LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(j,i+1,0), Level.Tileset.WallLower, WallIndex, Engineer.Math.Color.FromRGBA(255,255,255,255));
                    }
                }
                else if(NewChunk.Fields[i][j] == 4)
                {
                    LevelGenerator.GenerateCeilingTile(Scene, Level.Tileset, NewChunk, j, i);
                }
            }
        }
        console.log(Scene);
        LevelContentGenerator.Generate(Level, Scene, Scene.Data["Player"]);
    }
    private static GenerateCeilingTile(Scene:GameScene, Tilesets:LevelTileset, C:Chunk, X:number, Y:number) : void
    {
        if(Tilesets.CeilingType == LevelTilesetCeilingType.Bordered) this.GenerateBorderedCeilingTile(Scene, Tilesets, C, X, Y);
        else if(Tilesets.CeilingType == LevelTilesetCeilingType.Crested) this.GenerateCrestedCeilingTile(Scene, Tilesets, C, X, Y);
        else
        {
            LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X+1,Y+1,0), Tilesets.Ceiling, 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
            ColliderGenerator.GenerateColliderTile(Scene,X+1,Y+1,1,1);
        }
    }
    private static GenerateBorderedCeilingTile(Scene:GameScene, Tilesets:LevelTileset, C:Chunk, X:number, Y:number) : void
    {
        let Up = Y >= 1 && C.Fields[Y - 1][X] == 4;
        let Down = Y + 1 < C.Dimensions.Y && C.Fields[Y + 1][X] == 4;
        let Left = X >= 1 && C.Fields[Y][X - 1] == 4;
        let Right = X + 1 < C.Dimensions.X && C.Fields[Y][X + 1] == 4;
        let Index = LevelTilesetCeilingCalculation.CalculateBordered(Up,Down,Left,Right);
        LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X,Y,0), Tilesets.Ceiling, Index - 1, Engineer.Math.Color.FromRGBA(255,255,255,255));
        ColliderGenerator.GenerateColliderTile(Scene,X,Y,1,1);
    }
    private static GenerateCrestedCeilingTile(Scene:GameScene, Tilesets:LevelTileset, C:Chunk, X:number, Y:number) : void
    {
        let WM = [];
        for(let i = 0; i < 9; i++) WM.push(0);
        if(X >= 1 && Y >= 1) WM[0] =  C.Fields[Y - 1][X - 1];
        if(Y >= 1) WM[1] =  C.Fields[Y - 1][X];
        if(X + 1 < C.Dimensions.X && Y >= 1) WM[2] =  C.Fields[Y - 1][X + 1];
        if(X >= 1) WM[3] =  C.Fields[Y][X - 1];
        WM[4] =  C.Fields[Y][X];
        if(X + 1 < C.Dimensions.X) WM[5] =  C.Fields[Y][X + 1];
        if(X >= 1 && Y + 1 < C.Dimensions.Y) WM[6] =  C.Fields[Y + 1][X - 1];
        if(Y + 1 < C.Dimensions.Y) WM[7] =  C.Fields[Y + 1][X];
        if(X + 1 < C.Dimensions.X && Y + 1 < C.Dimensions.Y) WM[8] =  C.Fields[Y + 1][X + 1];
        let Index = LevelTilesetCeilingCalculation.CalculateCrested(WM);
        LevelGenerator.GenerateTile(Scene, new Engineer.Math.Vertex(X,Y,0), Tilesets.Ceiling, Index - 1, Engineer.Math.Color.FromRGBA(255,255,255,255));
        ColliderGenerator.GenerateColliderTile(Scene,X,Y,1,1);
    }
    private static GenerateMegaChunk(L:Layout, Tilesets:LevelTileset) : Chunk
    {
        let MC:Chunk = new Chunk(new Engineer.Math.Vertex(L.Dimensions.X * 11 - 1, L.Dimensions.Y * 11 - 1), -1);
        for(let i = 0; i < L.Entries.length; i++)
        {
            let Index = Math.floor((Math.random() * 4));
            if(Index == 4) Index = 3;
            let NewChunk:Chunk = ChunkGenerator.GenerateWOFake(Index, new Engineer.Math.Vertex(L.Entries[i].Size * 11 - 1, L.Entries[i].Size * 11 - 1, 0));
            L.Entries[i].Chunk = NewChunk;
            ChunkGenerator.Insert(MC, NewChunk, new Engineer.Math.Vertex(L.Entries[i].Location.X * 11, L.Entries[i].Location.Y * 11, 0));
        }
        LevelGenerator.ConnectMegaChunk(MC, L);
        ChunkGenerator.FakeIsometric(MC, Tilesets.LayoutType != LevelTilesetLayoutType.Story);
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
            if(E.Connections.length > 1 && F.indexOf(E.Connections[i]) != -1)
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
