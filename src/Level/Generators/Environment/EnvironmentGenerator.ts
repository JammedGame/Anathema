import * as TBX from 'toybox-engine';

import Level from "../../Levels/Level";
import { Chunk } from "../Chunk/Chunk";
import { GameScene } from "../../../GameScene";
import EnvironmentWallGenerator from "./EnvironmentWallGenerator";
import EnvironmentFloorGenerator from "./EnvironmentFloorGenerator";
import EnvironmentCeilingGenerator from "./EnvironmentCeilingGenerator";
import { LevelTilesetFillType } from '../../Tilesets/LevelTilesetBlueprint';

enum EnvironmentClass {
    None = 0,
    Floor = 1,
    WallLower = 2,
    WallUpper = 3,
    Ceiling = 4
}

class EnvironmentGenerator {
    private static _FieldSize: number = 120;

    public static Generate(Scene: GameScene, level: Level): void {
        let ArtIndices = new Chunk(level.layout.megaChunk.Dimensions, -1);
        EnvironmentFloorGenerator.Generate(level, ArtIndices);
        EnvironmentWallGenerator.Generate(level, ArtIndices);
        EnvironmentCeilingGenerator.Generate(level, ArtIndices);
        EnvironmentGenerator.GenerateTiles(Scene, level, ArtIndices);
    }

    private static GenerateTiles(Scene: GameScene, level: Level, Art: Chunk) {
        let C: Chunk = level.layout.megaChunk;
        for (let i = 0; i < C.Dimensions.Y; i++) {
            for (let j = 0; j < C.Dimensions.X; j++) {
                if (Art.Fields[i][j] == -1) continue;
                if (C.Fields[i][j] == EnvironmentClass.Floor) {
                    EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.floor, Art.Fields[i][j], TBX.Color.White);
                }
                else if (C.Fields[i][j] == EnvironmentClass.WallLower) {
                    EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.floor, 0, TBX.Color.White);
                    EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.wallLower, Art.Fields[i][j], TBX.Color.White);
                }
                else if (C.Fields[i][j] == EnvironmentClass.WallUpper) {
                    EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.wallUpper, Art.Fields[i][j], TBX.Color.White);
                }
                else if (C.Fields[i][j] == EnvironmentClass.Ceiling) {
                    if (i - 1 >= 0 && C.Fields[i - 1][j] == EnvironmentClass.Floor) EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.floor, 0, TBX.Color.White);
                    EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.ceiling, Art.Fields[i][j], TBX.Color.White);
                }
                else if (level.tileset.settings.fill != LevelTilesetFillType.None) {
                    if (level.tileset.settings.fill == LevelTilesetFillType.Ceiling) EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.ceiling, Art.Fields[i][j], TBX.Color.White);
                    else if (level.tileset.settings.fill == LevelTilesetFillType.Floor) EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.floor, Art.Fields[i][j], TBX.Color.FromRGBA(180, 180, 180, 255));
                    else if (level.tileset.settings.fill == LevelTilesetFillType.Separate) EnvironmentGenerator.GenerateTile(Scene, new TBX.Vertex(j, i, 0), level.tileset.collections.separate, Art.Fields[i][j], TBX.Color.FromRGBA(180, 180, 180, 255));
                }
            }
        }
    }

    private static GenerateTile(Scene: GameScene, Location: any, Tileset: any, Index: number, Color: any): any {
        let NewTile: any = new TBX.Tile();
        NewTile.Name = "Tile(" + Location.X + "," + Location.Y + ")";
        NewTile.Collection = Tileset;
        NewTile.Material.Type = TBX.MaterialType.Lit;
        NewTile.AmbientColor = TBX.Color.FromRGBA(1, 1, 1, 255);
        NewTile.Index = Index;
        NewTile.Paint = Color;
        NewTile.Trans.Scale = new TBX.Vertex(EnvironmentGenerator._FieldSize, EnvironmentGenerator._FieldSize * 0.8, 1);
        NewTile.Trans.Translation = new TBX.Vertex(EnvironmentGenerator._FieldSize * Location.X, EnvironmentGenerator._FieldSize * 0.8 * Location.Y, Location.Y * 0.001);
        Scene.Attach(NewTile);
    }

    private static RandomNumber(Size: number) {
        return Math.floor((Math.random() * Size));
    }
}

export default EnvironmentGenerator;
