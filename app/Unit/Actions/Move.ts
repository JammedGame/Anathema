export { Move };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";

class Move extends Action
{   
    private _Collider:any;
    public get Direction():any { return new Engineer.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0); }
    public constructor(MS:number, Old?:Move, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 1;
        this._Art = 1;
        this._Owner.Stats._MovementSpeed = MS;
    }

    public Apply(Scene:GameScene) : boolean
    {
        // Override
        if(!this._Target) return false;
        this._Collider = this._Owner.Collider;
        if(!this._Collider) return false;
        let Movement = new Engineer.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0);
        if(this._Owner.Data["Player"] && Movement.Length() < 10) return false;
        Movement = Movement.Normalize().Scalar(this._Owner.Stats._MovementSpeed);
        let ColliderTypes:string[] = this.Prefs["ColliderTypes"];
        let Collision = new Engineer.CollisionResult();
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = Scene.FindByData(ColliderTypes[i], true);
            if(Colliders.length == 0) continue;
            if(Colliders.indexOf(this._Collider) != -1) Colliders.splice(Colliders.indexOf(this._Collider), 1);
            Engineer.CollisionUtil.CalculateTypeCollisions(ColliderTypes[i], this._Collider, <Engineer.DrawObject[]>Colliders);
            //console.log(this._Collider.Collision);
            Collision.Combine(this._Collider.Collision.Specific[ColliderTypes[i]]);
        }
        if(Movement.Y < 0 && Collision.Top) Movement.Y = 0;
        if(Movement.Y > 0 && Collision.Bottom) Movement.Y = 0;
        if(Movement.X < 0 && Collision.Left) Movement.X = 0;
        if(Movement.X > 0 && Collision.Right) Movement.X = 0;
        if (Movement.X === 0 && Movement.Y === 0) return false;
        const newLocation = new Engineer.Vertex(
            this._Collider.Trans.Translation.X + Movement.X,
            this._Collider.Trans.Translation.Y + Movement.Y,
            1,
        );
        if(this._Owner.Data["Player"])
        {
            Scene.Trans.Translation = new Engineer.Vertex(
                Scene.Trans.Translation.X - Movement.X,
                Scene.Trans.Translation.Y - Movement.Y,
                1,
            );
            this._Collider.Trans.Translation = newLocation.Copy();
        }
        else
        {
            const playerY = Scene.Player.Trans.Translation.Y;
            let offsetY =  this.absMax((newLocation.Y - playerY) / 1080, 0.5);
            if (offsetY > 0) offsetY += 0.1;
            this._Owner.Trans.Translation = new Engineer.Vertex(
                newLocation.X,
                newLocation.Y - 50,
                1 - offsetY,
            );
            this._Owner.Collider.Trans.Translation = newLocation.Copy();
        }
        if(Engineer.Vertex.Distance(this._Collider.Trans.Translation, this._Target) < 5) return false;
        return true;
    }

    private absMax(value: number, max: number) {
        return Math.abs(value) > max
            ? (value > 0 ? max : -max)
            : value;
    }
}
