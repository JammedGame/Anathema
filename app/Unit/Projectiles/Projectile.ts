export { Projectile };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Unit } from "./../Unit";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";

class Projectile extends Unit
{
    protected _Area:boolean;
    protected _RadiusDamage:boolean;
    protected _Radius:number;
    protected _DamageFactor:number;
    public Prefs: { [key: string]:any; };
    public constructor(Scene:GameScene, ColliderTypes:string[])
    {
        super(Scene);
        this._Area = false;
        this._RadiusDamage = false;
        this._Radius = 100;
        this._DamageFactor = 1.0;
        this.Prefs["ColliderTypes"] = ColliderTypes;
    }
    public Init(Target:any) : void
    {
        this._CurrentAction = new Move(this.Stats.MovementSpeed, null, "ProjectileMove", this);
        this._CurrentAction.Prefs["ColliderTypes"] = this.Prefs["ColliderTypes"];
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
            else this.CalculateSpriteSet(0, this._LastDirection);
        }
        else this.Apply();
    }
    protected Apply() : void
    {
        // Virtual
        let ColliderTypes:string[] = this.Prefs["ColliderTypes"];
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = this._Scene.GetObjectsWithData(ColliderTypes[i], true);
            if(Colliders.length == 0) continue;
            for(let j = 0; j < Colliders.length; j++)
            {
                if(!this._RadiusDamage && Engineer.Math.Collision.Check(this._Collider, Colliders[i]).Collision)
                {
                    this.Damage();
                    if(!this._Area) break;
                }
                else if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, Colliders[i].Trans.Translation))
                {
                    this.Damage();
                    if(!this._Area) break;
                }
            }
        }
    }
    protected Damage() : void
    {
        // Virtual
    }
}
