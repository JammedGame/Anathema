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

        let DamageTraitEntry = new TraitEntry(null, "DamageBonus", 5, Engineer.Math.Color.FromRGBA(255,255,255,255));
        let PierceDamageTraitEntry = new TraitEntry(null, "PierceDamage", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let SlashDamageTraitEntry = new TraitEntry(null, "SlashDamage", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let BluntDamageTraitEntry = new TraitEntry(null, "BluntDamage", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let PierceResistTraitEntry = new TraitEntry(null, "PierceResist", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let SlashResistTraitEntry = new TraitEntry(null, "SlashResist", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let BluntResistTraitEntry = new TraitEntry(null, "BluntResist", 0, Engineer.Math.Color.FromRGBA(205,133,63,255));
        let FireResistTraitEntry = new TraitEntry(null, "FireResis", 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
        let ColdResistTraitEntry = new TraitEntry(null, "ColdResist", 0, Engineer.Math.Color.FromRGBA(0,0,255,255));
        
        let DamageTrait = new Trait(null, "Damage");
        let ArmorTrait = new Trait(null, "Armor");
        DamageTrait.AddEntry(DamageTraitEntry);
        DamageTrait.AddEntry(PierceDamageTraitEntry);
        DamageTrait.AddEntry(SlashDamageTraitEntry);
        DamageTrait.AddEntry(BluntDamageTraitEntry);
        ArmorTrait.AddEntry(PierceResistTraitEntry);
        ArmorTrait.AddEntry(SlashResistTraitEntry);
        ArmorTrait.AddEntry(BluntResistTraitEntry);
        ArmorTrait.AddEntry(FireResistTraitEntry);
        ArmorTrait.AddEntry(ColdResistTraitEntry);
        let DamageTraits = new Traits();
        DamageTraits.Traits.push(DamageTrait);
        let ArmorTraits = new Traits();
        ArmorTraits.Traits.push(ArmorTrait);
    
    
        let BasicSword = new Item(null, "Basic Sword", ["Dagger",0,0], DamageTraits.Copy());
        BasicSword.Traits.Traits[0].Entries[0].Value = 5;
        BasicSword.Traits.Traits[0].Entries[1].Value = 10;
        BasicSword.Traits.Traits[0].Entries[2].Value = 10;
        BasicSword.Data["Type"] = "Weapon";
        BasicSword.Data["WeaponGroup"] = 0;
        this._Items.push(BasicSword);
        
        let IronSword = new Item(null, "Iron Sword", ["LongKnife",1,1], DamageTraits.Copy());
        IronSword.Traits.Traits[0].Entries[2].Value = 15;
        IronSword.Data["Type"] = "Weapon";
        IronSword.Data["WeaponGroup"] = 0;
        this._Items.push(IronSword);

        let BronzeSword = new Item(null, "Bronze Sword", ["LongKnife",2,2], DamageTraits.Copy());
        BronzeSword.Traits.Traits[0].Entries[2].Value = 25;
        BronzeSword.Data["Type"] = "Weapon";
        BronzeSword.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeSword);

        let BasicAxe = new Item(null, "Basic Axe", ["Axe",3,3], DamageTraits.Copy());
        BasicAxe.Traits.Traits[0].Entries[2].Value = 10;
        BasicAxe.Data["Type"] = "Weapon";
        BasicAxe.Data["WeaponGroup"] = 0;
        this._Items.push(BasicAxe);
      
        let IronAxe = new Item(null, "Iron Axe", ["Axe",4,4], DamageTraits.Copy());
        IronAxe.Traits.Traits[0].Entries[2].Value = 15;
        IronAxe.Data["Type"] = "Weapon";
        IronAxe.Data["WeaponGroup"] = 0;
        this._Items.push(IronAxe);

        let BronzeAxe = new Item(null, "Bronze Axe", ["Axe",5,5], DamageTraits.Copy());
        BronzeAxe.Traits.Traits[0].Entries[2].Value = 20;
        BronzeAxe.Data["Type"] = "Weapon";
        BronzeAxe.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeAxe);

        let BasicDoubleAxe = new Item(null, "BasicDoubleAxe", ["Axe",6,6], DamageTraits.Copy());
        BasicDoubleAxe.Traits.Traits[0].Entries[2].Value = 17;
        BasicDoubleAxe.Data["Type"] = "Weapon";
        BasicDoubleAxe.Data["WeaponGroup"] = 0;
        this._Items.push(BasicDoubleAxe);

        let IronDoubleAxe = new Item(null, "IronDoubleAxe", ["Axe",7,7], DamageTraits.Copy());
        IronDoubleAxe.Traits.Traits[0].Entries[2].Value = 22;
        IronDoubleAxe.Data["Type"] = "Weapon";
        IronDoubleAxe.Data["WeaponGroup"] = 0;
        this._Items.push(IronDoubleAxe);

        let BronzeDoubleAxe = new Item(null, "BronzeDoubleAxe", ["Axe",8,8], DamageTraits.Copy());
        IronDoubleAxe.Traits.Traits[0].Entries[2].Value = 28;
        IronDoubleAxe.Data["Type"] = "Weapon";
        IronDoubleAxe.Data["WeaponGroup"] = 0;
        this._Items.push(IronDoubleAxe);

        let BasicSpear = new Item(null, "Basic Spear", ["Spear",9,9], DamageTraits.Copy());
        BasicSpear.Traits.Traits[0].Entries[1].Value = 12;
        BasicSpear.Data["Type"] = "Weapon";
        BasicSpear.Data["WeaponGroup"] = 1;
        this._Items.push(BasicSpear);

        let IronSpear = new Item(null, "Iron Spear", ["Spear",10,10], DamageTraits.Copy());
        BasicSpear.Traits.Traits[0].Entries[1].Value = 17;
        BasicSpear.Data["Type"] = "Weapon";
        BasicSpear.Data["WeaponGroup"] = 1;
        this._Items.push(BasicSpear);

        let Bronze = new Item(null, "Bronze Spear", ["Spear",11,11], DamageTraits.Copy());
        BasicSpear.Traits.Traits[0].Entries[1].Value = 22;
        BasicSpear.Data["Type"] = "Weapon";
        BasicSpear.Data["WeaponGroup"] = 1;
        this._Items.push(BasicSpear);

        let Shortbow = new Item(null, "Shortbow", ["Bow",12,12], DamageTraits.Copy());
        Shortbow.Traits.Traits[0].Entries[1].Value = 12;
        Shortbow.Data["Type"] = "Weapon";
        Shortbow.Data["WeaponGroup"] = 2;
        this._Items.push(Shortbow);

        let Longbow = new Item(null, "Longbow", ["GreatBow",13,13], DamageTraits.Copy());
        Longbow.Traits.Traits[0].Entries[1].Value = 16;
        Longbow.Data["Type"] = "Weapon";
        Longbow.Data["WeaponGroup"] = 2;
        this._Items.push(Longbow);
        
        let IronDagger = new Item(null, "Iron Dagger", ["Dagger",14,14], DamageTraits.Copy());
        IronDagger.Traits.Traits[0].Entries[1].Value = 7;
        IronDagger.Data["Type"] = "Weapon";
        IronDagger.Data["WeaponGroup"] = 0;
        this._Items.push(IronDagger);

        let BronzeDagger = new Item(null, "Bronze Dagger", ["Dagger",15,15], DamageTraits.Copy());
        BronzeDagger.Traits.Traits[0].Entries[1].Value = 11;
        BronzeDagger.Data["Type"] = "Weapon";
        BronzeDagger.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeDagger);

        let IronWarhammer = new Item(null, "Iron Warhammer", ["Warhammer",16,16], DamageTraits.Copy());
        IronWarhammer.Traits.Traits[0].Entries[3].Value = 20;
        IronWarhammer.Data["Type"] = "Weapon";
        IronWarhammer.Data["WeaponGroup"] = 0;
        this._Items.push(IronWarhammer);

        let BronzeWarhammer = new Item(null, "Bronze Warhammer", ["Warhammer",17,17], DamageTraits.Copy());
        BronzeWarhammer.Traits.Traits[0].Entries[3].Value = 27;
        BronzeWarhammer.Data["Type"] = "Weapon";
        BronzeWarhammer.Data["WeaponGroup"] = 0;
        this._Items.push(BronzeWarhammer);
        
        let RedPotion = new Item(null, "RedPotion", ["",18,18]);
        RedPotion.Data["Type"] = "Potion";
        this._Items.push(RedPotion);

        let BluePotion = new Item(null, "BluePotion", ["",19,19]);
        BluePotion.Data["Type"] = "Potion";
        this._Items.push(BluePotion);

        let GreenPotion = new Item(null, "GreenPotion", ["",20,20]);
        GreenPotion.Data["Type"] = "Potion";
        this._Items.push(GreenPotion);    
        
        let Map = new Item(null, "Map", ["",21,21]);
        Map.Data["Type"] = "Map";
        this._Items.push(Map);

        let Scroll = new Item(null, "Scroll", ["",22,22]);
        Scroll.Data["Type"] = "Scroll";
        this._Items.push(Scroll);

        let Tome = new Item(null, "Tome", ["",23,23]);
        Tome.Data["Type"] = "Tome";
        this._Items.push(Tome);

        let GreenShirt = new Item(null, "GreenShirt", ["TealShirt",24,24], ArmorTraits.Copy());
        GreenShirt.Data["Type"] = "Chest";
        GreenShirt.Traits.Traits[0].Entries[1].Value = 10;
        GreenShirt.Traits.Traits[0].Entries[3].Value = 10;
        GreenShirt.Traits.Traits[0].Entries[4].Value = 15;
        this._Items.push(GreenShirt);
        

        let BluePants = new Item(null, "BluePants", ["TealPants",25,25], ArmorTraits.Copy());
        BluePants.Data["Type"] = "Greaves";
        BluePants.Traits.Traits[0].Entries[3].Value = 10;
        BluePants.Traits.Traits[0].Entries[4].Value = 15;
        this._Items.push(BluePants);

        let Gloves = new Item(null, "Gloves", ["LeatherBracers",26,26], ArmorTraits.Copy());
        Gloves.Data["Type"] = "Gloves";
        Gloves.Traits.Traits[0].Entries[1].Value = 5;
        Gloves.Traits.Traits[0].Entries[3].Value = 15;
        Gloves.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Gloves);

        let Sandals = new Item(null, "Sandals", ["LegionSandals",27,27], ArmorTraits.Copy());
        Sandals.Data["Type"] = "Boots";
        Sandals.Traits.Traits[0].Entries[1].Value = 5;
        Sandals.Traits.Traits[0].Entries[3].Value = 15;
        Sandals.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Sandals);

        let Cowl = new Item(null, "Cowl", ["RobeHood",28,28], ArmorTraits.Copy());
        Cowl.Data["Type"] = "Head";
        Cowl.Traits.Traits[0].Entries[1].Value = 5;
        Cowl.Traits.Traits[0].Entries[3].Value = 15;
        Cowl.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Cowl);

        let Robe = new Item(null, "Robe", ["BrownShirt",29,29], ArmorTraits.Copy());
        Robe.Data["Type"] = "Chest";
        Robe.Traits.Traits[0].Entries[1].Value = 5;
        Robe.Traits.Traits[0].Entries[3].Value = 15;
        Robe.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Robe);

        let Skirt = new Item(null, "Skirt", ["RobeSkirt",30,30], ArmorTraits.Copy());
        Skirt.Data["Type"] = "Greaves";
        Skirt.Traits.Traits[0].Entries[1].Value = 5;
        Skirt.Traits.Traits[0].Entries[3].Value = 15;
        Skirt.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Skirt);

        let Bracers = new Item(null, "LeatherBracers", ["LeatherBracers",31,31], ArmorTraits.Copy());
        Bracers.Data["Type"] = "Gloves";
        Bracers.Traits.Traits[0].Entries[1].Value = 5;
        Bracers.Traits.Traits[0].Entries[3].Value = 15;
        Bracers.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Bracers);

        let Boots = new Item(null, "Boots", ["BrownShoes",32,32], ArmorTraits.Copy());
        Boots.Data["Type"] = "Boots";
        Boots.Traits.Traits[0].Entries[1].Value = 5;
        Boots.Traits.Traits[0].Entries[3].Value = 15;
        Boots.Traits.Traits[0].Entries[4].Value = 10;
        this._Items.push(Boots);

        let LetherCowl = new Item(null, "Leather Cowl", ["LeatherCap",33,33], ArmorTraits.Copy());
        LetherCowl.Data["Type"] = "Head";
        LetherCowl.Traits.Traits[0].Entries[0].Value = 5;
        LetherCowl.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(LetherCowl);

        let LetherChest = new Item(null, "Leather Chest", ["LeatherShoulders",34,34], ArmorTraits.Copy());
        LetherChest.Data["Type"] = "Chest";
        LetherChest.Traits.Traits[0].Entries[0].Value = 5;
        LetherChest.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(LetherChest);

        let LetherGreaves = new Item(null, "Leather Greaves", ["RedPants",35,35], ArmorTraits.Copy());
        LetherGreaves.Data["Type"] = "Greaves";
        LetherGreaves.Traits.Traits[0].Entries[0].Value = 5;
        LetherGreaves.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(LetherGreaves);

        let LetherGloves = new Item(null, "Leather Gloves", ["LeatherBracers",36,36], ArmorTraits.Copy());
        LetherGloves.Data["Type"] = "Gloves";
        LetherGloves.Traits.Traits[0].Entries[0].Value = 5;
        LetherGloves.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(LetherGloves);

        let LetherBoots = new Item(null, "Leather Boots", ["BrownShoes",37,37], ArmorTraits.Copy());
        LetherBoots.Data["Type"] = "Boots";
        LetherBoots.Traits.Traits[0].Entries[0].Value = 5;
        LetherBoots.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(LetherBoots);          

        let ChainHelm = new Item(null, "Chain Helm", ["ChainHoodHat",38,38], ArmorTraits.Copy());
        ChainHelm.Data["Type"] = "Head";
        ChainHelm.Traits.Traits[0].Entries[1].Value = 10;
        ChainHelm.Traits.Traits[0].Entries[2].Value = 5;
        this._Items.push(ChainHelm);
      
        let ChainMail = new Item(null, "Chain Mail", ["ChainMail",39,39], ArmorTraits.Copy());
        ChainMail.Data["Type"] = "Chest";
        ChainMail.Traits.Traits[0].Entries[1].Value = 10;
        ChainMail.Traits.Traits[0].Entries[2].Value = 5;
        this._Items.push(ChainMail);

        let GreavesMail = new Item(null, "Chain Mail", ["PlateGreaves",40,40], ArmorTraits.Copy());
        GreavesMail.Data["Type"] = "Greaves";
        GreavesMail.Traits.Traits[0].Entries[1].Value = 10;
        GreavesMail.Traits.Traits[0].Entries[2].Value = 5;
        this._Items.push(GreavesMail);

        let ChainGloves = new Item(null, "Chain Gloves", ["PlateGloves",41,41], ArmorTraits.Copy());
        ChainGloves.Data["Type"] = "Gloves";
        ChainGloves.Traits.Traits[0].Entries[1].Value = 10;
        ChainGloves.Traits.Traits[0].Entries[2].Value = 5;
        this._Items.push(ChainGloves);

        let ChainBoots = new Item(null, "Chain Boots", ["PlateBoots",42,42], ArmorTraits.Copy());
        ChainBoots.Data["Type"] = "Boots";
        ChainBoots.Traits.Traits[0].Entries[1].Value = 10;
        ChainBoots.Traits.Traits[0].Entries[2].Value = 5;
        this._Items.push(ChainBoots);
        
        let HelmetPlate = new Item(null, "Plate Helmet", ["PlateHelm",43,43], ArmorTraits.Copy());
        HelmetPlate.Data["Type"] = "Head";
        HelmetPlate.Data["Full"] = true;
        HelmetPlate.Traits.Traits[0].Entries[0].Value = 5;
        HelmetPlate.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(HelmetPlate);

        let ChestPlate = new Item(null, "Chest Plate", ["PlateArms",44,44], ArmorTraits.Copy());
        ChestPlate.Data["Type"] = "Chest";
        ChestPlate.Traits.Traits[0].Entries[0].Value = 5;
        ChestPlate.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(ChestPlate);
        
        let PlateGreaves = new Item(null, "Plate Greaves", ["PlateGreaves",45,45], ArmorTraits.Copy());
        PlateGreaves.Data["Type"] = "Greaves";
        PlateGreaves.Traits.Traits[0].Entries[0].Value = 5;
        PlateGreaves.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(PlateGreaves);

        let PlateGloves = new Item(null, "Plate Gloves", ["GoldPlateGloves",46,46], ArmorTraits.Copy());
        PlateGloves.Data["Type"] = "Gloves";
        PlateGloves.Traits.Traits[0].Entries[0].Value = 5;
        PlateGloves.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(PlateGloves);
        
        let PlateBoots = new Item(null, "Plate Boots", ["PlateBoots",47,47], ArmorTraits.Copy());
        PlateBoots.Data["Type"] = "Boots";
        PlateBoots.Traits.Traits[0].Entries[0].Value = 5;
        PlateBoots.Traits.Traits[0].Entries[1].Value = 10;
        this._Items.push(PlateBoots);
               

        ItemCollection.Single = this;
    }
    public DropRandom() : Item
    {
        let Index = Math.floor((Math.random() * this._Items.length));
        return this._Items[Index].Copy();
    }
    public static Single:ItemCollection;
}