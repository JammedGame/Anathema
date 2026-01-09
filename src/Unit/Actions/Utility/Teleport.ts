export { Teleport };

import * as TBX from 'toybox-engine';

import { Action } from "../Action";
import { AfterAnimation } from "../AfterAnimation";
import { GameScene } from "../../../GameScene";

class Teleport extends AfterAnimation
{
    private _CollisionService: TBX.ObjectCollisionService;

    public constructor(Old?:Teleport, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 5;
        this._Art = 22;
        this._ManaCost = 10;
        this._CooldownLength = 0.5;
        this._CollisionService = TBX.Inject(TBX.ObjectCollisionService);
    }
    protected Check()
    {
        // Override
        if(this._Cooldown) return false;
        let Collider = this._Owner.Collider.Copy();
        Collider.Active = true;
        Collider.Collision = TBX.CollisionType.Radius;
        Collider.Trans.Translation = this._Target;
        let ColliderTypes:string[] = this.Prefs["ColliderTypes"];
        let Collision = new TBX.CollisionResult();
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = this._Scene.FindByData(ColliderTypes[i], true);
            if(Colliders.length == 0) continue;
            if(Colliders.indexOf(Collider) != -1) Colliders.splice(Colliders.indexOf(Collider), 1);
            this._CollisionService.CalculateTypeCollisions(ColliderTypes[i], Collider, <TBX.DrawObject[]>Colliders);
            Collision.Combine(Collider.Collision.Specific[ColliderTypes[i]]);
        }
        if(Collision.Collision) return false;
        return true;
    }
    protected ApplyAction()
    {
        // Override
        if(this._Owner.Data["Player"])
        {
            this._Scene.Trans.Translation = new TBX.Vertex(960 - this._Target.X, 540 - this._Target.Y, 0);
            this._Owner._Collider.Trans.Translation = new TBX.Vertex(this._Target.X, this._Target.Y, 2);
        }
        else
        {
            this._Owner.Trans.Translation = this._Owner.Collider.Trans.Translation = new TBX.Vertex(this._Target.X, this._Target.Y, 2);
        }
        this._Cooldown = true;
        setTimeout(this.RemoveCooldown.bind(this), this._CooldownLength * 1000);
    }
    private RemoveCooldown()
    {
        this._Cooldown = false;
    }
}
