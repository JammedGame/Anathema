export { TraitEntry, Trait, Traits};

import { Stats } from "./Stats";

class TraitEntry
{
    private _Type: string;
    private _Value: number;
    public get Type(): string { return this._Type }
    public get Value(): number { return this._Value }
    public constructor(Old:TraitEntry, Type?:string, Value?: number)
    {
        if(Old != null)
        {
            this._Type = Old._Type;
            this._Value = Old._Value;
        }
        else
        {
            if(Type) this._Type = Type;
            else this._Type = "";
            if(Value) this._Value = Value;
            else this._Value = 0;
        }
    }
    public Copy() : TraitEntry
    {
        return new TraitEntry(this);
    }
}

class Trait
{
    private _Name: string;
    private _Entries: TraitEntry[];
    public get Entries() : TraitEntry[] { return this._Entries; }
    public set Entries( value:TraitEntry[] ) { this._Entries = value; }    
    public constructor(Old?:Trait, Name?:string)
    {
        if(Old != null)
        {
            this._Name = Old._Name;
            this._Entries = [];
            for(let i = 0; i < Old._Entries.length; i++) this._Entries.push(Old._Entries[i].Copy());
        }
        else
        {
            if(Name) this._Name = Name;
            else this._Name = "";
            this._Entries = [];
        }
    }
    public Copy() : Trait
    {
        return new Trait(this);
    }
}

class Traits
{
    private _Traits: Trait[];
    public get Traits(): Trait[]  { return this._Traits; }
    public set Traits(value:Trait[]) { this._Traits = value; }
    public constructor(Old?:Traits)
    {
        this._Traits = [];
        if(Old != null)
        {
            for(let i = 0; i < Old._Traits.length; i++)
            {
                this._Traits.push(Old._Traits[i].Copy());
            }
        }
    }
    public Copy() : Traits
    {
        return new Traits(this);
    }
    public Apply(Stats:Stats) : void
    {
        for(let i = 0; i < this._Traits.length; i++)
        {
            for(let j = 0; j < this._Traits[i].Entries.length; j++)
            {
                if(this._Traits[i].Entries[j].Type == "HPBonus") Stats.MaxHealth += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "HPBonusPercent") Stats.MaxHealth += this._Traits[i].Entries[j].Value * Stats.MaxHealth;
                if(this._Traits[i].Entries[j].Type == "DamageBonus") Stats.BaseDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "SpeedBonus") Stats.MovementSpeed += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "FireResist") Stats.FireResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "ColdResist") Stats.ColdResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "LightningResist") Stats.LightningResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "PierceResist") Stats.PierceResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "SlashResist") Stats.SlashResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "BluntResist") Stats.BluntResist += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "FireDamage") Stats.FireDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "ColdDamage") Stats.ColdDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "LightningDamage") Stats.LightningDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "PierceDamage") Stats.PierceDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "SlashDamage") Stats.SlashDamage += this._Traits[i].Entries[j].Value;
                if(this._Traits[i].Entries[j].Type == "BluntDamage") Stats.BluntDamage += this._Traits[i].Entries[j].Value;
            }
        }
    }
}
