export { LevelManager };

import Engineer from "./Engineer";

import { Level } from "./Level/Level";
import { GameScene } from "./GameScene";
import { EnemyCollection } from "./Unit/Enemies/EnemyCollection";
import { LevelTileset } from "./Level/Tilesets/LevelTileset";
import { LevelTilesetCollection } from "./Level/Tilesets/LevelTilesetCollection";

class LevelManager
{
    private _Game:any;
    private _Runner:any;
    private _Level:Level;
    private _Scene:GameScene;
    public Items: { [key: string]:Level; };
    public constructor(Runner, Game)
    {
        this.Items = {};
        this._Runner = Runner;
        this._Game = Game;

        let TheEnemyCollection = new EnemyCollection();
        let TilesetCollection = new LevelTilesetCollection();

        this.Items["Beach"] = new Level(null, 5, TilesetCollection.Items["Beach"]);
        this.Items["Beach"].AddEnemyEntry("Skeleton", 50);
    }
    public StartLevel(Level:string)
    {
        if(this._Level) this.Destroy();
        if(!this.Items[Level]) return;
        this._Level = this.Items[Level].Copy();
        this._Scene = new GameScene();
        this.InitEnemies();
        this._Game.AddScene(this._Scene);
        this._Runner.SwitchScene("GameScene", false);
        this._Scene.Init(this._Level);
    }
    private InitEnemies() : void
    {
        let Enemies = [];
        for(let i = 0; i < this._Level.EnemyEntries.length; i++)
        {
            for(let j = 0; j < this._Level.EnemyEntries[i].Ammount; j++)
            {
                let Enemy = EnemyCollection.Single.Items[this._Level.EnemyEntries[i].Name].Copy();
                Enemies.push(Enemy);
                Enemy.Init(this._Scene, this._Scene.Player);
            }
        }
        this._Level.Enemies = Enemies;
    }
    private Destroy() : void
    {
        this._Scene.Pause = true;
        this._Level = null;
        this._Game.Scenes.splice(this._Game.Scenes.indexOf(this._Scene), 1);
        this._Scene = null;
    }
}