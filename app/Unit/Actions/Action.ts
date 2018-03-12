export { Action };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";

class Action
{
    protected _Cooldown:boolean;
    protected _Set:number;
    protected _Level:number;
    protected _Art:number;
    protected _CooldownLength:number;
    protected _ManaCost:number;
    protected _ID:string;
    protected _Target:any;
    protected _Owner:any;
    protected _Scene:GameScene;
    public Prefs: { [key: string]:any; };
    public get Set():number { return this._Set; }
    public set Set(value:number) { this._Set = value; }
    public get Art():number { return this._Art; }
    public get Level():number { return this._Level; }
    public set Level(value:number) { this._Level = value; }
    public get Target(): any { return this._Target; }
    public set Target(value:any) { this._Target = value; }
    public get Direction():any { return new Engineer.Vertex(this._Target.X - this._Owner.Collider.Trans.Translation.X, this._Target.Y - this._Owner.Collider.Trans.Translation.Y, 0); }
    public constructor(Old?:Action, ID?:string, Owner?:any)
    {
        if(Old != null)
        {
            this._Cooldown = false;
            this._Set = Old._Set;
            this._Art = Old._Art;
            this._Level = Old._Level;
            this._ManaCost = Old._ManaCost;
            this._CooldownLength = Old._CooldownLength;
            this._ID = Old._ID;
            this._Target = Old._Target;
            this.Prefs = Old.Prefs;   
        }
        else
        {
            this._Cooldown = false;
            this._Set = 0;
            this._Art = 0;
            this._Level = -1;
            this._ManaCost = 0;
            this._CooldownLength = 0;
            if(ID) this._ID = ID;
            else this._ID = "";
            if(Owner) this._Owner = Owner;
            this.Prefs = {};
        }
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Virtual
        return true;
    }
}
