export { ItemWorld };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Unit/Player";
import{ Item } from "./Item";
import{ Inventory } from "../UI/Inventory";


class ItemWorld
{    
    private _Inventory:Inventory;
    private _Scene:GameScene;
    private _Item:any;
    private _Player:Player;
    public constructor(Player:Player, Scene:GameScene,Inv:Inventory, ItemName:string, posX:number, posY:number)
    {
        this._Inventory=Inv;
        this._Scene = Scene;
        this._Player = Player;
        this._Item=new Item(Player, Scene, ItemName, posX, posY, false);
        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
        
    }
    private GameUpdate(G:any, Args:any)
    {   
        if(Engineer.Util.Collision.Check(this._Player.Collider,this._Item).Collision && this._Item.inInventory==false)
        {
            this._Item.Active=false;            
            this._Scene.RemoveSceneObject(this._Item);  
            this._Inventory.addToInv(this._Item);
            this._Item.inInventory=true; 
        }
    }  
}