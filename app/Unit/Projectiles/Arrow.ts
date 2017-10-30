export { Arrow };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Projectile } from "./Projectile";
import { Unit } from "./../Unit";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { SpriteSetLoader } from "./../../Util/SpriteSetLoader";

class Arrow extends Projectile
{
    public constructor(Scene:GameScene, ColliderTypes:string[])
    {
        super(Scene, ColliderTypes);
        SpriteSetLoader.LoadSets(this, "Arrow", null, "Projectiles/");
    }
}
