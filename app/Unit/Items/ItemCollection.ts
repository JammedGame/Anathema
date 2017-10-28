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

        let DamageTraitEntry = new TraitEntry(null, "DamageBonus", 5, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let PierceDamageTraitEntry = new TraitEntry(null, "PierceDamage", 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let SlashTraitEntry = new TraitEntry(null, "SlashDamage", 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let BluntTraitEntry = new TraitEntry(null, "BluntDamage", 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let DamageTrait = new Trait(null, "Damage");
        DamageTrait.AddEntry(DamageTraitEntry);
        DamageTrait.AddEntry(PierceDamageTraitEntry);
        DamageTrait.AddEntry(SlashTraitEntry);
        DamageTrait.AddEntry(BluntTraitEntry);
        let DamageTraits = new Traits();
        DamageTraits.Traits.push(DamageTrait);


        let WoodenSword = new Item(null, "Wooden Sword", ["Dagger",0,0], DamageTraits.Copy());
        WoodenSword.Data["Type"] = "Weapon";
        WoodenSword.Data["WeaponGroup"] = 0;
        this._Items.push(WoodenSword);

        let BasicSword = new Item(null, "Basic Sword", ["Dagger",1,1], DamageTraits.Copy());
        BasicSword.Traits.Traits[0].Entries[1].Value = 15;
        BasicSword.Data["Type"] = "Weapon";
        BasicSword.Data["WeaponGroup"] = 0;
        this._Items.push(BasicSword);

        let BasicSpear = new Item(null, "Basic Spear", ["Spear",9,9], DamageTraits.Copy());
        BasicSpear.Traits.Traits[0].Entries[1].Value = 20;
        BasicSpear.Data["Type"] = "Weapon";
        BasicSpear.Data["WeaponGroup"] = 1;
        this._Items.push(BasicSpear);

        let BasicBow = new Item(null, "Basic Bow", ["Bow",12,12], DamageTraits.Copy());
        BasicBow.Traits.Traits[0].Entries[1].Value = 12;
        BasicBow.Data["Type"] = "Weapon";
        BasicBow.Data["WeaponGroup"] = 2;
        this._Items.push(BasicBow);

        let IronSword = new Item(null, "Iron Sword", ["Dagger",1,1], DamageTraits.Copy());
        IronSword.Traits.Traits[0].Entries[2].Value = 15;
        IronSword.Data["Type"] = "Weapon";
        IronSword.Data["WeaponGroup"] = 0;
        this._Items.push(IronSword);

        let BronzeSword = new Item(null, "Bronze Sword", ["Dagger",1,1], DamageTraits.Copy());
        BronzeSword.Traits.Traits[0].Entries[2].Value = 25;
        BronzeSword.Data["Type"] = "Weapon";
        BronzeSword.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeSword);

        let IronDagger = new Item(null, "Iron Dagger", ["Dagger",9,9], DamageTraits.Copy());
        IronDagger.Traits.Traits[0].Entries[1].Value = 10;
        IronDagger.Data["Type"] = "Weapon";
        IronDagger.Data["WeaponGroup"] = 0;
        this._Items.push(IronDagger);

        let BronzeDagger = new Item(null, "Bronze Dagger", ["Dagger",9,9], DamageTraits.Copy());
        BronzeDagger.Traits.Traits[0].Entries[1].Value = 20;
        BronzeDagger.Data["Type"] = "Weapon";
        BronzeDagger.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeDagger);

        let IronWarhammer = new Item(null, "Iron Warhammer", ["Dagger",9,9], DamageTraits.Copy());
        IronWarhammer.Traits.Traits[0].Entries[3].Value = 20;
        IronWarhammer.Data["Type"] = "Weapon";
        IronWarhammer.Data["WeaponGroup"] = 0;
        this._Items.push(IronWarhammer);

        let BronzeWarhammer = new Item(null, "Bronze Warhammer", ["Dagger",9,9], DamageTraits.Copy());
        BronzeWarhammer.Traits.Traits[0].Entries[3].Value = 30;
        BronzeWarhammer.Data["Type"] = "Weapon";
        BronzeWarhammer.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeWarhammer);

        let IronAxe = new Item(null, "Iron Axe", ["Dagger",9,9], DamageTraits.Copy());
        IronAxe.Traits.Traits[0].Entries[2].Value = 15;
        IronAxe.Data["Type"] = "Weapon";
        IronAxe.Data["WeaponGroup"] = 0;
        this._Items.push(IronAxe);

        let BronzeAxe = new Item(null, "Bronze Axe", ["Dagger",9,9], DamageTraits.Copy());
        BronzeAxe.Traits.Traits[0].Entries[2].Value = 20;
        BronzeAxe.Data["Type"] = "Weapon";
        BronzeAxe.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeAxe);

        let IronDoubleAxe = new Item(null, "IronDoubleAxe", ["Dagger",9,9], DamageTraits.Copy());
        IronDoubleAxe.Traits.Traits[0].Entries[2].Value = 20;
        IronDoubleAxe.Data["Type"] = "Weapon";
        IronDoubleAxe.Data["WeaponGroup"] = 0;
        this._Items.push(IronDoubleAxe);

        let BronzeDoubleAxe = new Item(null, "BronzeDoubleAxe", ["Dagger",9,9], DamageTraits.Copy());
        BronzeDoubleAxe.Traits.Traits[0].Entries[2].Value = 25;
        BronzeDoubleAxe.Data["Type"] = "Weapon";
        BronzeDoubleAxe.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeDoubleAxe);

        let Boots = new Item(null, "Boots", ["BrownShoes",32,32]);
        Boots.Data["Type"] = "Boots";
        this._Items.push(Boots);

        let Rope = new Item(null, "Rope", ["Rope",32,32]);
        Boots.Data["Type"] = "Belt";
        this._Items.push(Rope);

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