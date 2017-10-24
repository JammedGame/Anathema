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
        WoodenSword.Data["Type"] = "Weapon";
        this._Items.push(WoodenSword);

        let BasicSword = new Item(null, "Basic Sword", [0,1,1]);
        BasicSword.Data["Type"] = "Weapon";
        this._Items.push(BasicSword);

        let Robe = new Item(null, "Robe", [0,29,29]);
        Robe.Data["Type"] = "Chest";
        this._Items.push(Robe);
    }
}