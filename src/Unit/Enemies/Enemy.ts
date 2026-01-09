import * as TBX from 'toybox-engine';

import Unit from "../Unit";
import Player from "../Player";
import { Trait } from "../Trait";
import { GameScene } from "../../GameScene";
import { Pathfinder } from "../../Pathfinder";

import { Move } from '../Actions/Move';
import { Attack } from '../Actions/Attacks/Attack';

class Enemy extends Unit {
    private ticks: number;
    protected attackIndex: number;
    protected player: Player;
    protected trait: Trait;
    protected _pathfinder: Pathfinder;

    public get pathfinder(): Pathfinder { return this._pathfinder; }
    public set pathfinder(value: Pathfinder) { this._pathfinder = value; }

    public constructor(Old: Enemy, Scene?: GameScene) {
        super(Old, Scene);
        this.ticks = 0;
        if (Old != null) {
            this.player = Old.player;
            this.attackIndex = Old.attackIndex;
            this._Collider.Data["EnemyCollider"] = true;
        }
        else {
            this.Name = "Enemy";
            this.Trans.Scale = new TBX.Vertex(100, 150, 1);
            this.attackIndex = 0;
            this.Data["Enemy"] = true;
            this._Collider.Data["EnemyCollider"] = true;
        }
        this.AmbientColor = TBX.Color.Black;
        this.Material.Sampling = TBX.TextureSamplingType.Nearest;
        this.Material.Type = TBX.MaterialType.Lit;
    }

    // override
    public duplicate(): Enemy {
        return new Enemy(this, this._Scene);
    }

    // override
    public init(scene: GameScene): void {
        super.init(scene);
        this.player = scene.Player;
    }

    // override
    public update() {
        if (!this._Scene) return;
        if (!this._CurrentAction || this.ticks <= 0) {
            this.ticks = 60;
            this.behaviour();
        }
        if (this._CurrentAction) {
            this.ticks--;
            if (!this._CurrentAction.Apply(this._Scene)) {
                this._CurrentAction = null;
            }
            if (this._CurrentAction) {
                this._LastDirection = this._CurrentAction.Direction;
                if (this._CurrentAction.Set == 2) this.calculateSpriteSet(this._CurrentAction.Set + this.attackIndex, this._CurrentAction.Direction);
                else this.calculateSpriteSet(this._CurrentAction.Set, this._CurrentAction.Direction);
            }
            else this.calculateSpriteSet(0);
        }
        else this.calculateSpriteSet(0);
    }

    // override
    public destroy() {
        this._Scene.Remove(this._Collider);
        this._Scene.Remove(this);
    }
    
    // virtual
    protected behaviour() {
        
        if (!this.player) return;
        if (TBX.Vertex.Distance(this._Collider.Trans.Translation, this.player.Collider.Trans.Translation) < this._Stats.Radius) {
            this._CurrentAction = new Attack(null, "EnemyAttack", this);
            this._CurrentAction.Prefs["TargetType"] = "Player";
            this._CurrentAction.Target = this.player.Collider.Trans.Translation;
        }
        else if (TBX.Vertex.Distance(this._Collider.Trans.Translation, this.player.Collider.Trans.Translation) < this._Stats.Sight) {
            let NextStep = null;
            this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "EnemyMove", this);
            NextStep = new TBX.Vertex(this.player.Collider.Trans.Translation.X, this.player.Collider.Trans.Translation.Y, 0);
            this._CurrentAction.Target = NextStep;
            this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider", "PlayerCollider"];
        }
    }
}

export default Enemy;
