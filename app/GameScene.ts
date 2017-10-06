export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level";
import { LocalSettings } from "./LocalSettings";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Level:Level;
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this.BackColor = Engineer.Math.Color.FromRGBA(0,0,0,255);
        this._Level = new Level();
        this.Init();
    }
    public Init() : void
    {
        this._Level.Init(this);
    }
    private KeyPress(G:any, Args:any) : void
    {
        if(Args.KeyDown == "space")
        {
            
        }
    }
}