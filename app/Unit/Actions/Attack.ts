export { Attack };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";

class Attack extends Action
{
    private _InProgress:boolean;
    private _Completed:boolean;
    private _Speed:number;
    private _Collider:any;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.Trans.Translation.X - this._Collider.Trans.Translation.X, this._Target.Trans.Translation.Y - this._Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Completed = false;
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Override
        if(this._Completed) return false;
        if(this._InProgress) return true;
        this._InProgress = true;
        if(!this._Target) return false;
        this._Collider = this._Owner.Collider;
        if(!this._Collider) return false;
        if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Target.Collider.Trans.Translation) > this._Owner.Stats.Radius) return false;
        this._Owner.Events.SpriteSetAnimationComplete.push(this.OnFinish.bind(this));
        return true;
    }
    private OnFinish()
    {
        this._Owner.Events.SpriteSetAnimationComplete.splice(this._Owner.Events.SpriteSetAnimationComplete.indexOf(this.OnFinish.bind(this)), 1);
        this._Target.Stats.Health -= this._Owner.Stats.BaseDamage;
        this._Target.Invoke("Damaged");
        if(this._Target.Stats.Health < 0) this._Target.Destroy(); 
        this._Completed = true;
    }
}
