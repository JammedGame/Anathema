export { HealthBar };

import { Player } from "./Player";
import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { HealthBorder } from "./HealthBorder";

class HealthBar extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private _MaxHealth: number;
    private _Health: number;
    private _HealthBorder: HealthBorder;
    private _PrevLocation: number;
    private _Size: number;
    private _Loc: number;
    private _XPosition: number;

    public constructor(Scene: GameScene) {
        super();
        this.Name = "HealthBar";
        this._Scene = Scene;
        this.Fixed = true;
        this._MaxHealth = 300;
        this._Health = this._MaxHealth;
        this._PrevLocation = 0;
        this._Size = 210;
        this._Loc = 216;
        this._XPosition = 192;
        this.Trans.Scale = new Engineer.Math.Vertex(this._Size, this._Size, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(192, 216, 0.5);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "HealthBar")];
        this.SpriteSets[0].Sprites = ["/build/resources/HealthBar.png"];
        this._HealthBorder = new HealthBorder(this._Scene, this._MaxHealth, this._XPosition);
        this._Scene.AddSceneObject(this);
    }
    public Damage(hitValue: number) {
        this._Health -= hitValue;
        if (this._Health - hitValue >= 0) {
            this._PrevLocation = this.Trans.Scale.Y;
            console.log(this._Health);
            console.log(this._MaxHealth);
            this.Trans.Scale = new Engineer.Math.Vertex(this._Size, (this._Health * 1.0 / this._MaxHealth) * this._Size, 1);
            console.log(this.Trans.Scale);
            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this._Loc + (this._Size - this.Trans.Scale.Y) / 2, 0);
        }
        else {
            this.Trans.Scale = new Engineer.Math.Vertex(1, 100, 0);
        }
    }
    public Heal(healValue: number) {
        this._Health += healValue;
        if (this._Health + healValue <= this._MaxHealth) {
            this.Trans.Scale = new Engineer.Math.Vertex(this.Trans.Scale.X, this.Trans.Scale.Y + healValue, 0);
        }
        else {
            this.Trans.Scale = new Engineer.Math.Vertex(this._MaxHealth, 100, 0);
        }
    }
}

