export { SkillPicker };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Window } from "./Window";

class SkillPicker extends Window
{
    private _Shown:boolean;
    private _Callback:Function;
    public constructor(Scene:GameScene, ElementT:any, CallBack:Function)
    {
        super(Scene);
        this._Shown = false;
        this._Callback = CallBack;
        this._ElementT = ElementT;
        this.Active = false;

        this.Init();
    }
    public Pick(Indices:number[], Translation:any)
    {
        this.Trans.Scale = new Engineer.Vertex(30, 60 * Indices.length, 1);
        this.Trans.Translation = new Engineer.Vertex(Translation.X, Translation.Y - 30 * Indices.length - 80, 2.5);
        for(let i = 0; i < Indices.length; i++)
        {
            if(this._Elements.length > i)
            {
                this._Elements[i].Index = Indices[i];
                this._Elements[i].Data["Index"] = Indices[i];
                this._Elements[i].Trans.Translation = new Engineer.Vertex(Translation.X, this._Elements[i].Trans.Translation.Y, 2.5);
                this._Elements[i].Active = true;
            }
            else
            {
                let Element = this.AddElement(new Engineer.Vertex(-35, 60 * i, 2.5), new Engineer.Vertex(50,50,1), Indices[i]);
                Element.Data["Index"] = Indices[i];
                Element.Events.MouseDown.push(this.MouseDown.bind(this));
                Element.Fixed = true;
                this._Scene.Attach(Element);
            }
        }
        this._Shown = true;
        this.Show();
        this.Active = false;
    }
    public Hide() : void
    {
        // Override
        super.Hide();
        this._Shown = false;
    }
    private MouseDown(G:any, Args:any) : void
    {
        if(!this._Shown) return;
        this._Callback(Args.Sender.Data["Index"]);
    }
}
