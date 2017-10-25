export { InventoryWindow };

import Engineer from "./../../Engineer";
import { GameScene } from "./../../GameScene";
import { Player } from "./../../Unit/Player";
import { Window } from "./../Window";
import { Item } from "../../Unit/Items/Item";
import { Inventory } from "../../Unit/Items/Inventory";
import { InventoryItem } from "./InventoryItem";
import { InventoryCollection } from "./InventoryCollection";

const BackPackX = 9;
const BackPackY = 5;

class InventoryWindow extends Window
{  
    private _Dragged:InventoryItem;
    private _Inventory:Inventory;
    private _ArtCollection:InventoryCollection;
    private _InventoryItems:InventoryItem[];
    public constructor(Scene:GameScene, Inventory:Inventory)
    {
        super(Scene);
        this._Inventory = Inventory;
        this._ArtCollection = new InventoryCollection();
        this._InventoryItems = [];
        this._Inventory.OnUpdate.push(this.Update.bind(this));
        Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        this.InitElements();
    }
    public Update() : void
    {
        for(let i = 0; i < this._InventoryItems.length; i++)
        {
            this._Scene.RemoveSceneObject(this._InventoryItems[i]);
        }
        this._InventoryItems = [];
        for(let i = 0; i < BackPackY; i++)
        {
            for(let j = 0; j < BackPackX; j++)
            {
                if(this._Inventory.BackPack[i * BackPackX + j] != null)
                {
                    this.CreateInventoryItem(i * BackPackX + j, "BackPack", this._Inventory.BackPack[i * BackPackX + j], new Engineer.Math.Vertex(1400 + j * 50, 590 + i * 50,0));
                }
            }
        }
        if(this._Inventory.Head) this.CreateInventoryItem(-1, "Head", this._Inventory.Head, this.Data["HeadSlot"].Trans.Translation);
        if(this._Inventory.Chest) this.CreateInventoryItem(-1, "Chest", this._Inventory.Chest, this.Data["ChestSlot"].Trans.Translation);
        if(this._Inventory.Gloves) this.CreateInventoryItem(-1, "Gloves", this._Inventory.Gloves, this.Data["GlovesSlot"].Trans.Translation);
        if(this._Inventory.Boots) this.CreateInventoryItem(-1, "Boots", this._Inventory.Boots, this.Data["BootsSlot"].Trans.Translation);
        if(this._Inventory.Greaves) this.CreateInventoryItem(-1, "Greaves", this._Inventory.Greaves, this.Data["GreavesSlot"].Trans.Translation);
        if(this._Inventory.Weapon) this.CreateInventoryItem(-1, "Weapon", this._Inventory.Weapon, this.Data["WeaponSlot"].Trans.Translation);
        if(this._Inventory.OffHand) this.CreateInventoryItem(-1, "OffHand", this._Inventory.OffHand, this.Data["OffHandSlot"].Trans.Translation);
    }
    public CreateInventoryItem(Index:number, Type:string, Item:Item, Location:any)
    {
        let InvItem = new InventoryItem(Item, Location.X, Location.Y, Index == -1);
        InvItem.Data["Index"] = Index;
        InvItem.Data["Slot"] = Type;
        InvItem.Fixed = true;
        InvItem.Active = this.Visible;
        InvItem.Events.MouseDown.push(this.ItemDragStart.bind(this));
        this._InventoryItems.push(InvItem);
        this._Scene.AddSceneObject(InvItem);
    }
    public Show() : void
    {
        super.Show();
        for(let i = 0; i < this._InventoryItems.length; i++)
        {
            this._InventoryItems[i].Active = true;
        }
    }
    public Hide() : void
    {
        super.Hide();
        for(let i = 0; i < this._InventoryItems.length; i++)
        {
            this._InventoryItems[i].Active = false;
        }
    }
    public InitElements() : void
    {
        this.Trans.Scale = new Engineer.Math.Vertex(500,800,1);
        this.Trans.Translation = new Engineer.Math.Vertex(1600, 460, 2);
        this.CreateBorder();
        let Head:any = this.AddElement(new Engineer.Math.Vertex(220,80,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["HeadSlot"] = Head;
        Head.Data["Slot"] = true;
        Head.Data["SlotType"] = "Head";
        Head.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let Weapon:any = this.AddElement(new Engineer.Math.Vertex(120,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["WeaponSlot"] = Weapon;
        Weapon.Data["Slot"] = true;
        Weapon.Data["SlotType"] = "Weapon";
        Weapon.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let OffHand = this.AddElement(new Engineer.Math.Vertex(320,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["OffHandSlot"] = OffHand;
        OffHand.Data["Slot"] = true;
        OffHand.Data["SlotType"] = "OffHand";
        OffHand.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let Chest = this.AddElement(new Engineer.Math.Vertex(220,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["ChestSlot"] = Chest;
        Chest.Data["Slot"] = true;
        Chest.Data["SlotType"] = "Chest";
        Chest.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let Gloves = this.AddElement(new Engineer.Math.Vertex(120,260,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["GlovesSlot"] = Gloves;
        Gloves.Data["Slot"] = true;
        Gloves.Data["SlotType"] = "Gloves";
        Gloves.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let Greaves = this.AddElement(new Engineer.Math.Vertex(220,260,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["GreavesSlot"] = Greaves;
        Greaves.Data["Slot"] = true;
        Greaves.Data["SlotType"] = "Greaves";
        Greaves.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        let Boots = this.AddElement(new Engineer.Math.Vertex(220,350,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.Data["BootsSlot"] = Boots;
        Boots.Data["Slot"] = true;
        Boots.Data["SlotType"] = "Boots";
        Boots.Events.MouseUp.push(this.SlotMouseUp.bind(this));
        for(let i = 0; i < BackPackY; i++)
        {
            for(let j = 0; j < BackPackX; j++)
            {                  
                let Slot = this.AddElement(new Engineer.Math.Vertex(j * 50, 480 + i * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);
                Slot.Data["Slot"] = true;
                Slot.Data["SlotType"] = "BackPack";
                Slot.Data["SlotIndex"] = i * BackPackX + j;
                Slot.Events.MouseUp.push(this.SlotMouseUp.bind(this));
            }
        }        
        this.Init();
        this.Hide();
    }
    private SlotMouseUp(G:any, Args:any)
    {
        if(this._Dragged)
        {
            let Sender = Args.Sender;
            if(Sender.Data["SlotType"] == "BackPack" && this._Inventory.BackPack[Sender.Data["SlotIndex"]] == null)
            {
                if(this._Dragged.Data["Index"] != -1)
                {
                    this._Inventory.BackPack[this._Dragged.Data["Index"]] = null;
                }
                else
                {
                    this._Inventory[this._Dragged.Data["Slot"]] = null;
                    this._Inventory.InvokeEquiped();
                }
                this._Dragged.Data["Index"] = Sender.Data["SlotIndex"];
                this._Inventory.BackPack[Sender.Data["SlotIndex"]] = this._Dragged.Item;
                this._Dragged.Trans.Translation = Sender.Trans.Translation;
            }
            else if(Sender.Data["SlotType"] != "BackPack" && Sender.Data["SlotType"] == this._Dragged.Item.Data["Type"])
            {
                let Previous = null;
                Previous = this._Inventory[Sender.Data["SlotType"]];
                if(this._Dragged.Data["Index"] != -1)
                {
                    this._Inventory.BackPack[this._Dragged.Data["Index"]] = null;
                }
                this._Dragged.Data["Index"] = -1;
                this._Dragged.Data["Slot"] = Sender.Data["SlotType"];
                this._Inventory[Sender.Data["SlotType"]] = this._Dragged.Item;
                this._Dragged.Trans.Scale = new Engineer.Math.Vertex(80,80,1);
                this._Dragged.Trans.Translation = Sender.Trans.Translation;
                if(Previous)
                {
                    this._Inventory.Loot(Previous);
                }
                this._Inventory.InvokeEquiped();
            }
            else if(this._Inventory.CanLoot())
            {
                this._Inventory.BackPack[this._Dragged.Data["Index"]] = null;
                this._Inventory.Loot(this._Dragged.Item);
            }
            else
            {
                this._Inventory.BackPack[this._Dragged.Data["Index"]] = null;
            }
            this._Dragged = null;
        }
    }
    
    private ItemDragStart(G:any, Args:any)
    {
        let Sender = Args.Sender;
        this._Dragged = Sender;
        this._Dragged.Trans.Scale = new Engineer.Math.Vertex(60,60,1);
    }
    private MouseMove(G:any, Args:any)
    {
        if(this._Dragged)
        {
            this._Dragged.Trans.Translation = new Engineer.Math.Vertex(Args.Location.X, Args.Location.Y, this._Dragged.Trans.Translation.Z);
        }
        let OverlayTarget = false;
        for(let i = 0; i < this._InventoryItems.length; i++)
        {
            if(Engineer.Math.Vertex.Distance(this._InventoryItems[i].Trans.Translation, Args.Location) < 60)
            {
                this.ShowItemOverlay(this._InventoryItems[i]);
                OverlayTarget = true;
                break;
            }
        }
        if(!OverlayTarget) this.HideItemOverlay();
    }
    private ShowItemOverlay(Item:InventoryItem)
    {
        let Overlay = document.getElementById("item-overlay");
        Overlay.style.top = (Item.Trans.Translation.Y + Item.Trans.Scale.Y / 2 + 10) + "px";
        Overlay.style.left = (Item.Trans.Translation.X - 100) + "px";
        Overlay.style.display = "block";
        let OverlayName = document.getElementById("item-overlay-name");
        OverlayName.innerHTML = Item.Item.Name;
        let OverlayType = document.getElementById("item-overlay-type");
        OverlayType.innerHTML = Item.Item.Data["Type"];
    }
    private HideItemOverlay()
    {
        let Overlay = document.getElementById("item-overlay");
        Overlay.style.display = "none";
    }
}
