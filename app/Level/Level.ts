export { Level };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";
import { LevelGenerator } from "./Generators/LevelGenerator";
import { LevelTileset } from "./Tilesets/LevelTileset";
import { Enemy } from "./../Unit/Enemies/Enemy";
import { Layout } from "./Layout";

class Level
{
    private _Size:number;
    private _Tileset:LevelTileset;
    private _Layout:Layout;
    private _Enemies:Enemy[];
    private _EnemyEntries: any[];
    private _AccessMatrix:number[][];
    public get Size():number { return this._Size; }
    public get Tileset():LevelTileset { return this._Tileset; }
    public get Layout():Layout { return this._Layout; }
    public set Layout(value:Layout) { this._Layout = value; }
    public get Enemies():Enemy[] { return this._Enemies; }
    public set Enemies(value:Enemy[]) { this._Enemies = value; }
    public get EnemyEntries():any[] { return this._EnemyEntries; }
    public get AccessMatrix():number[][] { return this._AccessMatrix; }
    public set AccessMatrix(value:number[][]) { this._AccessMatrix = value; } 
    public constructor(Old:Level, Size?:number, Tileset?:LevelTileset)
    {
        if(Old != null)
        {
            this._Size = Old._Size;
            this._Tileset = Old._Tileset;
            this._Enemies = [];
            for(let i = 0; i < Old._Enemies.length; i++)
            {
                this._Enemies.push(Old._Enemies[i].Copy());
            }
            this._EnemyEntries = Old._EnemyEntries;
        }
        else
        {
            this._Size = Size;
            this._Tileset = Tileset;
            this._Enemies = [];
            this._EnemyEntries = [];
        }
    }
    public Copy() : Level
    {
        return new Level(this);
    }
    public AddEnemyEntry(Name:string, Ammount:number)
    {
        this._EnemyEntries.push({Name:Name, Ammount:Ammount});
    }
    public Init(Scene:GameScene) : void
    {
        LevelGenerator.Generate(Scene, this);
    }
    public Update()
    {
        for(let i = 0; i < this._Enemies.length; i++)
        {
            this._Enemies[i].Update();
        }
    }
}
