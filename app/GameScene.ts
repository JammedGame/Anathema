export { GameScene };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
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
import { Damage } from "./Unit/Damage";
import { Projectile } from "./Unit/Projectiles/Projectile";

class GameScene extends Engineer.Scene2D
{
    private _Pause:boolean;
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
    private _Projectiles: Projectile[];
    public get Pause():boolean { return this._Pause; }
    public set Pause(value:boolean) { this._Pause = value; }
    public get Player():Player { return this._Player; }
    public set Player(value:Player) { this._Player = value; }
    public get Projectiles():Projectile[] { return this._Projectiles; }
    public constructor()
    {
        super();
        this.Name = "GameScene";
        this._Pause = false;
        this._Projectiles = [];
        this._Player = new Player(null, this);
    }
    public Init(Level:Level): void
    {
        let DamageCalculation = new Damage(this);
        this.BackColor = Engineer.Color.FromRGBA(0, 0, 0, 255);
        this._Level = Level;
        this._Level.Init(this);
        this._ItemBank = new ItemCollection();
        this._Inventory = new InventoryWindow(this, this._Player.Inventory);
        this._SkillTree = new SkillTree(this);
        this._HealthBar = new HealthBar(this, this._Player);
        this._ManaBar = new ManaBar(this, this._Player);
        this._MainHud = new MainHud(this, this._Player.Actions);
        this._MainHud.InventoryButtonClick.push(this.ToggleInventory.bind(this));
        this.Events.KeyPress.push(this.KeyPress.bind(this));
        this.Events.TimeTick.push(this.SceneUpdate.bind(this));
    }
    private KeyPress(G: any, Args: any): void
    {
        if(this._Pause) return;
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
        if(this._Pause) return;
        for(let i = 0; i < this._Projectiles.length; i++) this._Projectiles[i].Update();
        if(this._Level) this._Level.Update();
        if(this._Player)
        {
            this._Player.Update();
            if(this._HealthBar) this._HealthBar.Update(this._Player.Stats);
            if(this._ManaBar) this._ManaBar.Update(this._Player.Stats);
        }
    }
}