export { Teleport };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { AfterAnimation } from "./AfterAnimation";
import { GameScene } from "./../../GameScene";

class Teleport extends AfterAnimation
{
    private _Speed:number;
    public constructor(Old?:Teleport, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 5;
        this._Art = 4;
        this._ManaCost = 10;
        this._CooldownLength = 0.5;
    }
    protected Check()
    {
        // Override
        if(this._Cooldown) return false;
        let Collider = this._Owner.Collider.Copy();
        Collider.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        Collider.Trans.Translation = this._Target;
        let ColliderTypes:string[] = this.Prefs["ColliderTypes"];
        let Collision = new Engineer.Math.CollisionValue();
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = this._Scene.GetObjectsWithData(ColliderTypes[i], true);
            if(Colliders.length == 0) continue;
            if(Colliders.indexOf(Collider) != -1) Colliders.splice(Colliders.indexOf(Collider), 1);
            Engineer.Util.Collision.CalculateObjectCollisions(ColliderTypes[i], Collider, Colliders);
            Collision = Engineer.Math.CollisionValue.Combine(Collision, Collider.Data["Collision_" + ColliderTypes[i]]);
        }
        if(Collision.Collision) return false;
        return true;
    }
    protected ApplyAction()
    {
        // Override
        if(this._Owner.Data["Player"])
        {
            this._Scene.Trans.Translation = new Engineer.Math.Vertex(960 - this._Target.X, 540 - this._Target.Y, 0);
            this._Owner._Collider.Trans.Translation = new Engineer.Math.Vertex(this._Target.X, this._Target.Y, 2);
        }
        else
        {
            this._Owner.Trans.Translation = this._Owner.Collider.Trans.Translation = new Engineer.Math.Vertex(this._Target.X, this._Target.Y, 2);
        }
        this._Cooldown = true;
        setTimeout(this.RemoveCooldown.bind(this), this._CooldownLength * 1000);
    }
    private RemoveCooldown()
    {
        this._Cooldown = false;
    }
}
