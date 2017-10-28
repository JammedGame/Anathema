export { SkillPicker };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Window } from "./Window";

class SkillPicker extends Window
{
    private _Callback:Function;
    public constructor(Scene:GameScene, ElementT:any, CallBack:Function)
    {
        super(Scene);
        this._Callback = CallBack;
        this._ElementT = ElementT;
        this.Active = false;
        this.Init();
    }
    public Pick(Indices:number[], Translation:any)
    {
        this.Trans.Scale = new Engineer.Math.Vertex(30, 60 * Indices.length, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(Translation.X, Translation.Y - 30 * Indices.length - 80, 2.5);
        for(let i = 0; i < Indices.length; i++)
        {
            if(this._Elements.length > i)
            {
                this._Elements[i].Index = Indices[i];
                this._Elements[i].Data["Index"] = Indices[i];
            }
            else
            {
                let Element = this.AddElement(new Engineer.Math.Vertex(-35, 60 * i, 2.5), new Engineer.Math.Vertex(50,50,1), Indices[i]);
                Element.Data["Index"] = Indices[i];
                Element.Events.MouseDown.push(this.MouseDown.bind(this));
            }
        }
        this.Show();
        //this.Active = false;
    }
    private MouseDown(G:any, Args:any) : void
    {
        this._Callback(Args.Sender.Data["Index"]);
    }
}
