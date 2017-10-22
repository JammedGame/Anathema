export { HealthBar };

import Engineer from "./../Engineer";
import { Player } from "./../Unit/Player";
import { GameScene } from "./../GameScene";
import { BarBorder } from "./BarBorder";
import { Stats } from "./../Unit/Stats";

class HealthBar extends Engineer.Engine.Tile
{
    private _PrevLocation: number;
    private _Size: number;
    private _OriginalY: number;
    private _BarBorder: BarBorder;
    private _Player: Player;
    public constructor(Scene: GameScene, Player: Player)
    {
        super();
        this._Player = Player;
        this._Player.DamagedEvent.push(this.Update.bind(this));
        this.Name = "HealtBar";
        this.Fixed = true;
        this._PrevLocation = 0;
        this._Size = 150;
        this._OriginalY = 950;
        this.Trans.Scale = new Engineer.Math.Vertex(this._Size, this._Size, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(150, this._OriginalY, 0.5);
        this.Paint = Engineer.Math.Color.FromRGBA(255,69,0,255);
        this._BarBorder = new BarBorder(this.Trans.Translation);
        Scene.AddSceneObject(this);
        Scene.AddSceneObject(this._BarBorder);
    }
    public Update(Stats:Stats)
    {
        if(Stats.Health == 0) this.Active = false;
        else
        {
            this.Active = true;
            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this._OriginalY + (this._Size - this.Trans.Scale.Y) / 2, 0.5);
            this.Trans.Scale = new Engineer.Math.Vertex(this._Size, this._Size * (Stats.Health * 1.0 / Stats.MaxHealth), 1);
        }
    }
}