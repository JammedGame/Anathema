export { Attack };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";
import { ItemWorld } from "./../Items/ItemWorld";
import { ItemCollection } from "./../Items/ItemCollection";

class Attack extends Action
{
    private _InProgress:boolean;
    private _Completed:boolean;
    private _Speed:number;
    private _Collider:any;
    private _Victim:any;
    private _Scene:GameScene;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Completed = false;
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Override
        if(this._Completed)
        {
            this._Completed = false;
            return false;
        }
        this._Scene = Scene;
        if(this._InProgress) return true;
        this._Collider = this._Owner.Collider;
        if(!this._Collider) return false;
        let Enemies = Scene.GetObjectsWithData(this.Prefs["TargetType"], true);
        this._Victim = null;
        for(let i = 0; i < Enemies.length; i++)
        {
            if(Engineer.Math.Vertex.Distance(Enemies[i].Collider.Trans.Translation, this._Target) < Enemies[i].Trans.Scale.Y)
            {
                if(Engineer.Math.Vertex.Distance(Enemies[i].Collider.Trans.Translation, this._Collider.Trans.Translation) < this._Owner.Stats.Radius)
                {
                    this._Victim = Enemies[i];
                    break;
                }    
            }
        }
        if(!this._Victim) return false;
        this._InProgress = true;
        if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Victim.Collider.Trans.Translation) > this._Owner.Stats.Radius) return false;
        this._Owner.Events.SpriteSetAnimationComplete.push(this.OnFinish.bind(this));
        return true;
    }
    private OnFinish()
    {
        this._Owner.Events.SpriteSetAnimationComplete.splice(this._Owner.Events.SpriteSetAnimationComplete.indexOf(this.OnFinish.bind(this)), 1);
        if(this._Victim)
        {
            this._Victim.Stats.Health -= this._Owner.Stats.BaseDamage;
            this._Victim.Invoke("Damaged");
            if(this._Victim.Stats.Health < 0)
            {
                this._Victim.Destroy();
                if(this._Victim.Data["Enemy"])
                {
                    let Item = ItemCollection.Single.DropRandom();
                    let WorldItem = new ItemWorld(this._Scene.Data["Player"], this._Scene, Item, this._Victim.Trans.Translation.X, this._Victim.Trans.Translation.Y);
                }
            }
        }
        this._InProgress = false;
        this._Completed = true;
    }
}
