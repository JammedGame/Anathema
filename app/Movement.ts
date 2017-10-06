export { Movement };

import { GameScene } from "./GameScene";
import Engineer from "./Engineer";
import { Player, PlayerKeyPress } from "./Player";
import { Mechanics } from "./Mechanics";

class Movement
{
    private _MoveSpeed:number;
    private _Player:Player;
    private _PlayerKeys:PlayerKeyPress;
    private _Scene:GameScene;
    private _Mechanics:Mechanics;
    private _SolidColliders:any[];

    public constructor(Player:Player, Scene:GameScene)
    {
        this._MoveSpeed=5;
        this._Player = Player;
        this._PlayerKeys = new PlayerKeyPress();
        this._Scene = Scene;
        this._Mechanics = new Mechanics(Player, Scene);
        this._SolidColliders = this._Scene.GetObjectsWithData("Solid", true);
                
        this._Scene.Events.KeyDown.push(this.KeyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.KeyUp.bind(this));
        this._Scene.Events.TimeTick.push(this.GameUpdate.bind(this));
    }

    private KeyDown(G:any, Args:any)
    {
        if(Args.Key == Engineer.Engine.KeyType.KEY_W) this._PlayerKeys.Up = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_S) this._PlayerKeys.Down = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_A) this._PlayerKeys.Left = true;
        if(Args.Key == Engineer.Engine.KeyType.KEY_D) this._PlayerKeys.Right = true;
    }
    private KeyUp(G:any, Args:any)
    {
        if(Args.Key == Engineer.Engine.KeyType.KEY_W) this._PlayerKeys.Up = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_S) this._PlayerKeys.Down = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_A) this._PlayerKeys.Left = false;
        if(Args.Key == Engineer.Engine.KeyType.KEY_D) this._PlayerKeys.Right = false;
    }
    private TryMovement(Player:Player, Direction:string, Movement:any)
    {
        Engineer.Util.Collision.CalculateObjectCollisions("Solid", Player, this._SolidColliders);
        if(!Player.Data["Collision_Solid"][Direction])
        {
            let Able:boolean = true;
            if (Able) Player.Trans.Translation = new Engineer.Math.Vertex(Player.Trans.Translation.X + Movement.X, Player.Trans.Translation.Y + Movement.Y, 0);
            Player.Modified = true;
        }       
    }
    private GameUpdate(G:any, Args:any)
    {      
        if(this._PlayerKeys.Up) this.TryMovement(this._Player, "Top", new Engineer.Math.Vertex(0, -this._MoveSpeed, 0));
        if(this._PlayerKeys.Down) this.TryMovement(this._Player, "Bottom", new Engineer.Math.Vertex(0, +this._MoveSpeed, 0));
        if(this._PlayerKeys.Left) this.TryMovement(this._Player, "Left", new Engineer.Math.Vertex(-this._MoveSpeed, 0, 0));
        if(this._PlayerKeys.Right) this.TryMovement(this._Player, "Right", new Engineer.Math.Vertex(+this._MoveSpeed, 0, 0));               
    }
}