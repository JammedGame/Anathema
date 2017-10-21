export { ManaBar };

import { Player } from "./Player";
import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { HealthBorder } from "./HealthBorder";

class ManaBar extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private _MaxMana: number;
    private _Mana: number;
    private _HealthBorder: HealthBorder;
    private _PrevLocation: number;
    private _Size: number;
    private _Loc: number;
    private _XPosition: number;

    public constructor(Scene: GameScene) {
        super();
        this.Name = "ManaBar";
        this._Scene = Scene;
        this.Fixed = true;
        this._MaxMana = 300;
        this._Mana = this._MaxMana;
        this._PrevLocation = 0;
        this._Size = 150;
        this._Loc = 950;
        this._XPosition = 1728;
        this.Trans.Scale = new Engineer.Math.Vertex(this._Size, this._Size, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(this._XPosition, this._Loc, 0.5);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "ManaBar")];
        this.SpriteSets[0].Sprites = ["/build/resources/ManaBar.png"];
        this._HealthBorder = new HealthBorder(this._Scene, this._MaxMana, this._XPosition);
        this._Scene.AddSceneObject(this);
    }

    public Damage(hitValue: number) {

    }
}