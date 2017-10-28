export { ItemCollection };

import Engineer from "./../../Engineer";
import { Item } from "./Item";
import { Trait, TraitEntry, Traits } from "./../Trait";

class ItemCollection
{
    private _Items:Item[];
    public get Items():Item[] { return this._Items; }
    public constructor()
    {
        this._Items = [];

        let DamageTraitEntry = new TraitEntry(null, "DamageBonus", 10, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let DamageTrait = new Trait(null, "Damage");
        DamageTrait.AddEntry(DamageTraitEntry);
        let DamageTraits = new Traits();
        DamageTraits.Traits.push(DamageTrait);

        let WoodenSword = new Item(null, "Wooden Sword", ["Dagger",0,0], DamageTraits.Copy());
        WoodenSword.Data["Type"] = "Weapon";
        WoodenSword.Data["WeaponGroup"] = 0;
        this._Items.push(WoodenSword);

        let BasicSword = new Item(null, "Basic Sword", ["Dagger",1,1], DamageTraits.Copy());
        BasicSword.Traits.Traits[0].Entries[0].Value = 15;
        BasicSword.Data["Type"] = "Weapon";
        BasicSword.Data["WeaponGroup"] = 0;
        this._Items.push(BasicSword);

        let BasicSpear = new Item(null, "Basic Spear", ["Spear",9,9], DamageTraits.Copy());
        BasicSpear.Traits.Traits[0].Entries[0].Value = 20;
        BasicSpear.Data["Type"] = "Weapon";
        BasicSpear.Data["WeaponGroup"] = 1;
        this._Items.push(BasicSpear);

        let BasicBow = new Item(null, "Basic Bow", ["Bow",12,12], DamageTraits.Copy());
        BasicBow.Traits.Traits[0].Entries[0].Value = 12;
        BasicBow.Data["Type"] = "Weapon";
        BasicBow.Data["WeaponGroup"] = 2;
        this._Items.push(BasicBow);

        let Boots = new Item(null, "Boots", ["BrownShoes",32,32]);
        Boots.Data["Type"] = "Boots";
        this._Items.push(Boots);

        let Chest = new Item(null, "Chest", ["ChainMail",39,39]);
        Chest.Data["Type"] = "Chest";
        this._Items.push(Chest);

        let Greaves = new Item(null, "Greaves", ["PlateGreaves",45,45]);
        Greaves.Data["Type"] = "Greaves";
        this._Items.push(Greaves);

        let Helm = new Item(null, "Chain Helm", ["ChainHoodHat",38,38]);
        Helm.Data["Type"] = "Head";
        this._Items.push(Helm);

        ItemCollection.Single = this;
    }
    public DropRandom() : Item
    {
        let Index = Math.floor((Math.random() * this._Items.length));
        return this._Items[Index];
    }
    public static Single:ItemCollection;
}