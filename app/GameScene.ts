export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { LocalSettings } from "./LocalSettings";
import { Player } from "./Unit/Player";
import { Skeleton } from "./Enemy/Skeleton";
import { Movement } from "./Movement";
import { ItemWorld } from "./Items/ItemWorld";
import { Inventory } from "./UI/Inventory";
import { SkillTree } from "./UI/SkillTree";
import { HealthBar } from "./UI/HealthBar";
import { ManaBar } from "./UI/ManaBar";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Level: Level;
    private _Player: Player;
    private _Skeleton: Skeleton;
    private _ItemWorld: ItemWorld;
    private _Inventory: Inventory;
    private _Movement: Movement;
    private _SkillTree: SkillTree;
    private _HealthBar: HealthBar;
    private _ManaBar: ManaBar;
    public get Movement(): Movement { return this._Movement; }
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this.BackColor = Engineer.Math.Color.FromRGBA(0, 0, 0, 255);
        this._Level = new Level();
        this.Init();
    }
    public Init(): void
    {
        this._Level.Init(this);
        this._Player = new Player(this);
        for (let i = 0; i < 10; i++)
        {
            //this._Skeleton = new Skeleton(this, Math.random() * 1980, Math.random() * 1080);
        }
        //this._Movement = new Movement(this._Player, this);        
        this._Inventory = new Inventory(this);
        this._SkillTree = new SkillTree(this);
        this._HealthBar = new HealthBar(this, this._Player);
        this._ManaBar = new ManaBar(this, this._Player);
        for(let i=0;i<20;i++){
        this._ItemWorld = new ItemWorld(this._Player, this,this._Inventory,"BeastSlayer",500,500);
        }
        this.Events.KeyPress.push(this.KeyPress.bind(this));
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    private KeyPress(G: any, Args: any): void
    {
        if (Args.Key == 105)
        {
            if (this._Inventory.Visible) this._Inventory.Hide();
            else this._Inventory.Show();
        }
        else if (Args.Key == 116)
        {
            if (this._SkillTree.Visible) this._SkillTree.Hide();
            else this._SkillTree.Show();
        }
    }
    private SceneUpdate()
    {
        this._Player.Update();
    }
}