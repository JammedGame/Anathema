export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { LocalSettings } from "./LocalSettings";
import {Player} from "./Player";
import {Skeleton} from "./Enemy/Skeleton";
import {Movement} from "./Movement";
import {Items} from "./Items";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Level:Level;
    private _Player:Player;
    private _Skeleton:Skeleton;
    private _Movement:Movement; 
    private _Item: Items;

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
        this._Player=new Player(this);  
        this._Skeleton=new Skeleton(this);  
        this._Movement = new Movement(this._Player, this);  
        this._Item=new Items(this._Player,this);
        //this.Events.KeyPress.push(this.KeyPress);
    }
    private KeyPress(G:any, Args:any) : void
    {

    }
}