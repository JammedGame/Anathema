export { Player };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { Unit } from "./Unit";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Attack } from "./Actions/Attack";
import { Traits } from "./Trait" 
import { Inventory } from "./Items/Inventory";
import { SpriteSetLoader } from "./../Util/SpriteSetLoader";
import { EquipedCollection } from "./Items/EquipedCollection";

class Player extends Unit
{
    private _PlayerRightClick: boolean;
    private _PlayerLeftClick: boolean;
    private _Inventory: Inventory;
    private _EquipedCollection: EquipedCollection;
    private _EquipedItems:any[];
    public get Inventory():Inventory { return this._Inventory; }
    public constructor(Scene: GameScene)
    {
        super(Scene);
        this.Name = "Player";
        this.Fixed = true;
        this.Data["Player"] = true;

        this._Inventory = new Inventory();
        this._EquipedCollection = new EquipedCollection();
        this._EquipedItems = [];
        this._Inventory.OnEquip.push(this.Equip.bind(this));

        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.CreateCollider();
        this._Collider.Data["PlayerCollider"] = true;
        SpriteSetLoader.LoadSets(this, "Human");
        this._Scene.Events.MouseDown.push(this.MouseClick.bind(this));
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);

        this.Equip();
    }
    private MouseClick(G: any, Args: any)
    {
        let Location = new Engineer.Math.Vertex(Args.Location.X - this._Scene.Trans.Translation.X, Args.Location.Y - this._Scene.Trans.Translation.Y);
        if (Args.MouseButton == 0)
        {
            let Enemies = this._Scene.GetObjectsWithData("Enemy", true);
            let Attack:boolean = false;
            for(let i = 0; i < Enemies.length; i++)
            {
                if(Engineer.Math.Vertex.Distance(Enemies[i].Trans.Translation, Location) < Enemies[i].Trans.Scale.Y)
                {
                    if(Engineer.Math.Vertex.Distance(Enemies[i].Trans.Translation, this._Collider.Trans.Translation) < this._Stats.Radius)
                    {
                        Attack = true;
                        this.ActionAttack(Enemies[i]);
                        break;
                    }    
                }
            }
            if(!Attack) this.ActionMove(Location);
        }
        if (Args.MouseButton == 2) {}
    }
    private Equip()
    {
        for(let i = 0; i < this._EquipedItems.length; i++) this._Scene.RemoveSceneObject(this._EquipedItems[i]);
        this._EquipedItems = [];
        if(this._Inventory.Chest) this.EquipItem(this._Inventory.Chest.ArtEquipedIndex, 1.2);
        else this.EquipItem(0, 1.2);
        if(this._Inventory.Greaves) this.EquipItem(this._Inventory.Greaves.ArtEquipedIndex, 1.2);
        else this.EquipItem(1, 1.2);
        if(this._Inventory.Boots) this.EquipItem(this._Inventory.Boots.ArtEquipedIndex, 1.2);
        if(this._Inventory.Gloves) this.EquipItem(this._Inventory.Gloves.ArtEquipedIndex, 1.2);
        if(this._Inventory.Head) this.EquipItem(this._Inventory.Head.ArtEquipedIndex, 1.2);
    }
    private EquipItem(Index:number, Offset:number)
    {
        let Sprite = this._EquipedCollection.Items[Index].Copy();
        Sprite.Fixed = true;
        Sprite.Trans.Scale = new Engineer.Math.Vertex(100, 150, 1);
        Sprite.Trans.Translation = new Engineer.Math.Vertex(960, 540, Offset);
        this._EquipedItems.push(Sprite);
        this._Scene.AddSceneObject(Sprite);
    }
    private ActionMove(Location: any)
    {
        this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "PlayerMove", this);
        this._CurrentAction.Target = Location;
        this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
    }
    private ActionAttack(Enemy: any)
    {
        this._CurrentAction = new Attack(null, "PlayerAttack", this);
        this._CurrentAction.Target = Enemy;
    }
    private UpdateStats()
    {
        this._Stats.Reset();
        this._Traits.Apply(this._Stats);
        this._Inventory.Apply(this._Stats);
    }
    protected CalculateSpriteSet(Set:number, Direction:any)
    {
        let DirectionIndex = 0;
        if(Direction != null) DirectionIndex = this.CalculateDirection(Direction);
        let SetIndex = Set * 4 + DirectionIndex;
        this.UpdateSpriteSet(SetIndex);
        for(let i = 0; i < this._EquipedItems.length; i++) this._EquipedItems[i].UpdateSpriteSet(SetIndex);
    }
}