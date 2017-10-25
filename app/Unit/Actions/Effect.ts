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
    private _Timer:number;
    private _Speed:number;
    private _GrowthX:number;
    private _GrowthY:number;
    private _Counter:number;
    private _AddedOnScene:boolean;

    public constructor(Scene:GameScene, pngName:string, Location:any, SizeScale:any, Length:number, Seed:number, Timer:number, Speed?:number, GrowthX?:number, GrowthY?:number){
        super();
        this.SpriteSets = [];
        this.SpriteSets.push(this.LoadSingleSet("Effect", pngName, Length, Seed));
        this._Scene = Scene;
        this._Location = Location;
        this._SizeScale = SizeScale;
        this._Seed = Seed;
        this._Timer = Timer;
        this._Counter = 0;
        this._AddedOnScene = false;

        if(Speed!=null){this._Speed = Speed;}
        if(GrowthX!=null){this._GrowthX = GrowthX;}
        if(GrowthY!=null){this._GrowthY = GrowthY;}
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
            if(!this._AddedOnScene)
            {
                this._Scene.AddSceneObject(this);
                this._AddedOnScene=true;
            }
            else
            {
                this.Active = true;
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
        if(this._Counter>=this._Timer){
            if(this.SpriteSets[0].Seed > 0 && this.SpriteSets[0].Seed <20 && this._KeyPressed)
            {
                
                if(this._Speed!=null)
                {
                this.SpriteSets[0].Seed += this._Speed;
                }
                
                if(this._GrowthX!=null)
                {                    
                    this.Trans.Scale.X += this._GrowthX;                    
                }
                if(this._GrowthY!=null)
                {
                    this.Trans.Scale.Y += this._GrowthY;
                }               
            }
            else if(this.SpriteSets[0].Seed==0 || this.SpriteSets[0].Seed==20)
            {
                //Engineer.Util.Log.Error(this._SizeScale);
                //this._Scene.RemoveSceneObject(this);
                this.Active=false;
                this.SpriteSets[0].Seed=this._Seed;
                this.Trans.Scale = this._SizeScale;
                this._KeyPressed = false;
            } 
            this._Counter=0;           
        }
        else
        {
            this._Counter++;
        }
    }    
}