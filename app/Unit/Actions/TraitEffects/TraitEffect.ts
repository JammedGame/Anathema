export { TraitEffect };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { AfterAnimation } from "./AfterAnimation";
import { GameScene } from "./../../GameScene";
import { Trait } from "../Trait";

class TraitEffect extends AfterAnimation
{
    private _CastSpeed:number;
    private _Duration:number;
    protected _Trait:Trait;
    public constructor(Old?:TraitEffect, ID?:string, Owner?:any, Duration?:number, CastSpeed?:number)
    {
        super(Old, ID, Owner);
        this._Set = 5;
        this._CooldownLength = 1;
        this._Duration = Duration;
        if(CastSpeed) this._CastSpeed = CastSpeed;
        else this._CastSpeed = 10;
    }
    protected ApplyAction()
    {
        // Override
        this.AddEffect();
        setTimeout(this.RemoveEffect.bind(this), this._Duration * 1000);
        setTimeout(this.RemoveCooldown.bind(this), this._CooldownLength * 1000);
    }
    private RemoveCooldown()
    {
        this._Cooldown = false;
    }
    protected AddEffect()
    {
        // Virtual
        if(this._Trait)
        {
            this._Owner.Traits.Traits.push(this._Trait);
        }
    }
    protected RemoveEffect()
    {
        // Virtual
        if(this._Trait)
        {
            this._Owner.Traits.Traits.splice(this._Owner.Traits.Traits.indexOf(this._Trait), 1);
        }
    }
}
