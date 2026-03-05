import * as TBX from 'toybox-engine';

import Unit from "./Unit";
import { Action } from "./Actions/Action";
import { GameScene } from "../GameScene";
import { Inventory } from "./Items/Inventory";
import { PlayerActions } from "./PlayerActions";
import { SpriteSetLoader } from "../Util/SpriteSetLoader";
import { EquipedCollection } from "./Items/EquipedCollection";

class Player extends Unit {
    private _QDown: boolean;
    private _WDown: boolean;
    private _EDown: boolean;
    private _RDown: boolean;
    private _LeftClick: boolean;
    private _RightClick: boolean;
    private _StatsUpdate: boolean;
    private _Inventory: Inventory;
    private _Actions: PlayerActions;
    private _LightRadius: TBX.Light;
    private _LastMouseLocation: TBX.Vertex;
    private _EquipedCollection: EquipedCollection;
    private _EquipedItems: any[];

    public get Actions(): PlayerActions { return this._Actions; }
    public get Inventory(): Inventory { return this._Inventory; }
    public get StatsUpdate(): boolean { return this._StatsUpdate; }
    public set StatsUpdate(value: boolean) { this._StatsUpdate = value; }

    public constructor(Old: Player, Scene?: GameScene) {
        super(Old, Scene);
        this._StatsUpdate = false;
        this._EquipedCollection = new EquipedCollection();
        this._EquipedItems = [];
        if (Old != null) {
            this._Inventory = Old._Inventory.Copy();
            this._Collider = Old._Collider.Copy();
        }
        else {
            this.Name = "Player";
            this.Fixed = true;
            this.Data["Player"] = true;
            Scene.Data["Player"] = this;
            this._Stats.PhysicalDamage = 10;
            this._Stats.MovementSpeed = 5;
            this._Stats.Radius = 150;
            this._Stats.AttackSpeed = 15;
            this._Stats.Store();
            this._Inventory = new Inventory();
            this._Actions = new PlayerActions(this, Scene);
            Scene.Trans.Translation = new TBX.Vertex(960, 540, 1);
            this.Trans.Scale = new TBX.Vertex(100, 150, 0);
            this.Trans.Translation = new TBX.Vertex(960, 490, 1);
            this._Collider.Data["PlayerCollider"] = true;
            SpriteSetLoader.LoadSets(this, "Human");
            this.createCollider();
        }
        this._Scene.Events.MouseDown.push(this.mouseDown.bind(this));
        this._Scene.Events.MouseUp.push(this.mouseUp.bind(this));
        this._Scene.Events.MouseMove.push(this.mouseMove.bind(this));
        this._Scene.Events.KeyDown.push(this.keyDown.bind(this));
        this._Scene.Events.KeyUp.push(this.keyUp.bind(this));
        this.init(Scene);
        this._Inventory.OnEquip.push(this.equip.bind(this));
        this.equip();
        this._LightRadius = new TBX.Light();
        this._LightRadius.Paint = TBX.Color.White;
        this._LightRadius.Radius = 500;
        this._LightRadius.Intensity = 15;
        this._LightRadius.Attenuation = new TBX.LightAttenuation(null, 1, 0, 6);
        this._LightRadius.Fixed = true;
        this._Scene.Attach(this._LightRadius);
        this.Material.Type = TBX.MaterialType.Default;
    }

    // override
    public duplicate(): Player {
        return new Player(this, this._Scene);
    }

    public updateCurrentAction(Action: Action) {
        this._CurrentAction = Action;
    }

    // override
    public update() {
        if (this._StatsUpdate) {
            this.updateStats();
            this.updateSeeds();
            this._StatsUpdate = false;
        }
        if (this._LastMouseLocation) {
            let Location = new TBX.Vertex(this._LastMouseLocation.X - this._Scene.Trans.Translation.X, this._LastMouseLocation.Y - this._Scene.Trans.Translation.Y, 0);
            if (this._LeftClick) this._Actions.Apply("LM", Location);
            else if (this._RightClick) this._Actions.Apply("RM", Location);
            else if (this._QDown) this._Actions.Apply("Q", Location);
            else if (this._WDown) this._Actions.Apply("W", Location);
            else if (this._EDown) this._Actions.Apply("E", Location);
            else if (this._RDown) this._Actions.Apply("R", Location);
        }
        this._LightRadius.Position = this._Scene.Trans.Translation.Copy().Scalar(-1).Add(new TBX.Vertex(960, 600, 0));
        super.update();
    }

