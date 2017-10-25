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
    public get Size():number { return this._Size; }
    public get Tileset():LevelTileset { return this._Tileset; }
    public get Layout():Layout { return this._Layout; }
    public set Layout(value:Layout) { this._Layout = value; }
    public get Enemies():Enemy[] { return this._Enemies; }
    public constructor(Size:number, Tileset:LevelTileset, Enemies:Enemy[])
    {
        this._Size = Size;
        this._Tileset = Tileset;
        this._Enemies = Enemies;
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
