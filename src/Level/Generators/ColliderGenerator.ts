import * as TBX from 'toybox-engine';

import Level from "../Levels/Level";
import { GameScene } from "../../GameScene";

class ColliderGenerator {
    private static FieldSize: number = 120;

    public static generate(scene: GameScene, level: Level, access: number[][]): void {
        ColliderGenerator.generateColliders(scene, level.layout.megaChunk.Dimensions, access);
    }

    private static generateColliders(scene: GameScene, dimensions: TBX.Vertex, access: number[][]) {
        for (let i = 0; i < dimensions.Y; i++) {
            for (let j = 0; j < dimensions.X; j++) {
                if (access[i][j] == 0) ColliderGenerator.generateColliderTile(scene, j, i);
            }
        }
    }

    private static generateColliderTile(scene: GameScene, x: number, y: number) {
        let NewTile: any = new TBX.Tile();
        NewTile.Data["Solid"] = true;
        NewTile.Collision.Active = true;
        NewTile.Collision.Type = TBX.CollisionType.Rectangular;
        NewTile.Trans.Translation = new TBX.Vertex(x * ColliderGenerator.FieldSize, y * ColliderGenerator.FieldSize * 0.8, 0);
        NewTile.Trans.Scale = new TBX.Vertex(ColliderGenerator.FieldSize, ColliderGenerator.FieldSize * 0.8, 1);
        NewTile.Active = false;
        NewTile.Paint = TBX.Color.FromRGBA(0, 255, 0, 120);
        scene.Attach(NewTile);
    }
}

export default ColliderGenerator;
