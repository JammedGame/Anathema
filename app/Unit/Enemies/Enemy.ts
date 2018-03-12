export { Enemy };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Unit } from "./../Unit";
import { Player } from "./../Player";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { Attack } from "./../Actions/Attacks/Attack";
import { Trait } from "../Trait";
import { Pathfinder } from "../../Pathfinder";

class Enemy extends Unit
{
    protected _AttackIndex:number;
    protected _Player:Player;
    protected _Trait: Trait;
    protected _Pathfinder: Pathfinder;
    public get Pathfinder():Pathfinder { return this._Pathfinder; }
    public set Pathfinder(value:Pathfinder) { this._Pathfinder = value; }
    public constructor(Old:Enemy, Scene?: GameScene)
    {
        super(Old, Scene);
        if(Old != null)
        {
            this._Player = Old._Player;
            this._AttackIndex = Old._AttackIndex;
            this._Collider.Data["EnemyCollider"] = true;
        }
        else
        {
            this.Name = "Enemy";
            this.Trans.Scale = new Engineer.Vertex(100, 150, 1);
            this._AttackIndex = 0;
            this.Data["Enemy"] = true;
            this._Collider.Data["EnemyCollider"] = true;
        }
    }
    public Copy() : Enemy
    {
        return new Enemy(this, this._Scene);
    }
    public Init(Scene:GameScene, Player?:Player) : void
    {
        super.Init(Scene);
        this._Player = Player;
    }
    public Update()
    {
        // Virtual
        if(!this._Scene) return;
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
                if(this._CurrentAction.Set == 2) this.CalculateSpriteSet(this._CurrentAction.Set + this._AttackIndex, this._CurrentAction.Direction);
                else this.CalculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
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
        if(!this._Player) return;
        if(Engineer.Vertex.Distance(this._Collider.Trans.Translation, this._Player.Collider.Trans.Translation) < this._Stats.Radius)
        {
            this._CurrentAction = new Attack(null, "EnemyMove", this);
            this._CurrentAction.Prefs["TargetType"] = "Player";
            this._CurrentAction.Target = this._Player.Collider.Trans.Translation;
        }
        else if(Engineer.Vertex.Distance(this._Collider.Trans.Translation, this._Player.Collider.Trans.Translation) < this._Stats.Sight)
        {
            let NextStep = null;
            this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "EnemyMove", this);
            NextStep = new Engineer.Vertex(this._Player.Collider.Trans.Translation.X, this._Player.Collider.Trans.Translation.Y, 0);
            this._CurrentAction.Target = NextStep;
            this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider", "PlayerCollider"];
        }
    }
}
