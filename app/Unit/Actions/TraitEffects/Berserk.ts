export { Berserk };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { Trait, TraitEntry } from "../../Trait";
import { TraitEffect } from "./TraitEffect";

class Berserk extends TraitEffect
{
    public constructor(Old?:TraitEffect, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner, 15);
        this._CooldownLength = 60;
        this._Art = 12;
        this._Trait = new Trait(null, "Berserk");
        let Entry = new TraitEntry(null, "AttackSpeed", 19);
        let Entry1 = new TraitEntry(null, "HpRegen", 0.15);
        this._Trait.AddEntry(Entry);
        this._Trait.AddEntry(Entry1);
    }
}