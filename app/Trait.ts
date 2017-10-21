export { TraitType, Trait, Traits};

enum TraitType {
    FIRE_RESIST = 0,
    ICE_RESIST,
    LIGHTNING_RESIST,
    SLASH_RESIST,
    BLUNT_RESIST,
    PIERCE_RESIST
}

class Trait {
    private _Type: TraitType;
    private _Value: number;

    public get Type(): TraitType { return this._Type }
    public get Value(): number { return this._Value }

    public constructor(type: TraitType, value: number) {
        this._Type = type;
        this._Value = value;
    }
}

class Traits {
    private _Traits: {[key: number]: number};
    public get Traits(): {[key: number]: number}  { return this._Traits; }
    public Trait(type: TraitType): number { return this._Traits[type.valueOf()] }

    public constructor() {
        this._Traits = {};
    }

    public AddTrait(trait: Trait): void {
        if (this._Traits[trait.Type.valueOf()]) {
            this._Traits[trait.Type.valueOf()] += trait.Value;
        } else {
            this._Traits[trait.Type.valueOf()] = trait.Value;
        }
    }
}

