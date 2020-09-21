export { ColliderGenerator }

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Level } from "./../Level";

class ColliderGenerator
{
    private static FieldSize:number = 120;
    public static Generate(Scene:GameScene, Level:Level, Access:number[][]) : void
    {
       ColliderGenerator.GenerateColliders(Scene, Level.Layout.Chunk.Dimensions, Access);
    }
    private static GenerateColliders(Scene:GameScene, Dimensions:any, Access:number[][])
    {
        for (let i = 0; i < Dimensions.Y; i++)
        {
            for (let j = 0; j < Dimensions.X; j++)
            {
                if(Access[i][j] == 0) ColliderGenerator.GenerateColliderTile(Scene, j, i, ColliderGenerator.FieldSize);
            }
        }
    }
    private static GenerateColliderTile(Scene:GameScene, X:number, Y:number, Size:number)
    {
        let NewTile:any = new Engineer.Tile();
        NewTile.Data["Solid"] = true;
        NewTile.Collision.Active = true;
        NewTile.Collision.Type = Engineer.CollisionType.Rectangular;
        NewTile.Trans.Translation = new Engineer.Vertex(X * ColliderGenerator.FieldSize, Y * ColliderGenerator.FieldSize * 0.8, 0);
        NewTile.Trans.Scale = new Engineer.Vertex(ColliderGenerator.FieldSize, ColliderGenerator.FieldSize * 0.8, 1);
        NewTile.Active = false;
        NewTile.Paint = Engineer.Color.FromRGBA(0,255,0,120);
        Scene.Attach(NewTile);
    }
}