export { Orc };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Stats } from "./../Stats";
import { Enemy } from "./Enemy";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class Orc extends Enemy
{
    public constructor(Scene: GameScene, X:number, Y:number)
    {
        super(Scene, X, Y);
        this._Stats.BaseDamage = 1;
        this._Stats.Health = 50;
        this._Stats.MaxHealth = 50;
        this._Stats.Store();
        SpriteSetLoader.LoadSets(this, "Orc");
    }
}
