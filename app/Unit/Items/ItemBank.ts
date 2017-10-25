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

        let Boots = new Item(null, "Boots", [2,32,32]);
        Boots.Data["Type"] = "Boots";
        this._Items.push(Boots);

        let Chest = new Item(null, "Chest", [4,39,39]);
        Chest.Data["Type"] = "Chest";
        this._Items.push(Chest);

        let Greaves = new Item(null, "Greaves", [5,45,45]);
        Greaves.Data["Type"] = "Greaves";
        this._Items.push(Greaves);
    }
}