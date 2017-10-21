export { HealthBorder };

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class HealthBorder extends Engineer.Engine.Sprite {
    private _Scene: GameScene;

    public constructor(Scene: GameScene, maxHP: number, XPosition: number) {
        super();
        this.Name = "HealthBorder";
        this._Scene = Scene;
        this.Fixed = true;
        this.Trans.Scale = new Engineer.Math.Vertex(maxHP, 300, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(XPosition, 216, 1);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "HealthBorder")];
        this.SpriteSets[0].Sprites = ["/build/resources/HealthBorder.png"];
        this._Scene.AddSceneObject(this);
    }
}

