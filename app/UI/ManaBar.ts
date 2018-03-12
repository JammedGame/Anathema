export { ManaBar };

import Engineer from "./../Engineer";
import { Player } from "./../Unit/Player";
import { GameScene } from "./../GameScene";
import { BarBorder } from "./BarBorder";
import { Stats } from "./../Unit/Stats";

class ManaBar extends Engineer.Tile
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
        this.Name = "ManaBar";
        this.Fixed = true;
        this._PrevLocation = 0;
        this._Size = 150;
        this._OriginalY = 1000;
        this.Trans.Scale = new Engineer.Vertex(this._Size, this._Size, 1);
        this.Trans.Translation = new Engineer.Vertex(1270, this._OriginalY, 0.5);
        this.Paint = Engineer.Color.FromRGBA(75,0,130,255);
        this._BarBorder = new BarBorder(this.Trans.Translation);
        Scene.AddSceneObject(this);
        Scene.AddSceneObject(this._BarBorder);
    }
    public Update(Stats:Stats)
    {
        if(Stats.Mana <= 0) this.Active = false;
        else
        {
            this.Active = true;
            this.Trans.Translation = new Engineer.Vertex(this.Trans.Translation.X, this._OriginalY + (this._Size - this.Trans.Scale.Y) / 2, 0.5);
            this.Trans.Scale = new Engineer.Vertex(this._Size, this._Size * (Stats.Mana * 1.0 / Stats.MaxMana), 1);
        }
    }
}