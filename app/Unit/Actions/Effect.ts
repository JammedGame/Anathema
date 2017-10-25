export {Effect}

import { GameScene } from "./../../GameScene";
import Engineer from "./../../Engineer";

const SpriteSetResourcePath = "/build/resources/effects/";

class Effect extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;      
    private _Location:any;
    private _SizeScale:any;        
    private _KeyPressed:boolean;
    private _Seed:number;
    private _UpdateInterval:number;
    private _Duration:number;
    private _Speed:number;
    private _GrowthX:number;
    private _GrowthY:number;
    private _FadeSpeed:number;
    private _Color:any;
    private _UpdateCounter:number;
    private _DurationCounter:number;
    private _AddedOnScene:boolean;

    public constructor(Scene:GameScene, pngName:string, Location:any, SizeScale:any, Length:number, Seed:number, UpdateInterval:number, Duration:number, Speed?:number, GrowthX?:number, GrowthY?:number, FadeSpeed?:number, Color?:any){
        super();
        this.SpriteSets = [];
        this.SpriteSets.push(this.LoadSingleSet("Effect", pngName, Length, Seed));
        this._Scene = Scene;
        this._Location = Location;
        this._SizeScale = SizeScale;
        this._Seed = Seed;
        this._UpdateInterval = UpdateInterval;
        this._Duration = Duration;
        this._UpdateCounter = 0;
        this._DurationCounter = 0;
        this._AddedOnScene = false;        
        if(Speed!=null){this._Speed = Speed;}
        if(GrowthX!=null){this._GrowthX = GrowthX;}
        if(GrowthY!=null){this._GrowthY = GrowthY;}
        if(FadeSpeed!=null){this._FadeSpeed = FadeSpeed;}
        if(Color!=null){this._Color = Color;}
        
        this._Scene.Events.KeyPress.push(this.KeyPress.bind(this));
    }

    private KeyPress(G: any, Args: any): void
    {
        if (Args.Key == 113)
        {
            //Engineer.Util.Log.Error(this._SizeScale);
            this.Trans.Scale = new Engineer.Math.Vertex(this._SizeScale.X,this._SizeScale.Y,0);
            this.Trans.Translation = this._Location;
            this._KeyPressed=true;
            this.Active = true; 
            if(!this._AddedOnScene)
            {
                this._Scene.AddSceneObject(this);
                this._AddedOnScene=true;
            }           
        }
    }
    private LoadSingleSet(SpriteSetName:string, pngName:String, Length:number, Seed:number) : any
    {
        let Set = new Engineer.Engine.SpriteSet(null, SpriteSetName);
        Set.Seed = Seed;
        Set.Sprites = [];
        for (let i = 0; i < Length; i++) Set.Sprites.push(SpriteSetResourcePath + pngName + i + ".png");
        return Set;
    }
    public Update()
    {        
        if(this._UpdateCounter >= this._UpdateInterval*60 && this._KeyPressed)
        {
            this._UpdateCounter=0;
            if(this._DurationCounter <=this._Duration)
            {
                this._DurationCounter++;
                if(this.SpriteSets[0].Seed > 0 && this.SpriteSets[0].Seed <20)
                {
                    if(this._Speed!=null)
                    {
                        this.SpriteSets[0].Seed += this._Speed;
                    }
                }
                if(this._GrowthX!=null)
                {
                    this.Trans.Scale.X += this._GrowthX;
                }
                if(this._GrowthY!=null)
                {
                    this.Trans.Scale.Y += this._GrowthY;
                }
                
                if(this._FadeSpeed!=null)
                {
                    if(this.Paint.A - this._FadeSpeed >= 0)
                    {
                        Engineer.Util.Log.Error(this.Paint);               
                        this.Paint = Engineer.Math.Color.FromRGBA(this.Paint.R, this.Paint.G, this.Paint.B, this.Paint.A-this._FadeSpeed);                      
                    }
                    else
                    {
                        this.Paint.A=0;
                    }
                }
            }
            
            else 
            {
                //this._Scene.RemoveSceneObject(this);
                this.Active=false;
                this.SpriteSets[0].Seed=this._Seed;
                this.Trans.Scale = new Engineer.Math.Vertex(this._SizeScale.X,this._SizeScale.Y,0);             
                this.Paint.A = 255;
                this._KeyPressed = false;
                this._DurationCounter=0;
            }
            
        }
        else
        {
            this._UpdateCounter++;
        }
    }    
}