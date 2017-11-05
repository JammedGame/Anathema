export { Skeleton };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Stats } from "./../Stats";
import { Enemy } from "./Enemy";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class Skeleton extends Enemy
{
    private static _Sets:any[];
    public constructor(Old:Skeleton, Scene?: GameScene)
    {
        super(Old, Scene);
        if(Old != null) {}
        else
        {
            this._Stats.BaseDamage = 1;
            this._Stats.Health = 30;
            this._Stats.MaxHealth = 30;
            this._Stats.PierceDamage = 3;
            this._Stats.PierceResist = 20;        
            this._Stats.Store();
            this._AttackIndex = 1;
            this.SpriteSets = this.LoadSets();
        }
    }
    protected LoadSets() : any []
    {
        if(!Skeleton._Sets)
        {
            SpriteSetLoader.LoadSets(this, "Skeleton");
            Skeleton._Sets = this.SpriteSets;
        }
        return Skeleton._Sets;
    }
}
