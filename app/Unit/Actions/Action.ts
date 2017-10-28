export { Action };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";

class Action
{
    protected _Set:number;
    protected _ID:string;
    protected _Target:any;
    protected _Owner:any;
    protected _Level:number;
    protected _Art:number;
    public get Direction():any { return null; }
    public Prefs: { [key: string]:any; };
    public get Set():number { return this._Set; }
    public get Art():number { return this._Art; }
    public get Target(): any { return this._Target; }
    public set Target(value:any) { this._Target = value; }
    public get Level():number { return this._Level; }
    public set Level(value:number) { this._Level = value; }
    public constructor(Old?:Action, ID?:string, Owner?:any)
    {
        if(Old != null)
        {
            this._ID = Old._ID;
            this._Set = Old._Set;
            this.Prefs = Old.Prefs;
            this._Target = Old._Target;
            this._Level = Old._Level;
            this._Art = Old._Art;
        }
        else
        {
            this._Set = 0;
            if(ID) this._ID = ID;
            else this._ID = "";
            if(Owner) this._Owner = Owner;
            this._Level = -1;
            this._Art = -1;
            this.Prefs = {};
        }
    }
    public Apply(Scene:GameScene) : boolean
    {
        // Virtual
        return true;
    }
}