    // override
    public updatePosition(offset: TBX.Vertex): void {
        this._Scene.Trans.Translation = new TBX.Vertex(
            this._Scene.Trans.Translation.X - offset.X,
            this._Scene.Trans.Translation.Y - offset.Y,
            1,
        );
        this.Collider.Trans.Translation = new TBX.Vertex(
            this._Collider.Trans.Translation.X + offset.X,
            this._Collider.Trans.Translation.Y + offset.Y,
            1,
        );
    }

    private mouseDown(G: any, Args: any) {
        if (Args.MouseButton == 0) this._LeftClick = true;
        if (Args.MouseButton == 2) this._RightClick = true;
    }

    private mouseUp(G: any, Args: any) {
        if (Args.MouseButton == 0) this._LeftClick = false;
        if (Args.MouseButton == 2) this._RightClick = false;
    }

    private keyDown(G: any, Args: any) {
        if (Args.Key == 81) this._QDown = true;
        if (Args.Key == 87) this._WDown = true;
        if (Args.Key == 69) this._EDown = true;
        if (Args.Key == 82) this._RDown = true;
    }

    private keyUp(G: any, Args: any) {
        if (Args.Key == 81) this._QDown = false;
        if (Args.Key == 87) this._WDown = false;
        if (Args.Key == 69) this._EDown = false;
        if (Args.Key == 82) this._RDown = false;
    }

    private mouseMove(G: any, Args: any) {
        this._LastMouseLocation = Args.Location;
    }

    private equip() {
        const equipmentDrawwOffset = 1.1;
        for (let i = 0; i < this._EquipedItems.length; i++) this._Scene.Remove(this._EquipedItems[i]);
        this._EquipedItems = [];
        if (this._Inventory.Greaves) this.equipItem(this._Inventory.Greaves.ArtEquipedIndex, equipmentDrawwOffset);
        else this.equipItem("RedPants", 1.1);
        if (this._Inventory.Chest) this.equipItem(this._Inventory.Chest.ArtEquipedIndex, equipmentDrawwOffset);
        else this.equipItem("WhiteShirt", 1.1);
        if (this._Inventory.Boots) this.equipItem(this._Inventory.Boots.ArtEquipedIndex, equipmentDrawwOffset);
        if (this._Inventory.Gloves) this.equipItem(this._Inventory.Gloves.ArtEquipedIndex, equipmentDrawwOffset);
        if (this._Inventory.Head) this.equipItem(this._Inventory.Head.ArtEquipedIndex, equipmentDrawwOffset);
        if (!this._Inventory.Head || !this._Inventory.Head.Data["Full"]) this.equipItem("RedBeard", equipmentDrawwOffset);
        if (this._Inventory.Weapon) {
            this.equipItem(this._Inventory.Weapon.ArtEquipedIndex, equipmentDrawwOffset);
            if (this._Inventory.Weapon.Data["WeaponGroup"] == 2) this._Actions.ActionAttack.Range = true;
            else this._Actions.ActionAttack.Range = false;
        }
        for (let i = 0; i < this._EquipedItems.length; i++) this._EquipedItems[i].UpdateSpriteSet(this.CurrentSpriteSet);
        this.updateSeeds();
    }

    private equipItem(Index: string, Offset: number) {
        let Sprite = this._EquipedCollection.Items[Index].Copy();
        Sprite.Fixed = true;
        Sprite.Material.Type = TBX.MaterialType.Default;
        Sprite.Trans.Scale = new TBX.Vertex(100, 150, 1);
        Sprite.Trans.Translation = new TBX.Vertex(960, 490, Offset);
        this._EquipedItems.push(Sprite);
        this._Scene.Attach(Sprite);
        this.updateStats();
    }

    private updateStats() {
        this._Stats.Reset();
        this._Traits.Apply(this._Stats);
        this._Inventory.Apply(this._Stats);
    }

    // override
    protected updateSeeds() {
        for (let i = 8; i < 20; i++) {
            this.SpriteSets[i].Seed = 21 - this._Stats.AttackSpeed;
            for (let j = 0; j < this._EquipedItems.length; j++) {
                this._EquipedItems[j].SpriteSets[i].Seed = 21 - this._Stats.AttackSpeed;
            }
        }
    }

    // override
    protected calculateSpriteSet(Set: number, Direction: TBX.Vertex) {
        let DirectionIndex = 0;
        if (Direction != null) DirectionIndex = this.calculateDirection(Direction);
        if (this._Inventory.Weapon && Set == 2) Set += this._Inventory.Weapon.Data["WeaponGroup"];
        let SetIndex = Set * 4 + DirectionIndex;
        this.UpdateSpriteSet(SetIndex);
        for (let i = 0; i < this._EquipedItems.length; i++) this._EquipedItems[i].UpdateSpriteSet(SetIndex);
    }
}

export default Player;
