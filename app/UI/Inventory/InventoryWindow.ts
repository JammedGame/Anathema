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
                    let InvItem = new InventoryItem(this._Inventory.BackPack[i * BackPackX + j], 1400 + j * 50, 590 + i * 50);
                    InvItem.Data["Index"] = i * BackPackX + j;
                    InvItem.Fixed = true;
                    InvItem.Active = this.Visible;
                    InvItem.Events.MouseDown.push(this.ItemDragStart.bind(this));
                    this._InventoryItems.push(InvItem);
                    this._Scene.AddSceneObject(InvItem);
                }
            }
        }       
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
        this.AddElement(new Engineer.Math.Vertex(200,200,2.5), new Engineer.Math.Vertex(300,460,1), 1, Engineer.Math.Color.FromRGBA(60,60,60,255));
        this.AddElement(new Engineer.Math.Vertex(220,80,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,80,2.5), new Engineer.Math.Vertex(50,50,1), 2, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(120,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(120,170,2.5), new Engineer.Math.Vertex(50,50,1), 4, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(320,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(320,170,2.5), new Engineer.Math.Vertex(50,50,1), 5, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(220,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,170,2.5), new Engineer.Math.Vertex(50,50,1), 3, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(220,310,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,310,2.5), new Engineer.Math.Vertex(50,50,1), 2, Engineer.Math.Color.FromRGBA(30,30,30,255));
        //

        for(let i = 0; i < 5; i++)
        {
            for(let j = 0; j < 9; j++)
            {                  
                let Slot = this.AddElement(new Engineer.Math.Vertex(j * 50, 480 + i * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);
                Slot.Data["Slot"] = true;
                Slot.Data["SlotIndex"] = i * 9 + j;
                Slot.Events.MouseUp.push(this.SlotMouseUp.bind(this));
            }
        }        
        this.Init();
        this.Hide();
    }
    private SlotMouseUp(G:any, Args:any)
    {
        let Sender = Args.Sender;
        if(this._Inventory.BackPack[Sender.Data["SlotIndex"]] == null)
        {
            this._Inventory.BackPack[this._Dragged.Data["Index"]] = null;
            this._Dragged.Data["Index"] = Sender.Data["SlotIndex"];
            this._Inventory.BackPack[Sender.Data["SlotIndex"]] = this._Dragged.Item;
            this._Dragged.Trans.Translation = Sender.Trans.Translation;
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
    private ItemDragStart(G:any, Args:any)
    {
        let Sender = Args.Sender;
        this._Dragged = Sender;
    }
    private MouseMove(G:any, Args:any)
    {
        if(this._Dragged)
        {
            this._Dragged.Trans.Translation = new Engineer.Math.Vertex(Args.Location.X, Args.Location.Y, this._Dragged.Trans.Translation.Z);
        }
    }
}
