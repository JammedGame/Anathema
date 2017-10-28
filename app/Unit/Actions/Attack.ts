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
    private _Collider:any;
    private _Victim:any;
    private _Scene:GameScene;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0); }
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
            this._Victim.Stats.Health -= this.DamageTaken(this._Owner);
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
    private DamageTaken(_Owner)
    { 
       let DMGTaken = 0; 

        if(_Owner.Stats.FireDamage){
        let Damage = _Owner.Stats.FireDamage;
        let Resist = this._Victim.Stats.FireResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }
    
        if(_Owner.Stats.ColdDamage){
        let Damage = _Owner.Stats.ColdDamage;
        let Resist = this._Victim.Stats.ColdResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }
        
        if(_Owner.Stats.LightningDamage){
        let Damage = _Owner.Stats.LightningDamage;
        let Resist = this._Victim.Stats.LightningResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }

        if(_Owner.Stats.PierceDamage){
        let Damage = _Owner.Stats.PierceDamage;
        let Resist = this._Victim.Stats.PierceResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }

        if(_Owner.Stats.SlashDamage){
        let Damage = _Owner.Stats.SlashDamage;
        let Resist = this._Victim.Stats.SlashResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }
    
        if(_Owner.Stats.BluntDamage){
        let Damage = _Owner.Stats.BluntDamage;
        let Resist = this._Victim.Stats.BluntResist;
        DMGTaken += (1 - Resist/(Damage+Resist))*Damage;
        }
    
        return DMGTaken;
    }

}
