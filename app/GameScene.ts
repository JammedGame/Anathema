export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { LevelTilesetCollection } from "./Level/Tilesets/LevelTilesetCollection";
import { LocalSettings } from "./LocalSettings";
import { Player } from "./Unit/Player";
import { Skeleton } from "./Unit/Enemies/Skeleton";
import { Orc } from "./Unit/Enemies/Orc";
import { ItemWorld } from "./Unit/Items/ItemWorld";
import { ItemCollection } from "./Unit/Items/ItemCollection";
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
    private _ItemBank: ItemCollection;
    private _Effect: Effect;
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this.Init();
    }
    public Init(): void
    {
        this.BackColor = Engineer.Math.Color.FromRGBA(0, 0, 0, 255);
        let Enemies = [];
        this._Player = new Player(this);
        for (let i = 0; i < 90; i++) Enemies.push(new Skeleton(this, 0, 0));
        for (let i = 0; i < 10; i++) Enemies.push(new Orc(this, 0, 0));
        let LevelTilesets = new LevelTilesetCollection();
        this._Level = new Level(10, LevelTilesets.Items["Cathedral"], Enemies);
        this._Level.Init(this);
        this._ItemBank = new ItemCollection();
        this._Inventory = new InventoryWindow(this, this._Player.Inventory);
        this._SkillTree = new SkillTree(this);
        this._HealthBar = new HealthBar(this, this._Player);
        this._ManaBar = new ManaBar(this, this._Player);
        this._MainHud = new MainHud(this, this._Player.Actions);
        this._MainHud.InventoryButtonClick.push(this.ToggleInventory.bind(this));
        this._Effect = new Effect(this,"CurseAOE", new Engineer.Math.Vertex(this._Player.Collider.Trans.Translation.X,this._Player.Collider.Trans.Translation.Y,0), new Engineer.Math.Vertex(150,150,0), 5, 5, 0, 3, 0, 2, 2, 5, Engineer.Math.Color.FromRGBA(255, 0, 0, 255));
        this.Events.KeyPress.push(this.KeyPress.bind(this));
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    private KeyPress(G: any, Args: any): void
    {
        if (Args.Key == 105) this.ToggleInventory();
        else if (Args.Key == 116)
        {
            if (this._SkillTree.Visible) this._SkillTree.Hide();
            else this._SkillTree.Show();
        }
    }
    private ToggleInventory() : void
    {
        if (this._Inventory.Visible) this._Inventory.Hide();
        else this._Inventory.Show();
    }
    private SceneUpdate()
    {
        this._Level.Update();
        this._Player.Update();
        this._Effect.Update();
    }
}