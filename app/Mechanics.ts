export { Mechanics };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Player, PlayerKeyPress } from "./Player";

class Mechanics
{
    private _Player:Player;    
    private _Scene:GameScene;
    public constructor(Player:Player, Scene:GameScene)
    {
        this._Player = Player;
        this._Scene = Scene;
    }
}