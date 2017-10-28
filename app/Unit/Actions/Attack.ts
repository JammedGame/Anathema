export { Attack };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";
import { ItemWorld } from "./../Items/ItemWorld";
import { ItemCollection } from "./../Items/ItemCollection";
import { Stats } from "./../Stats";

class Attack extends Action
{
    private _InProgress:boolean;
    private _Completed:boolean;
    private _Speed:number;
    private _Victim:any;
    protected _Scene:GameScene;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Owner.Collider.Trans.Translation.X, this._Target.Y - this._Owner.Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Completed = false;
        this._Art = 2;
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
        if(!this.Prepare())
        {
            if(this._Art == 3) console.log("kurac");
            return false;
        }
        this._InProgress = true;
        this._Owner.Events.SpriteSetAnimationComplete.push(this.OnFinish.bind(this));
        return true;
    }
    protected Prepare()
    {
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
    private OnFinish()
    {
        this._Owner.Events.SpriteSetAnimationComplete.splice(this._Owner.Events.SpriteSetAnimationComplete.indexOf(this.OnFinish.bind(this)), 1);
        this.DamageApply();
        this._InProgress = false;
        this._Completed = true;
    }
    protected DamageApply()
    {
        if(this._Victim)
        {
            this._Victim.Stats.Health -= this.DamageTaken(this._Owner, this._Victim, 1.0);
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
    }
    protected DamageTaken(Attacker, Attacked, Factor)
    { 
        let DMGTaken = Attacker.Stats.BaseDamage;
        if(Attacker.Stats.FireDamage) 
            DMGTaken += this.DamageCalculation(Attacker.Stats.FireDamage, Attacked.Stats.FireResist);
        if(Attacker.Stats.ColdDamage)
            DMGTaken += this.DamageCalculation(Attacker.Stats.ColdDamage, Attacked.Stats.ColdResist);
        if(Attacker.Stats.LightningDamage)
            DMGTaken += this.DamageCalculation(Attacker.Stats.LightningDamage, Attacked.Stats.LightningResist);
        if(Attacker.Stats.PierceDamage)
            DMGTaken += this.DamageCalculation(Attacker.Stats.PierceDamage, Attacked.Stats.PierceResist);
        if(Attacker.Stats.SlashDamage)
            DMGTaken += this.DamageCalculation(Attacker.Stats.SlashDamage, Attacked.Stats.SlashResist);
        if(Attacker.Stats.BluntDamage)
            DMGTaken += this.DamageCalculation(Attacker.Stats.BluntDamage, Attacked.Stats.BluntResist);
        return DMGTaken * Factor;
    }
    private DamageCalculation(Damage:number, Resist:number)
    {
        return (1 - Resist * 1.0/(Damage+Resist))*Damage;
    }

}
