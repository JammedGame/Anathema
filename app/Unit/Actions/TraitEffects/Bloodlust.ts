export { Bloodlust };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { Trait, TraitEntry } from "../../Trait";
import { TraitEffect } from "./TraitEffect";

class Bloodlust extends TraitEffect
{
    public constructor(Old?:TraitEffect, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner, 15);
        this._CooldownLength = 60;
        this._Art = 8;
        this._Trait = new Trait(null, "Bloodlust");
        let Entry = new TraitEntry(null, "DamageBonus", 100);
        this._Trait.AddEntry(Entry);
    }
}