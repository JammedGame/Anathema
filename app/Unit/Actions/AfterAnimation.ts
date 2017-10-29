export { AfterAnimation };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";

class AfterAnimation extends Action
{
    private _InProgress:boolean;
    private _Completed:boolean;
    public constructor(Old?:AfterAnimation, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Completed = false;
        this._Set = 0;
        this._Art = 0;
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Override
        if(this._Completed)
        {
            this._Completed = false;
            return false;
        }
        if(this._InProgress) return true;
        this._Scene = Scene;
        if(!this.Check()) return false;
        if(!this.CheckManaCost()) return false;
        this._InProgress = true;
        this._Owner.Events.SpriteSetAnimationComplete.push(this.OnFinish.bind(this));
        return true;
    }
    protected Check()
    {
        // Virtual
        return true;
    }
    protected CheckManaCost()
    {
        let Estimated = this._Owner.Stats.Mana - this._ManaCost;
        if(Estimated >= 0)
        {
            this._Owner.Stats.Mana = Estimated;
            return true;
        }
        return false;
    }
    private OnFinish()
    {
        this._Owner.Events.SpriteSetAnimationComplete.splice(this._Owner.Events.SpriteSetAnimationComplete.indexOf(this.OnFinish.bind(this)), 1);
        this.ApplyAction();
        this._InProgress = false;
        this._Completed = true;
    }
    protected ApplyAction()
    {
        // Virtual
    }
}
