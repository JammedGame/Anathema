export { Action };

import Engineer from "./../../Engineer";

class Action
{
    private _ID:string;
    private _Target:any;
    public Prefs: { [key: string]:any; };
    public constructor(Old?:Action, ID?:string)
    {
        if(Old != null)
        {
            this._ID = Old._ID;
            this.Prefs = Old.Prefs;
            this._Target = Old._Target;
        }
        else
        {
            if(ID) this._ID = ID;
            else this._ID = "";
            this.Prefs = {};
        }
    }
    public Apply() : boolean
    {
        // Virtual
        return true;
    }
}
