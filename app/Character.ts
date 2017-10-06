export {Character};

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class Character extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;

    public constructor(Scene:GameScene){
        super();        
        this.Name = "Character";
        this._Scene=Scene;
        this.Trans.Scale = new Engineer.Math.Vertex(50, 50, 0);
        let SpriteSet:any = new Engineer.Engine.SpriteSet(null,"Default");
        SpriteSet.Sprites = [];
        this.SpriteSets = [SpriteSet];
        this.SpriteSets[0].Sprites.push("/build/resources/wizard00.png","/build/resources/wizard01.png","/build/resources/wizard02.png");
        this.SpriteSets[1].Sprites.push("/build/resources/wizard03.png","/build/resources/wizard04.png","/build/resources/wizard05.png");
        this.SpriteSets[2].Sprites.push("/build/resources/wizard06.png","/build/resources/wizard07.png","/build/resources/wizard08.png");
        this.SpriteSets[3].Sprites.push("/build/resources/wizard09.png","/build/resources/wizard10.png","/build/resources/wizard11.png");
        this.Data["Character"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
    }
}