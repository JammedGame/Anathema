export { Weapon };

import { Player } from "./Player";
import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class Weapon extends Engineer.Engine.Sprite {
    private _Damage:number;
    private _WeaponType:string;
    private _Durability:number;
    private _Scene:GameScene;
    public get Damage(): any { return this._Damage; }
    public constructor(Scene: GameScene,WP:string) {
        super();
        this.Name = "Weapon";
        this._Damage=20;
        this._Scene = Scene;     
        this._Durability=100;        
        this._WeaponType=WP;
    }


}