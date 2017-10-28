export { Stats };

import Engineer from "./../Engineer";

class Stats
{
    private _Health:number;
    private _MaxHealth:number;
    private _Mana:number;
    private _MaxMana:number;
    private _BaseDamage:number;
    private _MovementSpeed:number;
    private _Sight:number;
    private _Radius:number;
    private _BaseStats:Stats;
    private _FireResist:number;
    private _ColdResist:number;
    private _LightningResist:number;
    private _PierceResist:number;
    private _SlashResist:number;
    private _BluntResist:number;
    private _PierceDamage:number;
    private _SlashDamage:number;
    private _BluntDamage:number;
    private _FireDamage:number;
    private _ColdDamage:number;
    private _LightningDamage:number;
    public get Health():number { return this._Health; }
    public set Health(value:number) { this._Health = value; }
    public get MaxHealth():number { return this._MaxHealth; }
    public set MaxHealth(value:number) { this._MaxHealth = value; }
    public get Mana():number { return this._Mana; }
    public set Mana(value:number) { this._Mana = value; }
    public get MaxMana():number { return this._MaxMana; }
    public set MaxMana(value:number) { this._MaxMana = value; }
    public get BaseDamage():number { return this._BaseDamage; }
    public set BaseDamage(value:number) { this._BaseDamage = value; }
    public get MovementSpeed():number { return this._MovementSpeed; }
    public set MovementSpeed(value:number) { this._MovementSpeed = value; }
    public get Sight():number { return this._Sight; }
    public set Sight(value:number) { this._Sight = value; }
    public get Radius():number { return this._Radius; }
    public set Radius(value:number) { this._Radius = value; }
    public get FireResist():number { return this._FireResist; }
    public set FireResist(value:number) { this._FireResist = value; }
    public get ColdResist():number { return this._ColdResist; }
    public set ColdResist(value:number) { this._ColdResist = value; } 
    public get LightningResist():number { return this._LightningResist; }
    public set LightningResist(value:number) { this._LightningResist = value; }
    public get PierceResist():number { return this._PierceResist; }
    public set PierceResist(value:number) { this._PierceResist = value; }
    public get SlashResist():number { return this._SlashResist; }
    public set SlashResist(value:number) { this._SlashResist = value; }
    public get BluntResist():number { return this._BluntResist; }
    public set BluntResist(value:number) { this._BluntResist = value; }
    public get PierceDamage():number { return this._PierceDamage; }
    public set PierceDamage(value:number) { this._PierceDamage = value; }
    public get SlashDamage():number { return this._SlashDamage; }
    public set SlashDamage(value:number) { this._SlashDamage = value; }
    public get BluntDamage():number { return this._BluntDamage; }
    public set BluntDamage(value:number) { this._BluntDamage = value; }
    public get FireDamage():number { return this._FireDamage; }
    public set FireDamage(value:number) { this._FireDamage = value; }
    public get ColdDamage():number { return this._ColdDamage; }
    public set ColdDamage(value:number) { this._ColdDamage = value; }
    public get LightningDamage():number { return this._LightningDamage; }
    public set LightningDamage(value:number) { this._LightningDamage = value; }
    public constructor(Old?:Stats)
    {
        if(Old != null)
        {
            this.Clone(Old);
        }
        else
        {
            this._Health = 100;
            this._MaxHealth = 100;
            this._Mana = 30;
            this._MaxMana = 30;
            this._BaseDamage = 10;
            this._MovementSpeed = 3;
            this._Sight = 800;
            this._Radius = 100;
            this._ColdResist = 0;
            this._FireResist = 0;
            this._LightningResist = 0;
            this._PierceResist=0;
            this._SlashResist=0;
            this._BluntResist=0;
            this._FireDamage=0;
            this._ColdDamage=0;
            this._LightningDamage=0;
            this._PierceDamage=0;
            this._BluntDamage=0;
            this._SlashDamage=0;
        }
    }
    public Copy() : Stats
    {
        return new Stats(this);
    }
    public Clone(Other:Stats) : void
    {
        this._Health = Other._Health;
        this._MaxHealth = Other._MaxHealth;
        this._Mana = Other._Mana;
        this._MaxMana = Other._MaxMana;
        this._BaseDamage = Other._BaseDamage;
        this._MovementSpeed = Other._MovementSpeed;
        this._Sight = Other._Sight;
        this._Radius = Other._Radius;
        this._FireResist = Other._FireResist;
        this._ColdResist = Other._ColdResist;
        this._LightningResist = Other._LightningResist;
        this._PierceResist = Other._PierceResist;
        this._SlashResist = Other._SlashResist;
        this._BluntResist = Other._BluntResist;
        this._FireDamage = Other._FireDamage;
        this._ColdDamage = Other._ColdDamage;
        this._LightningDamage = Other._LightningDamage;
        this._PierceDamage = Other._PierceDamage;
        this._SlashDamage = Other._SlashDamage;
        this._BluntDamage = Other._BluntDamage;
    }
    public Store() : void
    {
        this._BaseStats = this.Copy();
    }
    public Reset() : void
    {
        this.Clone(this._BaseStats);
    }
}