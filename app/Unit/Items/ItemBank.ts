export { ItemBank };

import Engineer from "./../../Engineer";
import{ Item } from "./Item";

class ItemBank
{
    private _Items:Item[];
    public get Items():Item[] { return this._Items; }
    public constructor()
    {
        this._Items = [];

        let WoodenSword = new Item(null, "Wooden Sword", [0,0,0]);

        this._Items.push(WoodenSword);
    }
}