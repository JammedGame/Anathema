export { Attack };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { Damage } from "./../../Damage";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { ItemWorld } from "./../../Items/ItemWorld";
import { ItemCollection } from "./../../Items/ItemCollection";
import { Stats } from "./../../Stats";
import { Projectile } from "./../../Projectiles/Projectile";
import { Arrow } from "./../../Projectiles/Arrow";

class Attack extends AfterAnimation
{
    private _Range:boolean;
    private _BleedCounter:number;
    private _Victim:any;
    private _Projectile:Projectile;
    public get Range():boolean { return this._Range; }
    public set Range(value:boolean) { this._Range = value; }
    public get Direction():any { return new Engineer.Vertex(this._Target.X - this._Owner.Collider.Trans.Translation.X, this._Target.Y - this._Owner.Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Attack, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 2;
        this._Art = 2;
        this._Range = false;
        this._BleedCounter = 0;
    }
    protected Check() : boolean
    {
        // Override
        if(!this._Projectile && this._Range)
        {
            this._Projectile = new Arrow(null, [this.Prefs["TargetType"] + "Collider"], this._Scene);
            this._Projectile.Stats = this._Owner.Stats;
        }
        let Collider = this._Owner.Collider;
        if(!Collider) return false;
        let Enemies:any = <any[]>this._Scene.GetObjectsWithData(this.Prefs["TargetType"], true);
        this._Victim = null;
        for(let i = 0; i < Enemies.length; i++)
        {
            if(Engineer.Vertex.Distance(Enemies[i].Collider.Trans.Translation, this._Target) < Enemies[i].Trans.Scale.Y)
            {
                if(Engineer.Vertex.Distance(Enemies[i].Collider.Trans.Translation, Collider.Trans.Translation) < this._Owner.Stats.Radius || this._Range)
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
            if(!this._Range) Damage.Single.SingleDamage(this._Owner, this._Victim, 1.0);
            else
            {
                let NewProjectile:Projectile = this._Projectile.Copy();
                NewProjectile.Trans.Translation = this._Owner.Collider.Trans.Translation;
                NewProjectile.InitProjectile(this._Victim.Trans.Translation);
                NewProjectile.Stats.MovementSpeed = 25;
                this._Scene.AddSceneObject(NewProjectile);
                this._Scene.Projectiles.push(NewProjectile);
            }
        }
    }
}
