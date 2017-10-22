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
