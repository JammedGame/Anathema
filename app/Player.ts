export { Player, PlayerKeyPress };

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { HealthBar } from "./HealthBar";
import { ManaBar } from "./ManaBar";
import { Weapon } from "./Weapon";
import { Movement } from "./Movement";
import { Trait, TraitType, Traits } from "./Trait" 

class Player extends Engineer.Engine.Sprite {
    private _Scene: GameScene;
    private _Collider: any;
    private _HealthBar: HealthBar;
    private _ManaBar: ManaBar;
    private _Weapon: Weapon;
    private _Enemy: any[];
    private _stAttRange:number;
    private _mtAttRange:number;
    private _PlayerRightClick: boolean;
    private _PlayerLeftClick: boolean;
    private _Traits: Traits;
    public get HealthBar(): any { return this._HealthBar; }
    public get ManaBar(): any { return this._ManaBar; }
    public get Weapon(): Weapon { return this._Weapon; }
    public set Weapon(wpn: Weapon) { this._Weapon = wpn; }
    public get Collider(): any { return this._Collider; }


    public constructor(Scene: GameScene) {
        super();
        this._Traits = new Traits();
        this.Name = "Player";
        this._Scene = Scene;
        this.Fixed = true;        
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.SpriteSets = [];
        for (let i = 0; i < 16; i++) this.SpriteSets.push(new Engineer.Engine.SpriteSet(null, "Set"));

        this.SpriteSets[0].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[0].Sprites.push("/build/resources/player/walk/Up" + i + ".png");
        this.SpriteSets[1].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[1].Sprites.push("/build/resources/player/walk/Right" + i + ".png");
        this.SpriteSets[2].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[2].Sprites.push("/build/resources/player/walk/Down" + i + ".png");
        this.SpriteSets[3].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[3].Sprites.push("/build/resources/player/walk/Left" + i + ".png");

        this.SpriteSets[4].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[4].Sprites.push("/build/resources/player/walk/Up" + i + ".png");
        this.SpriteSets[5].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[5].Sprites.push("/build/resources/player/walk/Right" + i + ".png");
        this.SpriteSets[6].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[6].Sprites.push("/build/resources/player/walk/Down" + i + ".png");
        this.SpriteSets[7].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[7].Sprites.push("/build/resources/player/walk/Left" + i + ".png");

        this.SpriteSets[8].Sprites = [];
        for (let i = 0; i < 8; i++) this.SpriteSets[8].Sprites.push("/build/resources/player/attack/Up" + i + ".png");
        this.SpriteSets[9].Sprites = [];
        for (let i = 0; i < 8; i++) this.SpriteSets[9].Sprites.push("/build/resources/player/attack/Right" + i + ".png");
        this.SpriteSets[10].Sprites = [];
        for (let i = 0; i < 8; i++) this.SpriteSets[10].Sprites.push("/build/resources/player/attack/Down" + i + ".png");
        this.SpriteSets[11].Sprites = [];
        for (let i = 0; i < 8; i++) this.SpriteSets[11].Sprites.push("/build/resources/player/attack/Left" + i + ".png");

        this.SpriteSets[12].Sprites = [];
        for (let i = 0; i < 7; i++) this.SpriteSets[12].Sprites.push("/build/resources/player/cast/Up" + i + ".png");
        this.SpriteSets[13].Sprites = [];
        for (let i = 0; i < 7; i++) this.SpriteSets[13].Sprites.push("/build/resources/player/cast/Right" + i + ".png");
        this.SpriteSets[14].Sprites = [];
        for (let i = 0; i < 7; i++) this.SpriteSets[14].Sprites.push("/build/resources/player/cast/Down" + i + ".png");
        this.SpriteSets[15].Sprites = [];
        for (let i = 0; i < 7; i++) this.SpriteSets[15].Sprites.push("/build/resources/player/cast/Left" + i + ".png");

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
        this._ManaBar= new ManaBar(this._Scene);
        this._Weapon = new Weapon(this._Scene, "Staff");
        this._PlayerRightClick = false;
        this._PlayerLeftClick = false;
        this._Collider = new Engineer.Engine.Tile();
        this._Collider.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this._Collider.Trans.Translation = new Engineer.Math.Vertex(960, 540, 0);
        this._Collider.Active = false;
        this._Collider.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        this._Scene.Data["Character_Collider"] = this._Collider;
        this._Scene.Data["Character"] = this;
        this._Scene.Events.MouseDown.push(this.MouseClick.bind(this));
        this.Events.SpriteSetAnimationComplete.push(this.DmgEnemy.bind(this));
        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }

    public CheckSingleEnemy(): any {
        if (this._Enemy == null) {
            this._Enemy = this._Scene.GetObjectsWithData("Enemy", true);
        }
        for (let i = 0; i < this._Enemy.length; i++) {
            if (Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Enemy[i].Trans.Translation) < this.Trans.Scale.X && Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Enemy[i].Trans.Translation) < this.Trans.Scale.Y) {
                return this._Enemy[i];
            }
        }
        return null;
    }
    public CheckMultipleEnemy(): any[] {
        if (this._Enemy == null) {
            this._Enemy = this._Scene.GetObjectsWithData("Enemy", true);
        }
        let temp: any[];
        temp=[];
        for (let i = 0; i < this._Enemy.length; i++) {
            if (Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Enemy[i].Trans.Translation) < this.Trans.Scale.X && Engineer.Math.Vertex.Distance(this._Collider.Trans.Translation, this._Enemy[i].Trans.Translation) < this.Trans.Scale.Y) {
                temp.push(this._Enemy[i]);
            }
        }
        return temp;
    }
    public CalculateDmg(nmy: any,modifier:number) {
        if (nmy != null) {
            if (nmy.Health - this._Weapon.Damage*modifier > 0) {
                nmy.Health -= this._Weapon.Damage*modifier;
            }
            else {
                this.DistroyEnemy(nmy);
            }
        }
    }
    public DmgEnemy(G: any, Args: any): void {
        if (Args.CurrentSpriteSet == 8 || Args.CurrentSpriteSet == 9 || Args.CurrentSpriteSet == 10 || Args.CurrentSpriteSet == 11) {
            this._PlayerLeftClick = false;
            this.UpdateSpriteSet(8 + this._Scene.Movement.Direction);
            let nmy: any;
            nmy = this.CheckSingleEnemy();
            this.CalculateDmg(nmy,1);
        }
        if (Args.CurrentSpriteSet == 12 || Args.CurrentSpriteSet == 13 || Args.CurrentSpriteSet == 14 || Args.CurrentSpriteSet == 15) {
            this._PlayerRightClick = false;
            this.UpdateSpriteSet(12 + this._Scene.Movement.Direction);
            let nmy: any[];
            nmy = this.CheckMultipleEnemy();    
            if(nmy!=null){        
            for (let i = 0; i < nmy.length; i++) {
                this.CalculateDmg(nmy[i],2);
            }
        }
        }
    }
    public DistroyEnemy(nmy: any): void {
        nmy.Active = false;
    }
    private MouseClick(G: any, Args: any) {
        if (Args.MouseButton == 0) {
            this.BackUpSpriteSet = this.CurrentSpriteSet;
            this.UpdateSpriteSet(8 + this._Scene.Movement.Direction);
        }
        if (Args.MouseButton == 2) {
            this.BackUpSpriteSet = this.CurrentSpriteSet;
            this.UpdateSpriteSet(12 + this._Scene.Movement.Direction);
        }
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