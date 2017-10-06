export { Level, LevelTileset };

import Engineer from "./../Engineer";

import { GameScene } from "./../GameScene";

class Level
{
    private _TileScale:number;
    private _Tiles:any[];
    private _Tileset:any;
    public constructor()
    {
        this._TileScale = 100;
        this._Tiles = [];
        this._Tileset = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
    public Init(Scene:GameScene) : void
    {
        for(let i = 1; i < 6; i++) this.GenerateTile(Scene, new Engineer.Math.Vertex(i,1,0), 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
        for(let i = 1; i < 6; i++) this.GenerateTile(Scene, new Engineer.Math.Vertex(i,2,0), 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
        for(let i = 1; i < 6; i++) this.GenerateTile(Scene, new Engineer.Math.Vertex(i,3,0), 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
        for(let i = 1; i < 6; i++) this.GenerateTile(Scene, new Engineer.Math.Vertex(i,4,0), 0, Engineer.Math.Color.FromRGBA(255,255,255,255));
        for(let i = 1; i < 6; i++) this.GenerateTile(Scene, new Engineer.Math.Vertex(i,5,0), 0, Engineer.Math.Color.FromRGBA(255,0,0,255));
    }
    private GenerateTile(Scene:GameScene, Location:any, Index:number, Color:any) : any
    {
        let NewTile:any = new Engineer.Engine.Tile();
        NewTile.Name = "NewTile";
        NewTile.Collection = this._Tileset;
        NewTile.Index = Index;
        NewTile.Paint = Color;
        NewTile.Trans.Scale = new Engineer.Math.Vertex(this._TileScale, this._TileScale, 1);
        NewTile.Trans.Translation = new Engineer.Math.Vertex(this._TileScale * Location.X, this._TileScale * Location.Y, 0);
        Scene.AddSceneObject(NewTile);
    }
}
class LevelTileset
{
    private _Ground:any;
    private _Floor:any;
    private _Ceiling:any;
    public constructor()
    {
        this._Ground = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        this._Floor = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        this._Ceiling = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
    }
}