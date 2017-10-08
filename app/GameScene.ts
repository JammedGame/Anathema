export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { LocalSettings } from "./LocalSettings";
import {Player} from "./Player";
import {Skeleton} from "./Enemy/Skeleton";
import {Movement} from "./Movement";
import {Items} from "./Items";
import {HealthBar} from "./HealthBar";
import {Inventory} from "./UI/Inventory";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Level:Level;
    private _Player:Player;
    private _Skeleton:Skeleton;
    private _Movement:Movement; 
    private _Item: Items;    
    private _Inventory:Inventory;
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
        this._Inventory = new Inventory(this);
        this.Events.KeyPress.push(this.KeyPress.bind(this));
    }
    private KeyPress(G:any, Args:any) : void
    {
        if(Args.Key == 105)
        {
            if(this._Inventory.Visible) this._Inventory.Hide();
            else this._Inventory.Show();
        }
    }
}