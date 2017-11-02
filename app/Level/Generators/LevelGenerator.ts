export { LevelGenerator }

import Engineer from "./../../Engineer";

import { Chunk, ChunkGenerator } from "./ChunkGenerator";
import { ColliderGenerator } from "./ColliderGenerator";
import { LevelContentGenerator } from "./LevelContentGenerator";
import { GameScene } from "./../../GameScene";
import { Level } from "./../Level";
import { LevelTileset, LevelTilesetCeilingType, LevelTilesetLayoutType, LevelTilesetWallType, LevelTilesetFloorType, LevelTilesetFillType } from "./../Tilesets/LevelTileset";
import { Layout, LayoutClass, LayoutEntry } from "./../Layout";
import { EnvironmentGenerator } from "./Environment/EnvironmentGenerator";

class LevelGenerator
{
    private static _FieldSize:number = 120;
    public static Generate(Scene:GameScene, Level:Level) : void
    {
        Level.Layout = LevelGenerator.GenerateLayout(new Engineer.Math.Vertex(5,5,0), [new LayoutClass(3,1), new LayoutClass(2,3), new LayoutClass(1,1000)]);
        Level.Layout.Chunk = LevelGenerator.GenerateMegaChunk(Level.Layout, Level.Tileset);
        Level.AccessMatrix = Level.Layout.Chunk.AccessMatrix();
        EnvironmentGenerator.Generate(Scene, Level);
        LevelContentGenerator.Generate(Level, Scene, Scene.Data["Player"]);
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
        ChunkGenerator.FakeIsometric(MC, Tilesets.LayoutType != LevelTilesetLayoutType.Story && Tilesets.FillType == LevelTilesetFillType.None);
        if(Tilesets.CeilingType == LevelTilesetCeilingType.Roofed) ChunkGenerator.FakeRoof(MC);
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
    private static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
}
