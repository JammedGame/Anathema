export { Inventory };

import Engineer from "./../../Engineer";

import { Item } from "./Item";
import { Stats } from "./../Stats";

const BackPackSize = 45;

class Inventory
{
    private _Head:Item;
    private _Chest:Item;
    private _Gloves:Item;
    private _Boots:Item;
    private _Weapon:Item;
    private _OffHand:Item;
    private _BackPack:Item[];
    private _OnUpdate:Function[];
    public get Head():Item { return this._Head; }
    public get Chest():Item { return this._Chest; }
    public get Gloves():Item { return this._Gloves; }
    public get Boots():Item { return this._Boots; }
    public get Weapon():Item { return this._Weapon; }
    public get OffHand():Item { return this._OffHand; }
    public get BackPack():Item[] { return this._BackPack; }
    public get OnUpdate():Function[] { return this._OnUpdate; }
    public set OnUpdate(value:Function[]) { this._OnUpdate = value; }
    public constructor(Old?:Inventory)
    {
        if(Old != null)
        {
            if(Old._Head) this._Head = Old._Head.Copy();
            if(Old._Chest) this._Chest = Old._Chest.Copy();
            if(Old._Gloves) this._Gloves = Old._Gloves.Copy();
            if(Old._Boots) this._Boots = Old._Boots.Copy();
            if(Old._Weapon) this._Weapon = Old._Weapon.Copy();
            if(Old._OffHand) this._OffHand = Old._OffHand.Copy();
            this._BackPack = [];
            for(let i = 0; i < Old._BackPack.length; i++)
            {
                if(Old._BackPack[i]) this._BackPack.push(Old._BackPack[i].Copy());
                else this._BackPack.push(null);
            }
            this._OnUpdate = [];
        }
        else
        {
            this._BackPack = [];
            for(let i = 0; i < BackPackSize; i++)
            {
                this._BackPack.push(null);
            }
            this._OnUpdate = [];
        }
    }
    public Loot(Item:Item) : boolean
    {
        for(let i = 0; i < this._BackPack.length; i++)
        {
            if(this._BackPack[i] == null)
            {
                this._BackPack[i] = Item;
                this.InvokeUpdate();
                return true;
            }
        }
        return false;
    }
    public CanLoot() : boolean
    {
        for(let i = 0; i < this._BackPack.length; i++)
        {
            if(this._BackPack[i] == null)
            {
                return true;
            }
        }
        return false;
    }
    private InvokeUpdate()
    {
        for(let i = 0; i < this._OnUpdate.length; i++)
        {
            this._OnUpdate[i]();
        }
    }
    public Apply(Stats:Stats) : void
    {
        if(this._Head) this._Head.Apply(Stats);
        if(this._Chest) this._Chest.Apply(Stats);
        if(this._Gloves) this._Gloves.Apply(Stats);
        if(this._Boots) this._Boots.Apply(Stats);
        if(this._Weapon) this._Weapon.Apply(Stats);
        if(this._OffHand) this._OffHand.Apply(Stats);
        for(let i = 0; i < this._BackPack.length; i++)
        {
            if(this._BackPack[i] && this._BackPack[i].Data["Charm"])
            {
                this._BackPack[i].Apply(Stats);
            }
        }
    }
}