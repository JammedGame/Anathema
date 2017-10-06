export {Character};

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class Character extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;

    public constructor(Scene:GameScene)
    {
        super();        
        this.Name = "Character";
        this._Scene=Scene;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(400,400,0);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null,"WalkN"), new Engineer.Engine.SpriteSet(null,"WalkE"), new Engineer.Engine.SpriteSet(null,"WalkS"), new Engineer.Engine.SpriteSet(null,"WalkW")];
        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets[0].Sprites = ["/build/resources/wizard00.png","/build/resources/wizard01.png","/build/resources/wizard03.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/wizard03.png","/build/resources/wizard04.png","/build/resources/wizard05.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/wizard06.png","/build/resources/wizard07.png","/build/resources/wizard08.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/wizard09.png","/build/resources/wizard10.png","/build/resources/wizard11.png"];
        this.SpriteSets[0].Seed = 25;
        this.SpriteSets[1].Seed = 25;
        this.SpriteSets[2].Seed = 25;
        this.SpriteSets[3].Seed = 25;
        this.Data["Character"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.AddSceneObject(this);
    }
}