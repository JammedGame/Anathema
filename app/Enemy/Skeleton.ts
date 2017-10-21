export { Skeleton };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import { Enemy } from "./Enemy";

class Skeleton extends Enemy {
    
    public constructor(Scene: GameScene,start_X:number,start_Y:number) {
        super(Scene, start_X, start_Y);
    }
    public doDamage(G: any, Args: any) {        
        if(Args.CurrentSpriteSet==4 || Args.CurrentSpriteSet==5 || Args.CurrentSpriteSet==6 || Args.CurrentSpriteSet==7){
            this._Player.HealthBar.Damage(this._Damage);
        }        
    }
}
