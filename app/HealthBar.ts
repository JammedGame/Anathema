export { HealthBar };

import { Player } from "./Player";
import Engineer from "./Engineer";
import { GameScene } from "./GameScene";

class HealthBar extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private _MaxHealth;
    private _Health;

    public constructor(Scene: GameScene) {
        super();
        this.Name = "HealthBar";
        this._Scene = Scene;
        this.Fixed = true;
        this._MaxHealth = 100;
        this._Health = this._MaxHealth;
        this.Trans.Scale = new Engineer.Math.Vertex(this._MaxHealth, 100, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(192, 216, 1);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "HealthBar")];        
        this.SpriteSets[0].Sprites = ["/build/resources/HealthBar.png"];
        this._Scene.AddSceneObject(this);
    }
    public Damage(hitValue: number) {
        this._Health -= hitValue;
        if(this._Health-hitValue >= 0){
        this.Trans.Scale = new Engineer.Math.Vertex(this.Trans.Scale.X - hitValue, this.Trans.Scale.Y, 0);
        }
        else{
            this.Trans.Scale = new Engineer.Math.Vertex(1, 100, 0);
        }
    }
    public Heal(healValue: number) {
        this._Health += healValue;
        if (this._Health + healValue <=this._MaxHealth)
        {
            this.Trans.Scale = new Engineer.Math.Vertex(this.Trans.Scale.X + healValue, this.Trans.Scale.Y, 0);
        }
        else {
            this.Trans.Scale = new Engineer.Math.Vertex(this._MaxHealth, 100, 0);
        }
    }
}

