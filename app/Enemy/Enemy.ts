export { Enemy };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import { Trait, TraitType, Traits } from "./../Trait" 

abstract class Enemy extends Engineer.Engine.Sprite {
    protected _Health: number;
    protected _MaxHealth: number;
    protected _Damage: number;
    protected _Scene: GameScene;
    protected pos_x: number;
    protected pos_y: number;
    protected counter: number;
    protected rng_counter: number;
    protected s_direction: number;
    protected moving: boolean;
    protected following: boolean;
    protected _Player_Collider: any;
    protected _Player: any;
    protected moveSpeed: number;
    protected moveArea: number;
    protected followArea: number;
    protected _SolidColliders: any[];
    protected _Traits: Traits;

    public get Health(): number { return this._Health; }
    public set Health(dmg: number) { this._Health = dmg; }

    public AddTrait(trait: Trait): void {
        this._Traits.AddTrait(trait);
    }

    public AddTraitValue(type: TraitType, value: number): void {
        this._Traits.AddTrait(new Trait(type, value));
    }

    public get Traits(): Traits { return this._Traits; }

    public Trait(type: TraitType): number {
        return this._Traits.Trait(type);
    }

    public constructor(Scene: GameScene,start_X:number,start_Y:number) {
        super();
        this._Traits = new Traits();
        this.moveSpeed = 10;
        this.moveArea = 500;
        this.followArea = 300;
        this._MaxHealth = 100;
        this._Health = this._MaxHealth;
        this._Damage = 25;
        this.Name = "Enemy";
        this._Scene = Scene;
        this._Player_Collider = this._Scene.Data["Character_Collider"];
        this._Player = this._Scene.Data["Character"];
        this.counter = 0;
        this.rng_counter = 0;
        this.s_direction = Math.round(3 * Math.random());
        this.moving = true;
        this.following = false;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(start_X, start_Y, 0.5);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "S_WalkN"), new Engineer.Engine.SpriteSet(null, "S_WalkE"), new Engineer.Engine.SpriteSet(null, "S_WalkS"), new Engineer.Engine.SpriteSet(null, "S_WalkW"), new Engineer.Engine.SpriteSet(null, "S_AttN"), new Engineer.Engine.SpriteSet(null, "S_AttE"), new Engineer.Engine.SpriteSet(null, "S_AttS"), new Engineer.Engine.SpriteSet(null, "S_AttW")];
       
        this.SpriteSets[0].Sprites = ["/build/resources/skeleton/E_up00.png", "/build/resources/skeleton/E_up01.png", "/build/resources/skeleton/E_up02.png", "/build/resources/skeleton/E_up03.png", "/build/resources/skeleton/E_up04.png", "/build/resources/skeleton/E_up05.png", "/build/resources/skeleton/E_up06.png", "/build/resources/skeleton/E_up07.png", "/build/resources/skeleton/E_up08.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/skeleton/E_rgt00.png", "/build/resources/skeleton/E_rgt01.png", "/build/resources/skeleton/E_rgt02.png", "/build/resources/skeleton/E_rgt03.png", "/build/resources/skeleton/E_rgt04.png", "/build/resources/skeleton/E_rgt05.png", "/build/resources/skeleton/E_rgt06.png", "/build/resources/skeleton/E_rgt07.png", "/build/resources/skeleton/E_rgt08.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/skeleton/E_dwn00.png", "/build/resources/skeleton/E_dwn01.png", "/build/resources/skeleton/E_dwn02.png", "/build/resources/skeleton/E_dwn03.png", "/build/resources/skeleton/E_dwn04.png", "/build/resources/skeleton/E_dwn05.png", "/build/resources/skeleton/E_dwn06.png", "/build/resources/skeleton/E_dwn07.png", "/build/resources/skeleton/E_dwn08.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/skeleton/E_lft00.png", "/build/resources/skeleton/E_lft01.png", "/build/resources/skeleton/E_lft02.png", "/build/resources/skeleton/E_lft03.png", "/build/resources/skeleton/E_lft04.png", "/build/resources/skeleton/E_lft05.png", "/build/resources/skeleton/E_lft06.png", "/build/resources/skeleton/E_lft07.png", "/build/resources/skeleton/E_lft08.png"];
        this.SpriteSets[4].Sprites = ["/build/resources/skeleton/S_slash_up00.png", "/build/resources/skeleton/S_slash_up01.png", "/build/resources/skeleton/S_slash_up02.png", "/build/resources/skeleton/S_slash_up03.png", "/build/resources/skeleton/S_slash_up04.png", "/build/resources/skeleton/S_slash_up05.png"];
        this.SpriteSets[5].Sprites = ["/build/resources/skeleton/S_slash_rgt00.png", "/build/resources/skeleton/S_slash_rgt01.png", "/build/resources/skeleton/S_slash_rgt02.png", "/build/resources/skeleton/S_slash_rgt03.png", "/build/resources/skeleton/S_slash_rgt04.png", "/build/resources/skeleton/S_slash_rgt05.png"];
        this.SpriteSets[6].Sprites = ["/build/resources/skeleton/S_slash_btm00.png", "/build/resources/skeleton/S_slash_btm01.png", "/build/resources/skeleton/S_slash_btm02.png", "/build/resources/skeleton/S_slash_btm03.png", "/build/resources/skeleton/S_slash_btm04.png", "/build/resources/skeleton/S_slash_btm05.png"];
        this.SpriteSets[7].Sprites = ["/build/resources/skeleton/S_slash_lft00.png", "/build/resources/skeleton/S_slash_lft01.png", "/build/resources/skeleton/S_slash_lft02.png", "/build/resources/skeleton/S_slash_lft03.png", "/build/resources/skeleton/S_slash_lft04.png", "/build/resources/skeleton/S_slash_lft05.png"];
        this.SpriteSets[0].Seed = 25;
        this.SpriteSets[1].Seed = 25;
        this.SpriteSets[2].Seed = 25;
        this.SpriteSets[3].Seed = 25;
        this.SpriteSets[4].Seed = 15;
        this.SpriteSets[5].Seed = 15;
        this.SpriteSets[6].Seed = 15;
        this.SpriteSets[7].Seed = 15;
        this.pos_x = this.Trans.Translation.X;
        this.pos_y = this.Trans.Translation.Y;
        this.Data["Enemy"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Radius2D;
        this._SolidColliders = this._Scene.GetObjectsWithData("Solid", true);
        this._Scene.Events.TimeTick.push(this.movement.bind(this));
        this._Scene.Events.TimeTick.push(this.attack.bind(this));
        this._Scene.Events.TimeTick.push(this.follow.bind(this));
        this.Events.SpriteSetAnimationComplete.push(this.doDamage.bind(this));
        this._Scene.AddSceneObject(this);
    }
    public movement(): void {
        if (this.moving && !this.following) {

            if (this.counter >= 15) {

                this.counter = 0;

                if (this.rng_counter >= 5) {
                    this.s_direction = Math.round(3 * Math.random());
                    this.rng_counter = 0;
                }
                Engineer.Util.Collision.CalculateObjectCollisions("Solid", this, this._SolidColliders);
                switch (this.s_direction) {
                    case 0:
                        if (this.Trans.Translation.Y > this.pos_y - this.moveArea) {
                            if (!this.Data["Collision_Solid"].Top) {
                                this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y - this.moveSpeed, 0.5);
                                this.UpdateSpriteSet(0);
                                this.rng_counter++;
                            }
                            else {
                                this.rng_counter = 5;
                            }
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                    case 1:
                        if (this.Trans.Translation.X < this.pos_x + this.moveArea) {
                            if (!this.Data["Collision_Solid"].Right) {
                                this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y, 0.5);
                                this.UpdateSpriteSet(1);
                                this.rng_counter++;
                            }
                            else {
                                this.rng_counter = 5;
                            }
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                    case 2:
                        if (this.Trans.Translation.Y < this.pos_y + this.moveArea) {
                            if (!this.Data["Collision_Solid"].Bottom) {
                                this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y + this.moveSpeed, 0.5);
                                this.UpdateSpriteSet(2);
                                this.rng_counter++;
                            }
                            else {
                                this.rng_counter = 5;
                            }
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                    case 3:
                        if (this.Trans.Translation.X > this.pos_x - this.moveArea) {
                            if (!this.Data["Collision_Solid"].Left) {
                                this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y, 0.5);
                                this.UpdateSpriteSet(3);
                                this.rng_counter++;
                            }
                            else {
                                this.rng_counter = 5;
                            }
                        }
                        else {
                            this.rng_counter = 5;
                        }
                        break;
                }
            }
            else this.counter++;
        }
    }

    abstract doDamage(G: any, Args: any);

    public attack(): void {

        if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) < this._Player_Collider.Trans.Scale.X && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) < this._Player_Collider.Trans.Scale.Y) {
            this.moving = false;
            this.following = false;
            this.UpdateSpriteSet(4 + this.checkMove());
        }
        else {
            this.following = true;
            this.moving = false;
        }
    }
    public checkMove(): number {
        if (this._Player_Collider.Trans.Translation.X - this.Trans.Translation.X >= 0 && this._Player_Collider.Trans.Translation.Y - this.Trans.Translation.Y <= 0) {
            return 0;
        }
        if (this._Player_Collider.Trans.Translation.X - this.Trans.Translation.X >= 0 && this._Player_Collider.Trans.Translation.Y - this.Trans.Translation.Y >= 0) {
            return 1;
        }
        if (this._Player_Collider.Trans.Translation.X - this.Trans.Translation.X <= 0 && this._Player_Collider.Trans.Translation.Y - this.Trans.Translation.Y >= 0) {
            return 2;
        }
        if (this._Player_Collider.Trans.Translation.X - this.Trans.Translation.X <= 0 && this._Player_Collider.Trans.Translation.Y - this.Trans.Translation.Y <= 0) {
            return 3;
        }
    }
    public follow(): void {
        if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) < this.followArea) {
            this.following = true;
            this.moving = false;

            if (this.counter >= 15) {

                this.counter = 0;
                Engineer.Util.Collision.CalculateObjectCollisions("Solid", this, this._SolidColliders);
                if (this.checkMove() == 0) {
                    if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.X * 2 / 5 && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.Y * 2 / 3) {
                        if (!this.Data["Collision_Solid"].Top) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y - this.moveSpeed, 0.5);
                            this.s_direction = 0;
                            this.UpdateSpriteSet(0);
                        }
                    }
                }
                if (this.checkMove() == 1) {
                    if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.X * 2 / 5 && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.Y * 2 / 3) {
                        if (!this.Data["Collision_Solid"].Right) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X + this.moveSpeed, this.Trans.Translation.Y + this.moveSpeed, 0.5);
                            this.s_direction = 1;
                            this.UpdateSpriteSet(1);
                        }
                    }
                }
                if (this.checkMove() == 2) {
                    if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.X * 2 / 5 && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.Y * 2 / 3) {
                        if (!this.Data["Collision_Solid"].Bottom) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y + this.moveSpeed, 0.5);
                            this.s_direction = 2;
                            this.UpdateSpriteSet(2);
                        }
                    }
                }
                if (this.checkMove() == 3) {
                    if (Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.X * 2 / 5 && Engineer.Math.Vertex.Distance(this.Trans.Translation, this._Player_Collider.Trans.Translation) > this._Player_Collider.Trans.Scale.Y * 2 / 3) {
                        if (!this.Data["Collision_Solid"].Left) {
                            this.Trans.Translation = new Engineer.Math.Vertex(this.Trans.Translation.X - this.moveSpeed, this.Trans.Translation.Y - this.moveSpeed, 0.5);
                            this.s_direction = 3;
                            this.UpdateSpriteSet(3);
                        }
                    }
                }
            }
            else this.counter++;
        }
        else {
            this.moving = true;
            this.following = false;
        }
    }
}
