export { Move };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { GameScene } from "./../../GameScene";

class Move extends Action
{
    private _Speed:number;
    private _Collider:any;
    public get Direction():any { return new Engineer.Math.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0); }
    public constructor(Speed:number, Old?:Move, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Set = 1;
        this._Speed = Speed;
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Override
        this._Collider = this._Owner.Collider;
        if(!this._Collider) return false;
        let Movement = new Engineer.Math.Vertex(this._Target.X - this._Collider.Trans.Translation.X, this._Target.Y - this._Collider.Trans.Translation.Y, 0);
        Movement = Movement.Normalize().Scalar(this._Speed);
        let ColliderTypes:string[] = this.Prefs["ColliderTypes"];
        let Collision = new Engineer.Math.CollisionValue();
        for(let i = 0; i < ColliderTypes.length; i++)
        {
            let Colliders = Scene.GetObjectsWithData(ColliderTypes[i], true);
            if(Colliders.indexOf(this._Collider) != -1) Colliders.splice(Colliders.indexOf(this._Collider), 1);
            Engineer.Util.Collision.CalculateObjectCollisions(ColliderTypes[i], this._Collider, Colliders);
            Collision = Engineer.Math.CollisionValue.Combine(Collision, this._Collider.Data["Collision_" + ColliderTypes[i]]);
        }
        if(Movement.Y < 0 && Collision.Top) return false;
        if(Movement.Y > 0 && Collision.Bottom) return false;
        if(Movement.X < 0 && Collision.Left) return false;
        if(Movement.X > 0 && Collision.Right) return false;
        if(this._Owner.Data["Player"])
        {
            Scene.Trans.Translation = new Engineer.Math.Vertex(Scene.Trans.Translation.X - Movement.X, Scene.Trans.Translation.Y - Movement.Y, 0);
            this._Collider.Trans.Translation = new Engineer.Math.Vertex(this._Collider.Trans.Translation.X + Movement.X, this._Collider.Trans.Translation.Y + Movement.Y, 0);
        }
        else
        {
            this._Owner.Trans.Translation = this._Collider.Trans.Translation = new Engineer.Math.Vertex(this._Collider.Trans.Translation.X + Movement.X, this._Collider.Trans.Translation.Y + Movement.Y, 0.3);
        }
        if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Target) < 5) return false;
        return true;
    }
}
