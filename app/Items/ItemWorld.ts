export { ItemWorld };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";

class ItemWorld extends Engineer.Engine.Tile
{
    private _Scene:GameScene;
    private _Item:any;
    private _Player:Player;
    public constructor(Player:Player, Scene:GameScene)
    {
        super();
        this.Name="Item";
        this._Scene = Scene;
        this._Player = Player;
        this.Collection = new Engineer.Engine.TileCollection(null, ["/build/resources/item.png"])
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "Item")];
        this.SpriteSets[0].Sprites = ["/build/resources/item.png"];
        this.Data["Item"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
    }
    private GameUpdate(G:any, Args:any)
    {   
        if(Engineer.Util.Collision.Check(this._Player.Collider,this).Collision)
        {
            this.Active=false;
            //Remove object from scene
        }
    }
}