export { EquipedCollection };

import Engineer from "./../../Engineer";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class EquipedCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        this.LoadSpriteSet("Rope", "Belt");
        this.LoadSpriteSet("LeatherBelt", "Belt");
        this.LoadSpriteSet("BlackShoes", "Feet");
        this.LoadSpriteSet("BrownShoes", "Feet");
        this.LoadSpriteSet("GoldPlateBoots", "Feet");
        this.LoadSpriteSet("MaroonShoes", "Feet");
        this.LoadSpriteSet("PlateBoots", "Feet");
        this.LoadSpriteSet("LegionSandals", "Feet");
        this.LoadSpriteSet("GoldPlateGloves", "Hands");
        this.LoadSpriteSet("LeatherBracers", "Hands");
        this.LoadSpriteSet("PlateGloves", "Hands");
        this.LoadSpriteSet("Bandana", "Head");
        this.LoadSpriteSet("ChainHat", "Head");
        this.LoadSpriteSet("ChainHood", "Head");
        this.LoadSpriteSet("ChainHoodHat", "Head");
        this.LoadSpriteSet("GoldPlateHelm", "Head");
        this.LoadSpriteSet("LeatherCap", "Head");
        this.LoadSpriteSet("PlateHelm", "Head");
        this.LoadSpriteSet("RobeHood", "Head");
        this.LoadSpriteSet("LegionSteelHelm", "Head");
        this.LoadSpriteSet("LegionBronzeHelm", "Head");
        this.LoadSpriteSet("LegionGoldHelm", "Head");
        this.LoadSpriteSet("LegionSteelHelmCrest", "Head");
        this.LoadSpriteSet("LegionBronzeHelmCrest", "Head");
        this.LoadSpriteSet("LegionGoldHelmCrest", "Head");
        this.LoadSpriteSet("GoldPlateGreaves", "Legs");
        this.LoadSpriteSet("MagentaPants", "Legs");
        this.LoadSpriteSet("PlateGreaves", "Legs");
        this.LoadSpriteSet("RedPants", "Legs");
        this.LoadSpriteSet("RobeSkirt", "Legs");
        this.LoadSpriteSet("TealPants", "Legs");
        this.LoadSpriteSet("WhitePants", "Legs");
        this.LoadSpriteSet("LegionSkirt", "Legs");
        this.LoadSpriteSet("BedHeadGray", "Looks");
        this.LoadSpriteSet("GrayBeard", "Looks");
        this.LoadSpriteSet("RedBeard", "Looks");
        this.LoadSpriteSet("BrownShirt", "Torso");
        this.LoadSpriteSet("ChainMail", "Torso");
        this.LoadSpriteSet("ChainTabard", "Torso");
        this.LoadSpriteSet("GoldPlate", "Torso");
        this.LoadSpriteSet("GoldPlateArms", "Torso");
        this.LoadSpriteSet("Leather", "Torso");
        this.LoadSpriteSet("LeatherShoulders", "Torso");
        this.LoadSpriteSet("MaroonShirt", "Torso");
        this.LoadSpriteSet("Plate", "Torso");
        this.LoadSpriteSet("PlateArms", "Torso");
        this.LoadSpriteSet("TealShirt", "Torso");
        this.LoadSpriteSet("WhiteShirt", "Torso");
        this.LoadSpriteSet("LegionSteel", "Torso");
        this.LoadSpriteSet("LegionBronze", "Torso");
        this.LoadSpriteSet("LegionGold", "Torso");
        this.LoadSpriteSet("Arrow", "Weapon");
        this.LoadSpriteSet("ArrowSkeleton", "Weapon");
        this.LoadSpriteSet("Bow", "Weapon");
        this.LoadSpriteSet("Dagger", "Weapon");
        this.LoadSpriteSet("GreatBow", "Weapon");
        this.LoadSpriteSet("RecurveBow", "Weapon");
        this.LoadSpriteSet("Shield", "Weapon");
        this.LoadSpriteSet("SkeletonBow", "Weapon");
        this.LoadSpriteSet("Spear", "Weapon");
        this.LoadSpriteSet("Wand", "Weapon");
        this.LoadSpriteSet("Axe", "Weapon");
        this.LoadSpriteSet("Pickaxe", "Weapon");
        this.LoadSpriteSet("LongKnife", "Weapon");
        this.LoadSpriteSet("KiteShield", "Weapon");
        this.LoadSpriteSet("Warhammer", "Weapon");
        EquipedCollection.Single = this;
    }
    private LoadSpriteSet(Set:string, Group:string) : void
    {
        let Sprite = new Engineer.Engine.Sprite();
        SpriteSetLoader.LoadSets(Sprite, Set, null, "Items/" + Group + "/");
        this.Items[Set] = Sprite;
    }
    public static Single:EquipedCollection;
}