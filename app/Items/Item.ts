export { Item};

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Unit/Player";

class Item extends Engineer.Engine.Tile
{
    private _Scene:GameScene;
    private _Player:Player;
    private _inInventory:boolean;    

    public get inInventory(): boolean { return this._inInventory; }
    public set inInventory(inInv:boolean) { this._inInventory=inInv; }

    public constructor(Player:Player, Scene:GameScene, ItemName:string, inInv:boolean=true)
    {
        super();
        this._inInventory=inInv;
        this.Name=ItemName;
        this._Scene = Scene;
        this._Player = Player;
        Engineer.Util.Log.Error("/build/resources/items/"+ItemName+".png");     
           
        this.Collection = new Engineer.Engine.TileCollection(null, ["/build/resources/items/"+ItemName+".png"]);
        this.Trans.Scale = new Engineer.Math.Vertex(80, 80, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(300,300, 0.5);
        this.Data["Item"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.Events.MouseDown.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
    }
    private GameUpdate(G:any, Args:any)
    {   
        if (Args.MouseButton == 2 && this._inInventory==true) 
        {
                //equip | use                 
        }
    }
     
}