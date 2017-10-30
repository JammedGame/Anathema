export { Bleed };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { Trait, TraitEntry } from "../../Trait";
import { TraitEffect } from "./TraitEffect";

class Bleed extends TraitEffect
{
    public constructor(Old?:TraitEffect, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner, 15);
        this._CooldownLength = 60;
        this._Art = 4;
        this._Trait = new Trait(null, "Bleed");
        let Entry = new TraitEntry(null, "BleedChance", 100);
        this._Trait.AddEntry(Entry);
    }
}
