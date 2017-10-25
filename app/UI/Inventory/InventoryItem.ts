export { InventoryItem };

import Engineer from "./../../Engineer";
import { Item } from "./../../Unit/Items/Item";
import { InventoryCollection } from "./InventoryCollection";

class InventoryItem extends Engineer.Engine.Tile
{
    private _Item:Item;
    public get Item():Item { return this._Item; }
    public constructor(Item:Item, X:number, Y:number, Large?:boolean)
    {
        super();
        this._Item = Item;
        this.Collection = InventoryCollection.Single;
        this.Index = Item.ArtInventoryIndex;
        this.Trans.Scale = new Engineer.Math.Vertex(60, 60, 1);
        if(Large) this.Trans.Scale = new Engineer.Math.Vertex(80, 80, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(X, Y, 2.8);
    }
}