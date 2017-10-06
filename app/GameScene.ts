export { GameScene };

import Engineer from "./Engineer";

import { LocalSettings } from "./LocalSettings";

class GameScene extends Engineer.Engine.Scene2D
{
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this.BackColor = Engineer.Math.Color.FromRGBA(0,0,0,255);
    }
    public Init() : void
    {

    }
    private KeyPress(G:any, Args:any) : void
    {
        if(Args.KeyDown == "space")
        {
            
        }
    }
}