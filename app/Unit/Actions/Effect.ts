export {Effect}

import { GameScene } from "./../../GameScene";
import Engineer from "./../../Engineer";

const SpriteSetResourcePath = "/build/resources/effects/";

class Effect extends Engineer.Sprite
{
    private _Duration:number;
    private _StartSeed:number;
    private _Speed:number;
    private _Fade:number;
    private _Location:any;
    private _Size:any;        
    private _Growth:any;
    private _Color:any;
    private _Scene:GameScene;
    public get Duration():number { return this._Duration; }
    public set Duration(value:number) { this._Duration = value; }
    public get Seed():number { return this._StartSeed; }
    public set Seed(value:number) { this._StartSeed = value; this.SpriteSets[0].Seed = value; }
    public get Speed():number { return this._Speed; }
    public set Speed(value:number) { this._Speed = value; }
    public get Fade():number { return this._Fade; }
    public set Fade(value:number) { this._Fade = value; }
    public get Location():any { return this._Location; }
    public set Location(value:any) { this._Location = value; }
    public get Size():any { return this._Size; }
    public set Size(value:any) { this._Size = value; }
    public get Growth():any { return this._Growth; }
    public set Growth(value:any) { this._Growth = value; }
    public get Color():any { return this._Color; }
    public set Color(value:any) { this._Color = value; }
    public constructor(Scene:GameScene, Image:string, Length:number, Size:any)
    {
        super();
        this.SpriteSets = [];
        this.SpriteSets.push(this.LoadSingleSet("Effect", Image, Length, 5));
        this._Scene = Scene;
        this._Duration = 1;
        this._StartSeed = 5;
        this._Speed = 0;
        this._Fade = 0;
        this._Size = Size;
        this._Color = Engineer.Color.White;
        this._Growth = new Engineer.Vertex(0,0,0);
        this.Active = false;
        this._Scene.AddSceneObject(this);
        this._Scene.Events.KeyPress.push(this.KeyPress.bind(this));
    }
    public ShowEffect(Location:any)
    {
        if(this.Active) return;
        this.Trans.Translation = Location;
        this.Paint = Engineer.Color.FromRGBA(this.Paint.R, this.Paint.G, this.Paint.B, 255);
        this.Trans.Scale = new Engineer.Vertex(this._Size.X, this._Size.Y,1);
        this.SpriteSets[0].Seed = this._StartSeed;
        this.Active = true;
        setTimeout(this.Complete.bind(this), this._Duration * 1000);
    }
    private KeyPress(G: any, Args: any): void
    {
        if (Args.Key == 122)
        {
            this.ShowEffect(this._Scene.Data["Player"].Collider.Trans.Translation);
        }
    }
    private LoadSingleSet(SpriteSetName:string, pngName:String, Length:number, Seed:number) : any
    {
        let Set = new Engineer.SpriteSet(null, [], SpriteSetName);
        Set.Seed = Seed;
        for (let i = 0; i < Length; i++) Set.Images.push(SpriteSetResourcePath + pngName + i + ".png");
        return Set;
    }
    private Complete()
    {
        this.Active = false;
    }
    public Update()
    {    
        if(this.Active)
        {
            if((this.SpriteSets[0].Seed > 2 || this._Speed > 0)  && (this.SpriteSets[0].Seed < 21 || this._Speed < 0))
            {
                this.SpriteSets[0].Seed += this._Speed;
            }
            this.Trans.Scale = new Engineer.Vertex(this.Trans.Scale.X + this._Growth.X, this.Trans.Scale.Y + this._Growth.Y, 1);
            let NewAlfa = this.Paint.A - this._Fade;
            if(NewAlfa < 0) NewAlfa = 0;
            this.Paint = Engineer.Color.FromRGBA(this.Paint.R, this.Paint.G, this.Paint.B, NewAlfa);
        }
    }    
}