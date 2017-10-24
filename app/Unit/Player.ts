export { Player };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { Unit } from "./Unit";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Attack } from "./Actions/Attack";
import { Traits } from "./Trait" 
import { Inventory } from "./Items/Inventory";
import { SpriteSetLoader } from "./../Util/SpriteSetLoader";

class Player extends Unit
{
    private _PlayerRightClick: boolean;
    private _PlayerLeftClick: boolean;
    private _Inventory: Inventory;
    public get Inventory():Inventory { return this._Inventory; }
    public constructor(Scene: GameScene)
    {
        super(Scene);
        this.Name = "Player";
        this.Fixed = true;
        this.Data["Player"] = true;

        this._Inventory = new Inventory();

        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.CreateCollider();
        this._Collider.Data["PlayerCollider"] = true;

        SpriteSetLoader.LoadSets(this, "Human");

        this._Scene.Events.MouseDown.push(this.MouseClick.bind(this));

        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
    private MouseClick(G: any, Args: any)
    {
        let Location = new Engineer.Math.Vertex(Args.Location.X - this._Scene.Trans.Translation.X, Args.Location.Y - this._Scene.Trans.Translation.Y);
        if (Args.MouseButton == 0)
        {
            let Enemies = this._Scene.GetObjectsWithData("Enemy", true);
            let Attack:boolean = false;
            for(let i = 0; i < Enemies.length; i++)
            {
                if(Engineer.Math.Vertex.Distance(Enemies[i].Trans.Translation, Location) < Enemies[i].Trans.Scale.Y)
                {
                    if(Engineer.Math.Vertex.Distance(Enemies[i].Trans.Translation, this._Collider.Trans.Translation) < this._Stats.Radius)
                    {
                        Attack = true;
                        this.ActionAttack(Enemies[i]);
                        break;
                    }    
                }
            }
            if(!Attack) this.ActionMove(Location);
        }
        if (Args.MouseButton == 2) {}
    }
    private ActionMove(Location: any)
    {
        this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "PlayerMove", this);
        this._CurrentAction.Target = Location;
        this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
    }
    private ActionAttack(Enemy: any)
    {
        this._CurrentAction = new Attack(null, "PlayerAttack", this);
        this._CurrentAction.Target = Enemy;
    }
}