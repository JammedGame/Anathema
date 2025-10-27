import * as TBX from 'toybox-engine';

import { Chunk } from "./Chunk/Chunk";
import Level from "../Levels/Level";
import { GameScene } from "./../../GameScene";
import LevelTileset from '../Tilesets/LevelTileset';
import Layout, { LayoutClass, LayoutEntry } from "../Levels/Layout";
import ColliderGenerator from './ColliderGenerator';
import LevelContentGenerator from './LevelContentGenerator';
import { GlobalChunkGenerator } from "./Chunk/GlobalChunkGenerator";
import EnvironmentGenerator from './Environment/EnvironmentGenerator';
import { LevelTilesetCeilingType } from '../Tilesets/LevelTilesetBlueprint';

class LevelGenerator {
    private static _ChunkGenerator: GlobalChunkGenerator;

    public static generate(scene: GameScene, level: Level): void {
        if (!LevelGenerator._ChunkGenerator) LevelGenerator._ChunkGenerator = new GlobalChunkGenerator();
        LevelGenerator._ChunkGenerator.init(level.tileset.blueprint.settings.chunkTypes);

        level.layout = LevelGenerator.GenerateLayout(new TBX.Vertex(level.dimensions[0], level.dimensions[0], 0), [new LayoutClass(3, 5), new LayoutClass(2, 10), new LayoutClass(1, 1000)]);
        level.layout.megaChunk = LevelGenerator.GenerateMegaChunk(level.layout, level.tileset);
        level.accessMatrix = level.layout.megaChunk.AccessMatrix();

        EnvironmentGenerator.Generate(scene, level);
        ColliderGenerator.generate(scene, level, level.accessMatrix);
        LevelContentGenerator.generate(level, scene);
    }

    private static GenerateMegaChunk(layout: Layout, tileset: LevelTileset): Chunk {
        let megaChunk: Chunk = new Chunk(new TBX.Vertex(layout.dimensions.X * 11 - 1, layout.dimensions.Y * 11 - 1, 0), -1);
        for (let i = 0; i < layout.parts.length; i++) {
            let Index = Math.floor((Math.random() * 4));
            if (Index == 4) Index = 3;
            let NewChunk: Chunk = LevelGenerator._ChunkGenerator.generateRandom(new TBX.Vertex(layout.parts[i].size.X * 11 - 1, layout.parts[i].size.Y * 11 - 1, 0));
            layout.parts[i].Chunk = NewChunk;
            LevelGenerator._ChunkGenerator.insert(megaChunk, NewChunk, new TBX.Vertex(layout.parts[i].location.X * 11, layout.parts[i].location.Y * 11, 0));
        }
        LevelGenerator.ConnectMegaChunk(megaChunk, layout);
        LevelGenerator._ChunkGenerator.fakeIsometric(megaChunk, tileset.wallVoid);
        if (tileset.settings.ceiling == LevelTilesetCeilingType.Roofed) LevelGenerator._ChunkGenerator.fakeRoof(megaChunk);
        return megaChunk;
    }

    private static CalculateLocation(E1: LayoutEntry, E2: LayoutEntry): any {
        let Location = new TBX.Vertex(0, 0, 0);
        Location.Y = E1.location.Y * 11;
        if (E2.location.Y > E1.location.Y) Location.Y = E2.location.Y * 11;
        Location.X = E1.location.X * 11;
        if (E1.location.X < E2.location.X) Location.X = E2.location.X * 11;
        return Location;
    }

    private static ConnectMegaChunk(MC: Chunk, L: Layout) {
        for (let i = 0; i < L.parts.length; i++) {
            for (let j = 0; j < L.parts[i].Connections.length; j++) {
                if (L.parts[i].ConnectionsSide[j] == 1) {
                    LevelGenerator._ChunkGenerator.connectParts(MC, LevelGenerator.CalculateLocation(L.parts[i], L.parts[i].Connections[j]), "vertical", 10);
                }
                else if (L.parts[i].ConnectionsSide[j] == 2) {
                    LevelGenerator._ChunkGenerator.connectParts(MC, LevelGenerator.CalculateLocation(L.parts[i], L.parts[i].Connections[j]), "horizontal", 10);
                }
            }
        }
    }

