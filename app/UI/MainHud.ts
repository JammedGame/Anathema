export { MainHud };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Unit/Player";
import { PlayerActions } from "./../Unit/PlayerActions";
import { Window } from "./Window";
import { SkillPicker } from "./SkillPicker";
import { ActionArtCollection } from "./../Unit/Actions/ActionArtCollection";

class MainHud extends Window
{
    private _PickKey:string;
    private _LeftClick:any;
    private _RightClick:any;
    private _QDown:any;
    private _WDown:any;
    private _EDown:any;
    private _RDown:any;
    private _InventoryButton:any;
    private _InventoryButtonClick:Function[];
    private _PlayerActions:PlayerActions;
    private _Picker:SkillPicker;
    public get InventoryButtonClick():Function[] { return this._InventoryButtonClick; }
    public set InventoryButtonClick(value:Function[]) { this._InventoryButtonClick = value; }
    public constructor(Scene:GameScene, PlayerActions:PlayerActions)
    {
        super(Scene);
        this._PlayerActions = PlayerActions;
        this.Trans.Scale = new Engineer.Math.Vertex(435,120,1);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 1035, 2);
        let AAC = new ActionArtCollection();
        this._ElementT = new Engineer.Engine.TileCollection(null, ["/build/resources/elements/char.png","/build/resources/elements/inventory.png","/build/resources/elements/quests.png","/build/resources/elements/settings.png",]);
        this._LeftClick = this.AddElement(new Engineer.Math.Vertex(10,10,2.5), new Engineer.Math.Vertex(80,80,1), 1);
        this._LeftClick.Collection = ActionArtCollection.Single;
        this._LeftClick.Data["Key"] = "LM";
        this._LeftClick.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this._QDown = this.AddElement(new Engineer.Math.Vertex(85,-5,2.5), new Engineer.Math.Vertex(50,50,1), 3);
        this._QDown.Collection = ActionArtCollection.Single;
        this._QDown.Data["Key"] = "Q";
        this._QDown.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this._WDown = this.AddElement(new Engineer.Math.Vertex(140,-5,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this._WDown.Collection = ActionArtCollection.Single;
        this._WDown.Data["Key"] = "W";
        this._WDown.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this._EDown = this.AddElement(new Engineer.Math.Vertex(195,-5,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this._EDown.Collection = ActionArtCollection.Single;
        this._EDown.Data["Key"] = "E";
        this._EDown.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this._RDown = this.AddElement(new Engineer.Math.Vertex(250,-5,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this._RDown.Collection = ActionArtCollection.Single;
        this._RDown.Data["Key"] = "R";
        this._RDown.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this._RightClick = this.AddElement(new Engineer.Math.Vertex(325,10,2.5), new Engineer.Math.Vertex(80,80,1), 2);
        this._RightClick.Collection = ActionArtCollection.Single;
        this._RightClick.Data["Key"] = "RM";
        this._RightClick.Events.MouseDown.push(this.CallSkillPicker.bind(this));
        this.AddElement(new Engineer.Math.Vertex(85,38,2.5), new Engineer.Math.Vertex(50,30,1), 0, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this._InventoryButton = this.AddElement(new Engineer.Math.Vertex(140,38,2.5), new Engineer.Math.Vertex(50,30,1), 1, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this._InventoryButton.Events.MouseDown.push(this.InventoryButtonInvoke.bind(this));
        this._InventoryButtonClick = [];
        this.AddElement(new Engineer.Math.Vertex(195,38,2.5), new Engineer.Math.Vertex(50,30,1), 2, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.AddElement(new Engineer.Math.Vertex(250,38,2.5), new Engineer.Math.Vertex(50,30,1), 3, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.CreateBorder();
        this.Update();
        this.Init();
    }
    private CallSkillPicker(G:any, Args:any)
    {
        this._PickKey = Args.Sender.Data["Key"];
        if(!this._Picker)
        {
            this._Picker = new SkillPicker(this._Scene, ActionArtCollection.Single, this.SkillPicked.bind(this));
        }
        let Indices = [0];
        for(let i = 0; i < this._PlayerActions.Actions.length; i++) Indices.push(this._PlayerActions.Actions[i].Art);
        this._Picker.Pick(Indices, Args.Sender.Trans.Translation);
    }
    private SkillPicked(Index:number)
    {
        if(this._PickKey == "LM") this._PlayerActions.LeftMouse = this._PlayerActions.FindByArtIndex(Index);
        else if(this._PickKey == "RM") this._PlayerActions.RightMouse = this._PlayerActions.FindByArtIndex(Index);
        else if(this._PickKey == "Q") this._PlayerActions.ActionQ = this._PlayerActions.FindByArtIndex(Index);
        else if(this._PickKey == "W") this._PlayerActions.ActionW = this._PlayerActions.FindByArtIndex(Index);
        else if(this._PickKey == "E") this._PlayerActions.ActionE = this._PlayerActions.FindByArtIndex(Index);
        else if(this._PickKey == "R") this._PlayerActions.ActionR = this._PlayerActions.FindByArtIndex(Index);
        this.Update();
        this._Picker.Hide();
    }
    private Update() : void
    {
        if(this._PlayerActions.LeftMouse == null) this._LeftClick.Index = 0;
        else this._LeftClick.Index = this._PlayerActions.LeftMouse.Art;
        this._LeftClick.Modified = true;
        if(this._PlayerActions.RightMouse == null) this._RightClick.Index = 0;
        else this._RightClick.Index = this._PlayerActions.RightMouse.Art;
        this._RightClick.Modified = true;
        if(this._PlayerActions.ActionQ == null) this._QDown.Index = 0;
        else this._QDown.Index = this._PlayerActions.ActionQ.Art;
        this._QDown.Modified = true;
        if(this._PlayerActions.ActionW == null) this._WDown.Index = 0;
        else this._WDown.Index = this._PlayerActions.ActionW.Art;
        this._WDown.Modified = true;
        if(this._PlayerActions.ActionE == null) this._EDown.Index = 0;
        else this._EDown.Index = this._PlayerActions.ActionE.Art;
        this._EDown.Modified = true;
        if(this._PlayerActions.ActionR == null) this._RDown.Index = 0;
        else this._RDown.Index = this._PlayerActions.ActionR.Art;
        this._RDown.Modified = true;
    }
    private InventoryButtonInvoke() : void
    {
        for(let i = 0; i < this._InventoryButtonClick.length; i++)
        {
            this._InventoryButtonClick[i]();
        }
    }
}
