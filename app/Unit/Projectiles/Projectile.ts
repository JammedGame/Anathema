import * as TBX from 'toybox-engine';

import Unit from "./../Unit";
import { Damage } from "./../Damage";
import { Move } from "./../Actions/Move";
import { GameScene } from "./../../GameScene";
import { SpriteSetLoader, SpriteSetResourcePath } from "./../../Util/SpriteSetLoader";

class Projectile extends Unit {
    private _Applying: boolean;
    protected _Area: boolean;
    protected _RadiusDamage: boolean;
    protected _Radius: number;
    protected _DamageFactor: number;

    public constructor(Old: Projectile, ColliderTypes: string[], Scene?: GameScene) {
        super(Old, Scene);
        this._Applying = false;
        if (Old != null) {
            this._Area = Old._Area;
            this._RadiusDamage = Old._RadiusDamage;
            this._Radius = Old._Radius;
            this._DamageFactor = Old._DamageFactor;
            this._Collider = Old._Collider;
        }
        else {
            this._Area = false;
            this._RadiusDamage = false;
            this._Radius = 100;
            this._DamageFactor = 1.0;
            this.Data["ColliderTypes"] = ColliderTypes;
            this._Collider.Data["ProjectileCollider"] = true;
        }
        this.init(Scene);
    }

    // override
    public duplicate(): Projectile {
        return new Projectile(this, null, this._Scene);
    }

    public initProjectile(target: Unit): void {
        this._Collider.Trans.Translation = this.Trans.Translation;
        this._CurrentAction = new Move(this.Stats.MovementSpeed, null, "ProjectileMove", this);
        this._CurrentAction.Prefs["ColliderTypes"] = this.Data["ColliderTypes"];
        this._CurrentAction.Target = target;
    }

    // override
    public update(): void {
        if (this._CurrentAction) {
            if (!this._CurrentAction.Apply(this._Scene)) {
                this._CurrentAction = null;
            }
            if (this._CurrentAction) {
                this._LastDirection = this._CurrentAction.Direction;
                this.calculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
            }
        }
        else this.apply();
    }

    // override
    public destroy() {
        this.Active = false;
        this._Scene.Remove(this._Collider);
        this._Scene.Remove(this);
    }

    // virtual
    protected apply(): void {
        if (this._Applying) return;
        this._Applying = true;
        let ColliderTypes: string[] = this.Collision.Specific;
        for (let i = 0; i < ColliderTypes.length; i++) {
            let PossibleColliders = this._Scene.FindByData(ColliderTypes[i], true);
            if (PossibleColliders.length == 0) continue;
            if (PossibleColliders.indexOf(this._Collider) != -1) PossibleColliders.splice(PossibleColliders.indexOf(this._Collider), 1);
            TBX.CollisionUtil.CalculateTypeCollisions(ColliderTypes[i], this._Collider, PossibleColliders as TBX.DrawObject[]);
            let Colliders = this._Collider.Data["Colliders_" + ColliderTypes[i]];
            for (let j = 0; j < Colliders.length; j++) {
                this.damage(Colliders[j].Data["Owner"]);
                if (!this._Area) break;
            }
        }
        this.destroy();
    }

    protected damage(Victim: Unit): void {
        Damage.Single.SingleDamage(this, Victim, this._DamageFactor);
    }

    protected loadSets(KeyWord: string, Length: number, Seed?: number) {
        let Set = SpriteSetLoader.LoadSet(SpriteSetResourcePath + "Projectiles/", KeyWord, Length, Seed);
        this.SpriteSets.push(Set);
        this.UpdateSpriteSet(0);
    }

    // override
    protected calculateSpriteSet(Set: number, Direction: any): void {
        let Angle = this.calculateDirection(Direction);
        this.Trans.Rotation.Z = Angle;
    }

    // override
    protected calculateDirection(Direction: any): number {
        let Angle = TBX.Vertex.Angle(new TBX.Vertex(0, -1, 0), Direction);
        Angle += 90;
        return Angle;
    }
}

export default Projectile;
