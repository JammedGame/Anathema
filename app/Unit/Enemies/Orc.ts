export { Orc };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Stats } from "./../Stats";
import { Enemy } from "./Enemy";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class Orc extends Enemy
{
    private static _Sets:any[];
    public constructor(Old:Orc, Scene: GameScene)
    {
        super(Old, Scene);
        if(Old != null) {}
        else
        {
            this._Stats.BaseDamage = 1;
            this._Stats.Health = 50;
            this._Stats.MaxHealth = 50;
            this._Stats.Store();
            this.SpriteSets = this.LoadSets();
        }
    }
    protected LoadSets() : any []
    {
        if(!Orc._Sets)
        {
            SpriteSetLoader.LoadSets(this, "Orc");
            Orc._Sets = this.SpriteSets;
        }
        return Orc._Sets;
    }
}