    private static GenerateLayout(Dimensions: any, LayoutClasses: LayoutClass[]): Layout {
        let L = new Layout(Dimensions, -1);
        // For each element of each class
        for (let i = 0; i < LayoutClasses.length; i++) {
            for (let j = 0; j < LayoutClasses[i].Number; j++) {
                // Going through Layout Matrix
                let Available: LayoutEntry[] = [];
                for (let k = 0; k < Dimensions.Y - LayoutClasses[i].Size + 1; k++) {
                    for (let l = 0; l < Dimensions.X - LayoutClasses[i].Size + 1; l++) {
                        // Checking fitting of entry by size
                        let EntryAvailable = true;
                        for (let m = 0; m < LayoutClasses[i].Size; m++) {
                            for (let n = 0; n < LayoutClasses[i].Size; n++) {
                                if (L.data[k + m][l + n] != -1) {
                                    EntryAvailable = false;
                                    break;
                                }
                            }
                            if (!EntryAvailable) break;
                        }
                        if (EntryAvailable) Available.push(new LayoutEntry(LayoutClasses[i].Size, new TBX.Vertex(l, k, 0)));
                    }
                }
                if (Available.length > 0) {
                    let Chosen = Math.floor((Math.random() * Available.length));
                    if (Chosen == Available.length) Chosen = Available.length - 1;
                    L.parts.push(Available[Chosen]);
                    for (let m = 0; m < LayoutClasses[i].Size; m++) {
                        for (let n = 0; n < LayoutClasses[i].Size; n++) {
                            L.data[Available[Chosen].location.Y + m][Available[Chosen].location.X + n] = LayoutClasses[i].Size;
                        }
                    }
                }
                else break;
            }
        }
        LevelGenerator.FindConnections(L);
        return L;
    }

    private static FindConnections(L: Layout) {
        for (let i = 0; i < L.parts.length; i++) {
            for (let j = 0; j < L.parts.length; j++) {
                let Con = LevelGenerator.CheckConnection(L.parts[i], L.parts[j]);
                if (Con != -1) {
                    if (L.parts[i].Connections.indexOf(L.parts[j]) == -1 && L.parts[j].Connections.indexOf(L.parts[i]) == -1) {
                        L.parts[i].Connections.push(L.parts[j]);
                        L.parts[i].ConnectionsSide.push(Con);
                    }
                }
            }
        }
        LevelGenerator.CullConnections(L.parts[0], [L.parts[0]]);
    }

    private static CullConnections(E: LayoutEntry, F: LayoutEntry[]) {
        for (let i = E.Connections.length - 1; i >= 0; i--) {
            if (E.Connections.length > 1 && F.indexOf(E.Connections[i]) != -1) {
                E.Connections.splice(i, 1);
                E.ConnectionsSide.splice(i, 1);
            }
            else {
                F.push(E.Connections[i]);
                LevelGenerator.CullConnections(E.Connections[i], F);
            }
        }
    }

    private static CheckConnection(E1: LayoutEntry, E2: LayoutEntry): number {
        if (E1 == E2) return -1;
        let Connected = -1;
        if (E2.size.X > E1.size.X) {
            let E = E1;
            E1 = E2;
            E2 = E;
        }
        if (E1.location.X == E2.location.X + E2.size.X) {
            if (E2.location.Y >= E1.location.Y && E2.location.Y < E1.location.Y + E1.size.Y) Connected = 1;
            if (E2.location.Y + E2.size.Y >= E1.location.Y && E2.location.Y + E2.size.Y < E1.location.Y + E1.size.Y) Connected = 1;
        }
        if (E1.location.X + E1.size.X == E2.location.X) {
            if (E2.location.Y >= E1.location.Y && E2.location.Y < E1.location.Y + E1.size.Y) Connected = 1;
            if (E2.location.Y + E2.size.Y >= E1.location.Y && E2.location.Y + E2.size.Y < E1.location.Y + E1.size.Y) Connected = 1;
        }
        if (E1.location.Y == E2.location.Y + E2.size.Y) {
            if (E2.location.X >= E1.location.X && E2.location.X < E1.location.X + E1.size.X) Connected = 2;
            if (E2.location.X + E2.size.X >= E1.location.X && E2.location.X + E2.size.X < E1.location.X + E1.size.X) Connected = 2;
        }
        if (E1.location.Y + E1.size.Y == E2.location.Y) {
            if (E2.location.X >= E1.location.X && E2.location.X < E1.location.X + E1.size.X) Connected = 2;
            if (E2.location.X + E2.size.X >= E1.location.X && E2.location.X + E2.size.X < E1.location.X + E1.size.X) Connected = 2;
        }
        return Connected;
    }

    private static RandomNumber(Size: number) {
        return Math.floor((Math.random() * Size));
    }
}

export default LevelGenerator;
