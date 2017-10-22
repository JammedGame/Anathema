export { Unit };

import Engineer from "./Engineer";

import { GameScene } from "./GameScene";
import { Trait, TraitType, Traits } from "./Trait" 

class Unit extends Engineer.Engine.Sprite
{
    protected _OnMove: boolean;
    protected _Health: number;
    protected _MaxHealth: number;
    protected _Damage: number;
    protected _MovementSpeed: number;
    protected _AttackSpeed: number;
    protected _MoveTarget: any;
    protected _Collider:any;
    protected _Scene: GameScene;
    protected _Traits: Traits;
    protected _SolidColliders: any[];
    public get Health(): number { return this._Health; }
    public set Health(value: number) { this._Health = value; }
    public get MaxHealth(): number { return this._MaxHealth; }
    public set MaxHealth(value: number) { this._MaxHealth = value; }
    public constructor(Scene:GameScene)
    {
        super();
        this._Scene = Scene;
    }
    public movement(): void
    {

    }

    abstract doDamage(G: any, Args: any);

    public attack(): void {

    }
    public checkMove(): number {

    }
    public follow(): void {

    }
}
