export { PlayerActions };

import { GameScene } from "./../GameScene";
import { Player } from "./Player";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Attack } from "./Actions/Attack";

class PlayerActions
{
    private _LeftMouse:Action;
    private _RightMouse:Action;
    private _Player:Player;
    private _Scene:GameScene;
    private _Actions:Action[];
    private _ActionMove:Action;
    public constructor(Player:Player, Scene:GameScene)
    {
        this._Player = Player;
        this._Scene = Scene;
        this.Init();
    }
    private Init()
    {
        this._Actions = [];
        this._ActionMove = new Move(this._Player.Stats.MovementSpeed, null, "PlayerMove", this._Player);
        this._ActionMove.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
        this._Actions.push(this._ActionMove);
        let ActionAttack:Attack = new Attack(null, "PlayerAttack", this._Player);
        ActionAttack.Prefs["TargetType"] = "Enemy";
        this._Actions.push(ActionAttack);
        this._LeftMouse = ActionAttack;
        this._RightMouse = ActionAttack;
    }
    public Apply(Code:string, Target:any)
    {
        if(Code == "LM" && this._LeftMouse)
        {
            this._LeftMouse.Target = Target;
            if(this._LeftMouse.Apply(this._Scene))
            {
                this._Player.UpdateCurrentAction(this._LeftMouse);
            }
            else
            {
                this._ActionMove.Target = Target;
                this._Player.UpdateCurrentAction(this._ActionMove);
            }
        }
        else if(Code == "RM" && this._RightMouse)
        {
            this._RightMouse.Target = Target;
            this._Player.UpdateCurrentAction(this._RightMouse);
        }
    }
}