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
import { PlayerActions } from "./PlayerActions";

class Player extends Unit
{
    private _LeftClick: boolean;
    private _RightClick: boolean;
    private _LastMouseLocation: any;
    private _Inventory: Inventory;
    private _EquipedCollection: EquipedCollection;
    private _Actions:PlayerActions;
    private _EquipedItems:any[];
    public get Inventory():Inventory { return this._Inventory; }
    public constructor(Scene: GameScene)
    {
        super(Scene);
        this.Name = "Player";
        this.Fixed = true;
        this.Data["Player"] = true;
        Scene.Data["Player"] = this;

        this._Inventory = new Inventory();
        this._EquipedCollection = new EquipedCollection();
        this._EquipedItems = [];
        this._Inventory.OnEquip.push(this.Equip.bind(this));
        this._Actions = new PlayerActions(this, Scene);

        Scene.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.CreateCollider();
        this._Collider.Data["PlayerCollider"] = true;
        SpriteSetLoader.LoadSets(this, "Human");
        this._Scene.Events.MouseDown.push(this.MouseDown.bind(this));
        this._Scene.Events.MouseUp.push(this.MouseUp.bind(this));
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);

        this.Equip();
    }
    private MouseDown(G: any, Args: any)
    {
        if (Args.MouseButton == 0) this._LeftClick = true;
        if (Args.MouseButton == 2) this._RightClick = true;
    }
    private MouseUp(G: any, Args: any)
    {
        if (Args.MouseButton == 0) this._LeftClick = false;
        if (Args.MouseButton == 2) this._RightClick = false;
    }
    private MouseMove(G: any, Args: any)
    {
        this._LastMouseLocation = Args.Location;
    }
    public UpdateCurrentAction(Action:Action)
    {
        this._CurrentAction = Action;
    }
    public Update()
    {
        if(this._LastMouseLocation)
        {
            let Location = new Engineer.Math.Vertex(this._LastMouseLocation.X - this._Scene.Trans.Translation.X, this._LastMouseLocation.Y - this._Scene.Trans.Translation.Y);
            if (this._LeftClick) this._Actions.Apply("LM", Location);
            if (this._RightClick) this._Actions.Apply("RM", Location);
        }
        super.Update();
    }
    private Equip()
    {
        for(let i = 0; i < this._EquipedItems.length; i++) this._Scene.RemoveSceneObject(this._EquipedItems[i]);
        this._EquipedItems = [];
        if(this._Inventory.Greaves) this.EquipItem(this._Inventory.Greaves.ArtEquipedIndex, 1.2);
        else this.EquipItem("RedPants", 1.2);
        if(this._Inventory.Chest) this.EquipItem(this._Inventory.Chest.ArtEquipedIndex, 1.2);
        else this.EquipItem("WhiteShirt", 1.2);
        if(this._Inventory.Boots) this.EquipItem(this._Inventory.Boots.ArtEquipedIndex, 1.2);
        if(this._Inventory.Gloves) this.EquipItem(this._Inventory.Gloves.ArtEquipedIndex, 1.2);
        if(this._Inventory.Head) this.EquipItem(this._Inventory.Head.ArtEquipedIndex, 1.2);
        else this.EquipItem("BedHeadGray", 1.2);
        if(!this._Inventory.Head || !this._Inventory.Head.Data["Full"]) this.EquipItem("GrayBeard", 1.2);
        for(let i = 0; i < this._EquipedItems.length; i++) this._EquipedItems[i].UpdateSpriteSet(this.CurrentSpriteSet);
    }
    private EquipItem(Index:string, Offset:number)
    {
        let Sprite = this._EquipedCollection.Items[Index].Copy();
        Sprite.Fixed = true;
        Sprite.Trans.Scale = new Engineer.Math.Vertex(100, 150, 1);
        Sprite.Trans.Translation = new Engineer.Math.Vertex(960, 540, Offset);
        this._EquipedItems.push(Sprite);
        this._Scene.AddSceneObject(Sprite);
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