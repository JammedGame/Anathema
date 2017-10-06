export {Player, PlayerKeyPress};

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class Player extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;
    private _Collider:any;
    public get Collider():any { return this._Collider; }
    public constructor(Scene:GameScene)
    {
        super();
        this.Name = "Player";
        this._Scene=Scene;
        this.Fixed = true;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960,540,0);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null,"WalkN"), new Engineer.Engine.SpriteSet(null,"WalkE"), new Engineer.Engine.SpriteSet(null,"WalkS"), new Engineer.Engine.SpriteSet(null,"WalkW")];
        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets[0].Sprites = ["/build/resources/wizard00.png","/build/resources/wizard01.png","/build/resources/wizard03.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/wizard04.png","/build/resources/wizard05.png","/build/resources/wizard06.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/wizard07.png","/build/resources/wizard08.png","/build/resources/wizard09.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/wizard10.png","/build/resources/wizard11.png","/build/resources/wizard12.png"];
        this.SpriteSets[0].Seed = 25;
        this.SpriteSets[1].Seed = 25;
        this.SpriteSets[2].Seed = 25;
        this.SpriteSets[3].Seed = 25;
        this.Data["Player"] = true;
        this._Collider = new Engineer.Engine.Tile();
        this._Collider.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this._Collider.Trans.Translation = new Engineer.Math.Vertex(960,540,0);
        this._Collider.Active = false;
        this._Collider.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
}
class PlayerKeyPress
{
    public Left:boolean;
    public Right:boolean;
    public Down:boolean;
    public Up:boolean;
    public constructor()
    {
        this.Left = false;
        this.Right = false;
        this.Down = false;
        this.Up = false;
    }
}