export { Arrow };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Projectile } from "./Projectile";
import { Unit } from "./../Unit";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";


class Arrow extends Projectile
{
    public constructor(Old:Arrow, ColliderTypes:string[], Scene?:GameScene)
    {
        super(Old, ColliderTypes, Scene);
        if(Old != null)
        {

        }
        else
        {
            this.LoadSets("Arrow", 1);
        }
    }
}
