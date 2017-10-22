export { Player };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { Unit } from "./Unit";
import { Stats } from "./Stats";
import { Action } from "./Actions/Action";
import { Move } from "./Actions/Move";
import { Traits } from "./Trait" 

class Player extends Unit
{
    private _PlayerRightClick: boolean;
    private _PlayerLeftClick: boolean;
    public constructor(Scene: GameScene)
    {
        super(Scene);
        this.Name = "Player";
        this.Fixed = true;
        this.Data["Player"] = true;

        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 540, 1);
        this.CreateCollider();
        this._Collider.Data["PlayerCollider"] = true;

        this.LoadSprites();

        this._Scene.Events.MouseDown.push(this.MouseClick.bind(this));

        this._Scene.AddSceneObject(this);
        this._Scene.AddSceneObject(this._Collider);
    }
    private MouseClick(G: any, Args: any)
    {
        if (Args.MouseButton == 0) this.ActionMove(Args.Location);
        if (Args.MouseButton == 2) {}
    }
    private ActionMove(Location: any)
    {
        Location = new Engineer.Math.Vertex(Location.X - this._Scene.Trans.Translation.X, Location.Y - this._Scene.Trans.Translation.Y);
        this._CurrentAction = new Move(this._Stats.MovementSpeed, null, "PlayerMove", this);
        this._CurrentAction.Target = Location;
        this._CurrentAction.Prefs["ColliderTypes"] = ["Solid", "EnemyCollider"];
    }
    private LoadSprites()
    {
        this.SpriteSets = [];
        for (let i = 0; i < 16; i++) this.SpriteSets.push(new Engineer.Engine.SpriteSet(null, "Set"));

        this.SpriteSets[0].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[0].Sprites.push("/build/resources/player/walk/Up" + i + ".png");
        this.SpriteSets[1].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[1].Sprites.push("/build/resources/player/walk/Right" + i + ".png");
        this.SpriteSets[2].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[2].Sprites.push("/build/resources/player/walk/Down" + i + ".png");
        this.SpriteSets[3].Sprites = [];
        for (let i = 0; i < 1; i++) this.SpriteSets[3].Sprites.push("/build/resources/player/walk/Left" + i + ".png");

        this.SpriteSets[4].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[4].Sprites.push("/build/resources/player/walk/Up" + i + ".png");
        this.SpriteSets[5].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[5].Sprites.push("/build/resources/player/walk/Right" + i + ".png");
        this.SpriteSets[6].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[6].Sprites.push("/build/resources/player/walk/Down" + i + ".png");
        this.SpriteSets[7].Sprites = [];
        for (let i = 0; i < 9; i++) this.SpriteSets[7].Sprites.push("/build/resources/player/walk/Left" + i + ".png");

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

        this.SpriteSets[4].Seed = 5;
        this.SpriteSets[5].Seed = 5;
        this.SpriteSets[6].Seed = 5;
        this.SpriteSets[7].Seed = 5;

        this.SpriteSets[8].Seed = 5;
        this.SpriteSets[9].Seed = 5;
        this.SpriteSets[10].Seed = 5;
        this.SpriteSets[11].Seed = 5;

        this.SpriteSets[12].Seed = 5;
        this.SpriteSets[13].Seed = 5;
        this.SpriteSets[14].Seed = 5;
        this.SpriteSets[15].Seed = 5;
    }
}