export { EquipedCollection };

import Engineer from "./../../Engineer";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class EquipedCollection
{
    private _Items:any[];
    public get Items():any[] { return this._Items; }
    public constructor()
    {
        this._Items = [];
        for(let i = 1; i < 7; i++)
        {
            let s:string = i.toString();
            if(i < 10) s = "00" + s;
            else if (i < 100) s = "0" + s;
            let Sprite = new Engineer.Engine.Sprite();
            SpriteSetLoader.LoadSets(Sprite, "i"+s, [1,9,0,0,0,0], "Items/");
            this._Items.push(Sprite);
        }
        console.log(this._Items);
        EquipedCollection.Single = this;
    }
    public static Single:EquipedCollection;
}