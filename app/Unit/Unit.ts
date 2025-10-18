import * as TBX from 'toybox-engine';

import { Stats } from "./Stats";
import { Traits } from "./Trait";
import { Action } from "./Actions/Action";
import { GameScene } from "./../GameScene";

const VISIBLE_COLLIDERS = true;

class Unit extends TBX.Sprite {
    protected _Stats: Stats
    protected _Traits: Traits;
    protected _Scene: GameScene;
    protected _Collider: TBX.Tile;
    protected _CurrentAction: Action;
    protected _LastDirection: TBX.Vertex;

    public get Collider(): any { return this._Collider; }
    public get Stats(): Stats { return this._Stats; }
    public set Stats(value: Stats) { this._Stats = value; }
    public get Traits(): Traits { return this._Traits; }

    public constructor(Old: Unit, Scene?: GameScene) {
        super(Old);
        if (Old != null) {
            this._Scene = Scene;
            this._Traits = Old._Traits.Copy();
            this._Stats = Old._Stats.Copy();
            this._Collider = Old._Collider.Copy();
            for (let Key in Old.Data) {
                this.Data[Key] = Old.Data[Key];
            }
            this.createCollider();
        }
        else {
            this._Scene = Scene;
            this._Traits = new Traits();
            this._Stats = new Stats();
            this.createCollider();
        }
        this._Stats.Store();
    }

    // override
    public duplicate(): Unit {
        return new Unit(this, this._Scene);
    }

    // virtual
    public init(Scene: GameScene) {
        this._Scene = Scene;
        this._Scene.Attach(this);
        this._Scene.Attach(this._Collider);
    }

    // virtual
    public update(): void {
        if (this._CurrentAction) {
            if (!this._CurrentAction.Apply(this._Scene)) {
                this._CurrentAction = null;
            }
            if (this._CurrentAction) {
                this._LastDirection = this._CurrentAction.Direction;
                this.calculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
            }
            else this.calculateSpriteSet(0, this._LastDirection);
        }
        else this.calculateSpriteSet(0);
        let NewHealth = this._Stats.Health + this._Stats.HealthRegeneration;
        if (NewHealth > this._Stats.MaxHealth) this._Stats.Health = this._Stats.MaxHealth;
        if (NewHealth <= 0) {
            this.destroy();
        }
        else this._Stats.Health = NewHealth;
        let NewMana = this._Stats.Mana + this._Stats.ManaRegeneration;
        if (NewMana > this._Stats.MaxMana) this._Stats.Mana = this._Stats.MaxMana;
        else this._Stats.Mana = NewMana;
    }

    // virtual
    public destroy(): void { }

    // virtual
    public updatePosition(offset: TBX.Vertex): void {
        const newPosition = new TBX.Vertex(
            this._Collider.Trans.Translation.X + offset.X,
            this._Collider.Trans.Translation.Y + offset.Y,
            1,
        );
        const playerY = this._Scene.Player.Collider.Trans.Translation.Y;
        let offsetY =  this.absMax((newPosition.Y - playerY) / 1080, 0.5);
        if (offsetY < 0) offsetY -= 0.1;
        if (offsetY > 0) offsetY += 0.1;
        this.Trans.Translation = new TBX.Vertex(
            newPosition.X,
            newPosition.Y - 50,
            1 + offsetY,
        );
        this.Collider.Trans.Translation = newPosition.Copy();
    }

    // virtual
    public move(offset: TBX.Vertex): void {

    }

    public matrixCoord(): number[] {
        let ConvX = Math.floor(this._Collider.Trans.Translation.X / 120);
        let ConvY = Math.floor(this._Collider.Trans.Translation.Y / 120);
        return [ConvX, ConvY];
    }

    protected createCollider(): void {
        this._Collider = new TBX.Tile();
        this._Collider.Trans.Scale = new TBX.Vertex(this.Trans.Scale.X / 2, this.Trans.Scale.X / 2, 1);

        if (VISIBLE_COLLIDERS) {
            this._Collider.Paint = TBX.Color.Red;
            this._Collider.Collection = new TBX.ImageCollection(null, ["/border_c.png"]);
            this._Collider.AmbientColor = TBX.Color.Red;
            this._Collider.Index = 0;
            this._Collider.Active = true;
        } else {
            this._Collider.Active = false;
        }

        this._Collider.Collision.Active = true;
        this._Collider.Collision.Type = TBX.CollisionType.Radius;
        this._Collider.Data["Owner"] = this;
    }

    protected calculateDirection(Direction: any): number {
        let Angle = TBX.Vertex.Angle(new TBX.Vertex(0, -1, 0), Direction);
        Angle += 90;
        if (Angle > 360) Angle -= 360;
        if (Angle > 45 && Angle <= 135) return 1;
        if (Angle > 135 && Angle <= 225) return 2;
        if (Angle > 225 && Angle <= 315) return 3;
        else return 0;
    }

    protected updateSeeds() {
        for (let i = 8; i < 20; i++) {
            this.SpriteSets[i].Seed = 21 - this._Stats.AttackSpeed;
        }
    }

    protected calculateSpriteSet(Set: number, Direction?: any): void {
        let DirectionIndex = 0;
        if (Direction != null) DirectionIndex = this.calculateDirection(Direction);
        this.UpdateSpriteSet(Set * 4 + DirectionIndex);
    }

    private absMax(value: number, max: number) {
        return Math.abs(value) > max
            ? (value > 0 ? max : -max)
            : value;
    }
}

export default Unit;
