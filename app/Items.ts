export { Items };

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { Player } from "./Player";

class Items extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;
    private _Item:any;
    private _Player:Player;
    private _Collider:any;
    public get Collider():any { return this._Collider; }
    public constructor(Player:Player, Scene:GameScene)
    {
        super();
        console.log("Kreiranje itema");
        this.Name="Item";
        this._Scene = Scene;
        this._Player =Player;
        //this._Item = this._Scene.Data["Item"];
        this.Fixed = false;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(860,540,0);
        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "Item")];
        this.SpriteSets[0].Sprites = ["/build/resources/item.png"];
        this.Data["Item"] = true;
        // this._Collider = new Engineer.Engine.Tile();
        // this._Collider.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        // this._Collider.Trans.Translation = new Engineer.Math.Vertex(860,540,0);
        // this._Collider.Active = false;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        // this._Scene.Data["Item"] = this._Collider;  
        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
        // this._Scene.AddSceneObject(this._Collider);
    }
    private GameUpdate(G:any, Args:any)
    {
        if(Engineer.Util.Collision.Check(this._Player.Collider,this).Collision)
        {
            this.Active=false;
            console.log("PU");
        }
    }
}