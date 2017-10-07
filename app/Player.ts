export { Player, PlayerKeyPress };

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { HealthBar } from "./HealthBar";
import { Weapon } from "./Weapon";

class Player extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private _Collider: any;
    private _HealthBar: HealthBar;
    private _Weapon: Weapon;
    private _Enemy: any[];
    public get HealthBar(): any { return this._HealthBar; }
    public get Weapon(): any { return this._Weapon; }
    public get Collider(): any { return this._Collider; }
    public constructor(Scene: GameScene) {
        super();
        this.Name = "Player";
        this._Scene = Scene;
        this.Fixed = true;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.SpriteSets = [];
        for(let i = 0; i < 16; i++) this.SpriteSets.push(new Engineer.Engine.SpriteSet(null, "Set"));

        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets[0].Sprites = [];
        for(let i = 0; i < 9; i++) this.SpriteSets[0].Sprites.push("/build/resources/player/walk/Up"+i+".png");
        this.SpriteSets[1].Sprites = [];
        for(let i = 0; i < 9; i++) this.SpriteSets[1].Sprites.push("/build/resources/player/walk/Right"+i+".png");
        this.SpriteSets[2].Sprites = [];
        for(let i = 0; i < 9; i++) this.SpriteSets[2].Sprites.push("/build/resources/player/walk/Down"+i+".png");
        this.SpriteSets[3].Sprites = [];
        for(let i = 0; i < 9; i++) this.SpriteSets[3].Sprites.push("/build/resources/player/walk/Left"+i+".png");

        this.SpriteSets[4].Sprites = [];
        for(let i = 0; i < 1; i++) this.SpriteSets[4].Sprites.push("/build/resources/player/walk/Up"+i+".png");
        this.SpriteSets[5].Sprites = [];
        for(let i = 0; i < 1; i++) this.SpriteSets[5].Sprites.push("/build/resources/player/walk/Right"+i+".png");
        this.SpriteSets[6].Sprites = [];
        for(let i = 0; i < 1; i++) this.SpriteSets[6].Sprites.push("/build/resources/player/walk/Down"+i+".png");
        this.SpriteSets[7].Sprites = [];
        for(let i = 0; i < 1; i++) this.SpriteSets[7].Sprites.push("/build/resources/player/walk/Left"+i+".png");

        this.SpriteSets[8].Sprites = [];
        for(let i = 0; i < 8; i++) this.SpriteSets[8].Sprites.push("/build/resources/player/attack/Up"+i+".png");
        this.SpriteSets[9].Sprites = [];
        for(let i = 0; i < 8; i++) this.SpriteSets[9].Sprites.push("/build/resources/player/attack/Right"+i+".png");
        this.SpriteSets[10].Sprites = [];
        for(let i = 0; i < 8; i++) this.SpriteSets[10].Sprites.push("/build/resources/player/attack/Down"+i+".png");
        this.SpriteSets[11].Sprites = [];
        for(let i = 0; i < 8; i++) this.SpriteSets[11].Sprites.push("/build/resources/player/attack/Left"+i+".png");

        this.SpriteSets[12].Sprites = [];
        for(let i = 0; i < 7; i++) this.SpriteSets[12].Sprites.push("/build/resources/player/cast/Up"+i+".png");
        this.SpriteSets[13].Sprites = [];
        for(let i = 0; i < 7; i++) this.SpriteSets[13].Sprites.push("/build/resources/player/cast/Right"+i+".png");
        this.SpriteSets[14].Sprites = [];
        for(let i = 0; i < 7; i++) this.SpriteSets[14].Sprites.push("/build/resources/player/cast/Down"+i+".png");
        this.SpriteSets[15].Sprites = [];
        for(let i = 0; i < 7; i++) this.SpriteSets[15].Sprites.push("/build/resources/player/cast/Left"+i+".png");

        this.SpriteSets[0].Seed = 5;
        this.SpriteSets[1].Seed = 5;
        this.SpriteSets[2].Seed = 5;
        this.SpriteSets[3].Seed = 5;

        this.SpriteSets[8].Seed = 5;
        this.SpriteSets[9].Seed = 5;
        this.SpriteSets[10].Seed = 5;
        this.SpriteSets[11].Seed = 5;

        this.SpriteSets[12].Seed = 5;
        this.SpriteSets[13].Seed = 5;
        this.SpriteSets[14].Seed = 5;
        this.SpriteSets[15].Seed = 5;

        this.Data["Player"] = true;
        this._HealthBar = new HealthBar(this._Scene);
        this._Weapon = new Weapon(this._Scene, "Staff");
        this._Collider = new Engineer.Engine.Tile();
        this._Collider.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this._Collider.Trans.Translation = new Engineer.Math.Vertex(960, 540, 0);
        this._Collider.Active = false;
        this._Collider.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        this._Scene.Data["Character_Collider"] = this._Collider;
        this._Scene.Data["Character"] = this;
        this._Enemy = this._Scene.GetObjectsWithData("Enemy", true);
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }

    public CheckSingleEnemy(): any {
        for (let i = 0; i < this._Enemy.length; i++) {
            if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Enemy[i]) < this.Trans.Scale.X && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Enemy[i]) < this.Trans.Scale.Y) {
                return this._Enemy[i];
            }
        }
        return null;
    }
    public SingleTargetDmg(): void {
        let nmy:any;
        nmy=this.CheckSingleEnemy();
        if(nmy!=null){
            if(nmy.Health-this._Weapon.Damage>0){
            nmy.Health(this._Weapon.Damage);
            }
            else{
                this.DistroyEnemy();
            }
        }
    }
    public DistroyEnemy():void{

    }



}



class PlayerKeyPress {
    public Left: boolean;
    public Right: boolean;
    public Down: boolean;
    public Up: boolean;
    public constructor() {
        this.Left = false;
        this.Right = false;
        this.Down = false;
        this.Up = false;
    }
}