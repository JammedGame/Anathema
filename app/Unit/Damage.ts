export { Damage }

import { Unit } from "./Unit";
import { Stats } from "./Stats";
import { GameScene } from "./../GameScene";
import { ItemWorld } from "./Items/ItemWorld";
import { ItemCollection } from "./Items/ItemCollection";

class Damage
{
    private _Scene:GameScene;
    public constructor(Scene:GameScene)
    {
        this._Scene = Scene;
        Damage.Single = this;
    }
    public AreaDamage(Attacker, Victims, Factor) : void
    {
        for(let Victim in Victims)
        {
            this.SingleDamage(Attacker, Victim, Factor);
        }
    }
    public SingleDamage(Attacker, Victim, Factor) : void
    {
        let DamageDealt = this.DamageTaken(Attacker, Victim, Factor);
        Victim.Stats.Health -= DamageDealt;     
        let AttackerLifeStealHealth = Attacker.Stats.Health + DamageDealt * Attacker.Stats.LifeSteal/100;
        if(AttackerLifeStealHealth > Attacker.Stats.MaxHealth) AttackerLifeStealHealth = Attacker.Stats.MaxHealth
        Attacker.Stats.Health += DamageDealt * Attacker.Stats.LifeSteal/100;
        if(Victim.Stats.Health < 0)
        {
            Victim.Destroy();
            if(Victim.Data["Enemy"])
            {
                let Item = ItemCollection.Single.DropRandom();
                let WorldItem = new ItemWorld(this._Scene.Data["Player"], this._Scene, Item, Victim.Trans.Translation.X, Victim.Trans.Translation.Y);
            }
        }
    }
    public DamageTaken(Attacker, Attacked, Factor) : number
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
    private RngWithPercent(Chance:number):boolean
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
    public static Single:Damage;
}