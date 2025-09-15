export { Stats };

import Engineer from "./../Engineer";

class Stats {
    public Health: number;
    public MaxHealth: number;
    public HealthRegeneration: number;
    public Mana: number;
    public MaxMana: number;
    public ManaRegeneration: number;
    public AttackSpeed: number;
    public LifeSteal: number;
    public CritChance: number;
    public CritMultiplier: number;
    public BleedChance: number;
    public MovementSpeed: number;
    public Sight: number;
    public Radius: number;
    public BaseStats?: Stats;
    public Armor: number;
    public FireResist: number;
    public ColdResist: number;
    public LightningResist: number;
    public PhysicalDamage: number;
    public FireDamage: number;
    public ColdDamage: number;
    public LightningDamage: number;
    public Bleeding: boolean;
    public constructor(Old?: Stats) {
        if (Old != null) {
            this.Clone(Old);
        }
        else {
            this.Health = 100;
            this.MaxHealth = 100;
            this.HealthRegeneration = 0.0001;
            this.Mana = 30;
            this.MaxMana = 30;
            this.ManaRegeneration = 0.1;
            this.AttackSpeed = 1;
            this.LifeSteal = 0;
            this.CritChance = 0;
            this.CritMultiplier = 2;
            this.BleedChance = 0;
            this.MovementSpeed = 3;
            this.Sight = 800;
            this.Radius = 150;
            this.ColdResist = 0;
            this.FireResist = 0;
            this.LightningResist = 0;
            this.FireDamage = 0;
            this.ColdDamage = 0;
            this.LightningDamage = 0;
            this.Bleeding = false;
        }
    }
    public Copy(): Stats {
        return new Stats(this);
    }
    public Clone(Old: Stats): void {
        this.Health = Old.Health;
        this.MaxHealth = Old.MaxHealth;
        this.HealthRegeneration = Old.HealthRegeneration;
        this.Mana = Old.Mana;
        this.MaxMana = Old.MaxMana;
        this.ManaRegeneration = Old.ManaRegeneration;
        this.AttackSpeed = Old.AttackSpeed;
        this.LifeSteal = Old.LifeSteal;
        this.CritChance = Old.CritChance;
        this.CritMultiplier = Old.CritMultiplier;
        this.MovementSpeed = Old.MovementSpeed;
        this.Sight = Old.Sight;
        this.Radius = Old.Radius;
        this.Armor = Old.Armor;
        this.FireResist = Old.FireResist;
        this.ColdResist = Old.ColdResist;
        this.LightningResist = Old.LightningResist;
        this.PhysicalDamage = Old.PhysicalDamage;
        this.FireDamage = Old.FireDamage;
        this.ColdDamage = Old.ColdDamage;
        this.LightningDamage = Old.LightningDamage;
    }
    public Store(): void {
        this.BaseStats = this.Copy();
    }
    public Reset(): void {
        let Health = this.Health;
        let Mana = this.Mana;
        this.Clone(this.BaseStats);
        this.Health = Health;
        this.Mana = Mana;
    }
}
