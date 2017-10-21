export { Item};

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";

class Item extends Engineer.Engine.Tile
{
    private _Scene:GameScene;   
    private _Player:Player;
    public constructor(Player:Player, Scene:GameScene, ItemName:string)
    {
        super();
        this.Name=ItemName;
        this._Scene = Scene;
        this._Player = Player;
        this.Collection = new Engineer.Engine.TileCollection(null, ["/build/resources/"+ItemName+".png"]);
        this.Data["Item"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.Events.MouseDown.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
    }
    private GameUpdate(G:any, Args:any)
    {   
        if (Args.MouseButton == 2) 
        {
            //equip | use 
        }
    }
    public 
}