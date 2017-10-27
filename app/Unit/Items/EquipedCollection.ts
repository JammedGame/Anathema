export { EquipedCollection };

import Engineer from "./../../Engineer";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class EquipedCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        this.LoadSpriteSet("GrayBeard", "Looks");
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