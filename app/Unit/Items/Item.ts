export { Item};

import Engineer from "./../../Engineer";

import { Traits } from "./../Trait";
import { Stats } from "./../Stats";

class Item
{
    private _ID:string;
    private _Name:string;
    private _ArtEquipedIndex:number;
    private _ArtWorldIndex:number;
    private _ArtInventoryIndex:number;
    private _Traits:Traits;
    public get ID():string { return this._ID; }
    public get Name():string { return this._Name; }
    public set Name(value:string) { this._Name = value; }
    public get ArtEquipedIndex():number { return this._ArtEquipedIndex; }
    public get ArtWorldIndex():number { return this._ArtWorldIndex; }
    public get ArtInventoryIndex():number { return this._ArtInventoryIndex; }
    public Data: { [key: string]:any; } = {};
    public constructor(Old?:Item, Name?:string, Indices?:number[], ItemTraits?:Traits)
    {
        if(Old != null)
        {
            this._ID = Engineer.Data.Uuid.Create();
            this._Name = Old._Name;
            this._ArtEquipedIndex = Old._ArtEquipedIndex;
            this._ArtWorldIndex = Old._ArtWorldIndex;
            this._ArtInventoryIndex = Old._ArtInventoryIndex;
            this._Traits = Old._Traits.Copy();
        }
        else
        {
            this._ID = Engineer.Data.Uuid.Create();
            if(Name) this._Name = Name;
            else this._Name = this._ID;
            if(Indices)
            {
                this._ArtEquipedIndex = Indices[0];
                this._ArtWorldIndex = Indices[1];
                this._ArtInventoryIndex = Indices[2];
            }
            else
            {
                this._ArtEquipedIndex = -1;
                this._ArtWorldIndex = -1;
                this._ArtInventoryIndex = -1;
            }
            if(Traits) this._Traits = ItemTraits;
            else this._Traits = new Traits();
        }
    }
    public Copy() : Item
    {
        return new Item(this);
    }
    public Apply(Stats:Stats)
    {
        this._Traits.Apply(Stats);
    }
}