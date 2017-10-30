export { Attack };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { Damage } from "./../../Damage";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { ItemWorld } from "./../../Items/ItemWorld";
import { ItemCollection } from "./../../Items/ItemCollection";
import { Stats } from "./../../Stats";

class Attack extends AfterAnimation
{
    private _BleedCounter:number;    
    private _Victim:any;    
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Owner.Collider.Trans.Translation.X, this._Target.Y - this._Owner.Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Art = 2;
        this._BleedCounter = 0;
    }
    protected Check() : boolean
    {
        // Override
        let Collider = this._Owner.Collider;
        if(!Collider) return false;
        let Enemies = this._Scene.GetObjectsWithData(this.Prefs["TargetType"], true);
        this._Victim = null;
        for(let i = 0; i < Enemies.length; i++)
        {
            if(Engineer.Math.Vertex.Distance(Enemies[i].Collider.Trans.Translation, this._Target) < Enemies[i].Trans.Scale.Y)
            {
                if(Engineer.Math.Vertex.Distance(Enemies[i].Collider.Trans.Translation, Collider.Trans.Translation) < this._Owner.Stats.Radius)
                {
                    this._Victim = Enemies[i];
                    break;
                }
            }
        }
        if(!this._Victim) return false;        
        return true;
    }
    protected ApplyAction()  : void
    {
        // Override
        if(this._Victim) Damage.Single.SingleDamage(this._Owner, this._Victim, 1.0);
    }
}
