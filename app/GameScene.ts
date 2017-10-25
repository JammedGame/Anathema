export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { LocalSettings } from "./LocalSettings";
import { Player } from "./Unit/Player";
import { Skeleton } from "./Unit/Enemies/Skeleton";
import { ItemWorld } from "./Unit/Items/ItemWorld";
import { ItemBank } from "./Unit/Items/ItemBank";
import { InventoryWindow } from "./UI/Inventory/InventoryWindow";
import { SkillTree } from "./UI/SkillTree";
import { HealthBar } from "./UI/HealthBar";
import { ManaBar } from "./UI/ManaBar";
import { MainHud } from "./UI/MainHud";
import { Effect } from "./Unit/Actions/Effect";

class GameScene extends Engineer.Engine.Scene2D
{
    private _Level: Level;
    private _Player: Player;
    private _Skeleton: Skeleton;
    private _ItemWorld: ItemWorld;
    private _Inventory: InventoryWindow;
    private _SkillTree: SkillTree;
    private _HealthBar: HealthBar;
    private _ManaBar: ManaBar;
    private _MainHud: MainHud;
    private _ItemBank: ItemBank;
    private _Effect: Effect;
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
            this._Skeleton = new Skeleton(this, Math.random() * 1980, Math.random() * 1080);
        } 
        this._ItemBank = new ItemBank();
        this._Inventory = new InventoryWindow(this, this._Player.Inventory);
        this._SkillTree = new SkillTree(this);
        this._HealthBar = new HealthBar(this, this._Player);
        this._ManaBar = new ManaBar(this, this._Player);
        this._MainHud = new MainHud(this);
        this._ItemWorld = new ItemWorld(this._Player, this, this._ItemBank.Items[1],500, 500);
        this._ItemWorld = new ItemWorld(this._Player, this, this._ItemBank.Items[2],600, 500);
        this._ItemWorld = new ItemWorld(this._Player, this, this._ItemBank.Items[3],700, 500);
        this._ItemWorld = new ItemWorld(this._Player, this, this._ItemBank.Items[4],800, 500);
        this._ItemWorld = new ItemWorld(this._Player, this, this._ItemBank.Items[0],500, 500);
        this._Effect = new Effect(this,"CurseAOE", new Engineer.Math.Vertex(600,600,0), new Engineer.Math.Vertex(150,150,0), 5, 5, 0.0166, 50, 0, 10, 10, 5, Engineer.Math.Color.FromRGBA(255, 0, 0, 255));
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
        this._Skeleton.Update();
        this._Effect.Update();
    }
}