export { Enemy };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Unit } from "./../Unit";
import { Player } from "./../Player";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { Attack } from "./../Actions/Attack";

class Enemy extends Unit
{
    private _Player:Player;
    public constructor(Scene: GameScene, X:number, Y:number)
    {
        super(Scene);
        this.Name = "Enemy";
        this.Data["Enemy"] = true;
        this._Player = this._Scene.Data["Character"];

        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(X, Y, 0.5);
        this.CreateCollider();
        this._Collider.Data["EnemyCollider"] = true;

        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
    public Update()
    {
        // Virtual
        if(!this._CurrentAction) this.Behaviour();
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
    }
    public Destroy()
    {
        // Override
        this._Scene.RemoveSceneObject(this._Collider);
        this._Scene.RemoveSceneObject(this);
    }
    protected Behaviour()
    {
        // Virtual
        if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Player.Collider.Trans.Translation) < this._Stats.Radius)
        {
            this._CurrentAction = new Attack(null, "EnemyMove", this);
            this._CurrentAction.Target = this._Player;
        }
        else if(Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Player.Collider.Trans.Translation) < this._Stats.Sight)
        {
            let Location:any = new Engineer.Math.Vertex(this._Player.Collider.Trans.Translation.X, this._Player.Collider.Trans.Translation.Y);
            this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "EnemyMove", this);
            this._CurrentAction.Target = Location;
            this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider", "PlayerCollider"];
        }
    }
}
