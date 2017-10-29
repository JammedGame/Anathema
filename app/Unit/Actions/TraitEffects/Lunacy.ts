export { Lunacy };

import Engineer from "./../../../Engineer";

import { Action } from "./../Action";
import { AfterAnimation } from "./../AfterAnimation";
import { GameScene } from "./../../../GameScene";
import { Trait, TraitEntry } from "../../Trait";
import { TraitEffect } from "./TraitEffect";

class Lunacy extends TraitEffect
{
    public constructor(Old?:TraitEffect, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner, 15);
        this._CooldownLength = 60;
        this._Art = 16;
        this._Trait = new Trait(null, "Lunacy");
        let Entry = new TraitEntry(null, "LifeSteal", 25);
        let Entry1 = new TraitEntry(null, "CritChance", 30);
        let Entry2 = new TraitEntry(null, "CritMultiplier", 2);
        let Entry3 = new TraitEntry(null, "PierceResistance", 0);
        let Entry4 = new TraitEntry(null, "SlashResistance", 0);
        let Entry5 = new TraitEntry(null, "BluntResistance", 0);
        
        this._Trait.AddEntry(Entry);
        this._Trait.AddEntry(Entry1);
        this._Trait.AddEntry(Entry2);
        this._Trait.AddEntry(Entry3);
        this._Trait.AddEntry(Entry4);
        this._Trait.AddEntry(Entry5);
    }
}