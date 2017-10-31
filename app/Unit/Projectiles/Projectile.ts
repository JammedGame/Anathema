export { Projectile };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Unit } from "./../Unit";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { Damage } from "./../Damage";

class Projectile extends Unit
{
    protected _Area:boolean;
    protected _RadiusDamage:boolean;
    protected _Radius:number;
    protected _DamageFactor:number;
    public constructor(Old:Projectile, Scene:GameScene, ColliderTypes:string[])
    {
        super(Old, Scene);
        if(Old != null)
        {
            this._Area = Old._Area;
            this._RadiusDamage = Old._RadiusDamage;
            this._Radius = Old._Radius;
            this._DamageFactor = Old._DamageFactor;
            this._Collider = Old._Collider;
        }
        else
        {
            this._Area = false;
            this._RadiusDamage = false;
            this._Radius = 100;
            this._DamageFactor = 1.0;
            this.Data["ColliderTypes"] = ColliderTypes;
            this.CreateCollider();
            this._Collider.Data["ProjectileCollider"] = true;
        }
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
    public Copy() : Projectile
    {
        return new Projectile(this, this._Scene, null);    
    }
    public Init(Target:any) : void
    {
        this._Collider.Trans.Translation = this.Trans.Translation;
        this._CurrentAction = new Move(this.Stats.MovementSpeed, null, "ProjectileMove", this);
        this._CurrentAction.Prefs["ColliderTypes"] = this.Data["ColliderTypes"];
        this._CurrentAction.Target = Target;
    }
    public Update() : void
    {
        // Virtual
        if(this._CurrentAction)
        {
            if(!this._CurrentAction.Apply(this._Scene))
            {
                this._CurrentAction = null;
            }
            if(this._CurrentAction)
            {
                this._LastDirection = this._CurrentAction.Direction;
                this.CalculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
            }
        }
        else this.Apply();
    }
    public Destroy()
    {
        // Override
        this.Active = false;
        this._Scene.RemoveSceneObject(this._Collider);
        this._Scene.RemoveSceneObject(this);
    }
    protected Apply() : void
    {
        // Virtual
        let ColliderTypes:string[] = this.Data["ColliderTypes"];
        let Hit = false;
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = this._Scene.GetObjectsWithData(ColliderTypes[i], true);
            if(Colliders.length == 0) continue;
            for(let j = 0; j < Colliders.length; j++)
            {
                if(!this._RadiusDamage && Engineer.Util.Collision.Check(this._Collider, Colliders[i]).Collision)
                {
                    this.Damage(Colliders[i].Data["Owner"]);
                    Hit = true;
                    if(!this._Area) break;
                }
                else if(this._RadiusDamage && Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, Colliders[i].Trans.Translation))
                {
                    this.Damage(Colliders[i].Data["Owner"]);
                    Hit = true;
                    if(!this._Area) break;
                }
            }
            if(Hit) break;
        }
        this.Destroy();
    }
    protected Damage(Victim:Unit) : void
    {
        Damage.Single.SingleDamage(this, Victim, this._DamageFactor);
    }
}
