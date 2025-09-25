import Level from "../../Levels/Level";
import { Chunk } from "./../Chunk/Chunk";
import { LevelTilesetFillType, LevelTilesetFloorType } from '../../Tilesets/LevelTilesetBlueprint';

class EnvironmentFloorGenerator {
    public static Generate(level: Level, Art: Chunk): void {
        let C: Chunk = level.layout.megaChunk;
        for (let i = 0; i < C.Dimensions.Y; i++) {
            for (let j = 0; j < C.Dimensions.X; j++) {
                if (C.Fields[i][j] == 1 || ((C.Fields[i][j] == 0 || C.Fields[i][j] == -1) && level.tileset.settings.fill == LevelTilesetFillType.Floor)) {
                    Art.Fields[i][j] = EnvironmentFloorGenerator.GenerateFloor(level, C, j, i);
                }
                else if ((C.Fields[i][j] == 0 || C.Fields[i][j] == -1) && level.tileset.settings.fill == LevelTilesetFillType.Separate) {
                    Art.Fields[i][j] = EnvironmentFloorGenerator.GenerateSeparateUniform(level);
                }
            }
        }
    }

    private static GenerateFloor(level: Level, C: Chunk, X: number, Y: number): number {
        if (level.tileset.settings.floor == LevelTilesetFloorType.Uniform) return EnvironmentFloorGenerator.GenerateUniform(level);
        if (level.tileset.settings.floor == LevelTilesetFloorType.Checkered) return EnvironmentFloorGenerator.GenerateCheckered(level, X, Y);
        return -1;
    }

    private static GenerateCheckered(level: Level, X: number, Y: number): number {
        let Set2: boolean = (X + Y) % 2 == 0;
        if (Set2) return level.tileset.collections.floor.Images.length / 2 + EnvironmentFloorGeneratorCalculations.RandomNumber(level.tileset.collections.floor.Images.length / 2);
        return EnvironmentFloorGeneratorCalculations.RandomNumber(level.tileset.collections.floor.Images.length / 2);
    }

    private static GenerateUniform(level: Level): number {
        return EnvironmentFloorGeneratorCalculations.RandomNumber(level.tileset.collections.floor.Images.length);
    }

    private static GenerateSeparateUniform(level: Level): number {
        return EnvironmentFloorGeneratorCalculations.RandomNumber(level.tileset.collections.floor.Images.length);
    }
}

class EnvironmentFloorGeneratorCalculations {
    public static RandomNumber(Size: number) {
        return Math.floor((Math.random() * Size));
    }
}

export default EnvironmentFloorGenerator;
