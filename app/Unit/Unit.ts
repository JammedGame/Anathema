export { Unit };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Traits } from "./Trait" 

class Unit extends Engineer.Engine.Sprite
{
    protected _CurrentAction:Action;
    protected _Collider:any;
    protected _LastDirection:any;
    protected _Stats:Stats
    protected _Traits:Traits;
    protected _Scene:GameScene;
    public get Collider(): any { return this._Collider; }
    public get Stats(): Stats { return this._Stats; }
    public set Stats(value:Stats) { this._Stats = value; }
    public get Traits(): Traits { return this._Traits; }
    public constructor(Old:Unit, Scene?:GameScene)
    {
        super(Old);
        if(Old != null)
        {
            this._Scene = Scene;
            this._Traits = Old._Traits.Copy();
            this._Stats = Old._Stats.Copy();
            this._Collider = Old._Collider.Copy();
            for (let Key in Old.Data)
            {
                this.Data[Key] = Old.Data[Key];
            }
            this._Collider.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
            this._Collider.Data["Owner"] = this;
        }
        else
        {
            this._Scene = Scene;
            this._Traits = new Traits();
            this._Stats = new Stats();
            this.CreateCollider();
        }
        this._Stats.Store();
    }
    public Init(Scene:GameScene)
    {
        this._Scene = Scene;
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
    public Copy() : Unit
    {
        return new Unit(this, this._Scene);    
    }
    public Update() : void
    {
        // Virtual
        if(this._CurrentAction)
        {
            if(!this._CurrentAction.Apply(this._Scene))
            {
                this._CurrentAction = null;
            }
            if(this._CurrentAction)
            {
                this._LastDirection = this._CurrentAction.Direction;
                this.CalculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
            }
            else this.CalculateSpriteSet(0, this._LastDirection);
        }
        let NewHealth = this._Stats.Health + this._Stats.HealthRegeneration;
        if(NewHealth  > this._Stats.MaxHealth) this._Stats.Health = this._Stats.MaxHealth;
        if(NewHealth<=0)this.Destroy();
        else this._Stats.Health = NewHealth;
        let NewMana = this._Stats.Mana + this._Stats.ManaRegeneration;
        if(NewMana > this._Stats.MaxMana) this._Stats.Mana = this._Stats.MaxMana;
        else this._Stats.Mana = NewMana;
    }
    public Destroy() : void
    {
        // Virtual
    }
    protected CreateCollider() : void
    {
        this._Collider = new Engineer.Engine.Tile();
        this._Collider.Trans.Scale = new Engineer.Math.Vertex(this.Trans.Scale.X, this.Trans.Scale.Y, 1);
        this._Collider.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y, 2);
        this._Collider.Active = false;
        this._Collider.Paint = Engineer.Math.Color.FromRGBA(255,0,0,120);
        this._Collider.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        this._Collider.Data["Owner"] = this;
    }
    protected CalculateDirection(Direction:any) : number
    {
        let Angle = Engineer.Math.Vertex.Angle(new Engineer.Math.Vertex(0, -1, 0), Direction);
        Angle += 90;
        if(Angle > 360) Angle -= 360;
        if(Angle > 45 && Angle <= 135) return 1;
        if(Angle > 135 && Angle <= 225) return 2;
        if(Angle > 225 && Angle <= 315) return 3;
        else return 0;
    }
    protected UpdateSeeds()
    {
        for(let i = 8; i < 20; i++)
        {
            this.SpriteSets[i].Seed = 21 - this._Stats.AttackSpeed;
        }
    }
    protected CalculateSpriteSet(Set:number, Direction:any) : void
    {
        let DirectionIndex = 0;
        if(Direction != null) DirectionIndex = this.CalculateDirection(Direction);
        this.UpdateSpriteSet(Set * 4 + DirectionIndex);
    }
    public MatrixCoord() : number[]
    {
        let ConvX = Math.floor(this._Collider.Trans.Translation.X / 120);
        let ConvY = Math.floor(this._Collider.Trans.Translation.Y / 120);
        return [ConvX, ConvY];
    }
}
