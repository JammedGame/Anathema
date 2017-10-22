export { Move };

import Engineer from "./../../Engineer";

import { Action } from "./Action";

class Move extends Action
{
    private _Speed:number;
    public constructor(Speed:number, Old?:Move, ID?:string)
    {
        super(Old, ID);
        this._Speed = Speed;
    }
    public Apply() : boolean
    {
        // Virtual
        return true;
    }
}
