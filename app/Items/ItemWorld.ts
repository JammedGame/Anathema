export { ItemWorld };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import{ Item } from "./Item";

class ItemWorld extends Engineer.Engine.Tile
{
    private _Scene:GameScene;
    private _Item:any;
    private _Player:Player;
    public constructor(Player:Player, Scene:GameScene)
    {
        super();
        this.Name="ItemWorld";
        this._Scene = Scene;
        this._Player = Player;
        this.Data["ItemWorld"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;

        this._Item=new Item(Player, Scene, "BeastSlayer");

        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
    }
    private GameUpdate(G:any, Args:any)
    {   
        if(Engineer.Util.Collision.Check(this._Player.Collider,this).Collision)
        {
            this.Active=false;
            this._Scene.RemoveSceneObject(this);
            //Remove object from scene
        }
    }

    private AddToInventory(){

    }
}