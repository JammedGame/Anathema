import Level from "../../Levels/Level";
import { Chunk } from "./../Chunk/Chunk";
import { LevelTilesetWallType } from "../../Tilesets/LevelTilesetBlueprint";

class EnvironmentWallGenerator {
    public static Generate(level: Level, Art: Chunk): void {
        let C: Chunk = level.layout.megaChunk;
        for (let i = 0; i < C.Dimensions.Y; i++) {
            for (let j = 0; j < C.Dimensions.X; j++) {
                if (C.Fields[i][j] == 3) {
                    Art.Fields[i][j] = EnvironmentWallGenerator.GenerateWall(level, C, j, i);
                    if (i + 1 < C.Dimensions.Y && C.Fields[i + 1][j] == 2) Art.Fields[i + 1][j] = Art.Fields[i][j];
                }
            }
        }
    }

    private static GenerateWall(level: Level, C: Chunk, X: number, Y: number): number {
        if (level.tileset.settings.wall == LevelTilesetWallType.Uniform) return EnvironmentWallGenerator.GenerateUniform(level);
        if (level.tileset.settings.wall == LevelTilesetWallType.Bordered) return EnvironmentWallGenerator.GenerateBordered(level, C, X, Y);
        return -1;
    }

    private static GenerateBordered(level: Level, C: Chunk, X: number, Y: number): number {
        let LeftBorder = (X - 1 >= 0 && C.Fields[Y][X - 1] == 1) || (Y + 1 < C.Dimensions.Y && X - 1 >= 0 && C.Fields[Y + 1][X - 1] == 1);
        let RightBorder = (X + 1 < C.Dimensions.X && C.Fields[Y][X + 1] == 1) || (Y + 1 < C.Dimensions.Y && X + 1 < C.Dimensions.X && C.Fields[Y + 1][X + 1] == 1);
        if (LeftBorder) return 0;
        if (RightBorder) return 1;
        return 2 + EnvironmentWallGeneratorCalculations.RandomNumber(level.tileset.collections.wallUpper.Images.length - 2);
    }

    private static GenerateUniform(level: Level): number {
        return EnvironmentWallGeneratorCalculations.RandomNumber(level.tileset.collections.wallUpper.Images.length);
    }
}

class EnvironmentWallGeneratorCalculations {
    public static RandomNumber(Size: number) {
        return Math.floor((Math.random() * Size));
    }
}

export default EnvironmentWallGenerator;
