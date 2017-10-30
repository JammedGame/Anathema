export { Attack };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { ItemWorld } from "./../../Items/ItemWorld";
import { ItemCollection } from "./../../Items/ItemCollection";
import { Stats } from "./../../Stats";

class Attack extends AfterAnimation
{
    private _Speed:number;
    private _Victim:any;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Owner.Collider.Trans.Translation.X, this._Target.Y - this._Owner.Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Art = 2;
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
        if(this._Victim)
        {
            let DamageDealt = this.DamageTaken(this._Owner, this._Victim, 1.0);    
                        
            this._Victim.Stats.Health -= DamageDealt;             
            this._Owner.Stats.Health += DamageDealt * this._Owner.Stats.LifeSteal/100;
            
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
    protected DamageTaken(Attacker, Attacked, Factor) : number
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
        let TotalDMG = DMGTaken * Factor * (this.RngWithPercent(Attacker.Stats.CritChance)?(Attacker.Stats.CritMultiplier):1.0);
        let BleedHit=this.RngWithPercent(Attacker.Stats.BleedChance)        
        if(BleedHit)
            {   
                let OldHpReg = Attacked.Stats.HealthRegeneration;
                Attacked.StatsUpdate = true;
                Attacked.Stats.HealthRegeneration -= (0.05*TotalDMG)
                setTimeout(this.RemoveNegativeEffect.bind(this), 5 * 1000, Attacked, OldHpReg);
                Attacked.Stats.HealthRegeneration
            }
        return TotalDMG;
    }
    private DamageCalculation(Damage:number, Resist:number)  : number
    {
        return (1 - Resist * 1.0/(Damage+Resist))*Damage;
    }
    public RngWithPercent(Chance:number):boolean
    {
        let N:boolean[]=[];
        for(let i = 0; i < 100; i++)
        {
            if(i<Chance) N[i]=true;
            else N[i]=false;
        }
        return N[Math.round(Math.random()*99.0)];
    }
    private RemoveNegativeEffect(Attacked: any, OldHpReg:number)
    {
        Attacked.Stats.HealthRegeneration=OldHpReg;
    }
}
