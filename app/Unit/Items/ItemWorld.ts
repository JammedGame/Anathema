export { ItemWorld };

import Engineer from "./../../Engineer";
import { GameScene } from "./../../GameScene";
import { Player } from "./../../Unit/Player";
import { Item } from "./Item";
import { Inventory } from "./Inventory";
import { WorldCollection } from "./WorldCollection";

class ItemWorld extends Engineer.Engine.Tile
{
    private _Item:Item;
    private _Scene:GameScene;
    private _Player:Player;
    public constructor(Player:Player, Scene:GameScene, Item:Item, X:number, Y:number)
    {
        super();
        this.Trans.Translation = new Engineer.Math.Vertex(X, Y, 0.2);
        this.Trans.Scale = new Engineer.Math.Vertex(50, 50, 1);
        if(WorldCollection.Single == null) this.Collection = new WorldCollection();
        else this.Collection = WorldCollection.Single;
        this.Index = Item.ArtWorldIndex;
        this.Data["Item"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene = Scene;
        this._Player = Player;
        this._Item = Item;
        this._Scene.Events.MouseDown.push(this.GameUpdate.bind(this));
        this._Scene.AddSceneObject(this);
    }
    private GameUpdate(G:any, Args:any)
    {
        if(Engineer.Util.Collision.Check(this._Player.Collider, this).Collision)
        {
            if(this._Player.Inventory.Loot(this._Item))
            {
                this._Scene.Events.MouseDown.splice(this._Scene.Events.MouseDown.indexOf(this.GameUpdate), 1);
                this._Scene.RemoveSceneObject(this);
            }
            else
            {
                // BackPack full indication
            }
        }
    }  
}