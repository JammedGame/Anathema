export { Window };

import Engineer from "./Engineer";
import { GameScene } from "./GameScene";
import { Player } from "./Player";
import { Items } from "./Items";

class Window extends Engineer.Engine.Tile
{
    private _Scene:GameScene;
    //private _ListOfElements:any[];
    //private _ListOfDecoration:any[];
    public constructor(Scene:GameScene)
    {
        super();
        this._Scene=Scene;
        let Decorations:any=[new Engineer.Engine.TileCollection(null, ["/build/resources/border_c.png","/build/resources/border_h.png","/build/resources/border_v.png"])];
        let Decoration:any=new Engineer.Engine.Tile();
        Decoration.Name = "Decoration";
        Decoration.Collection=Decorations;
        this._Scene.AddSceneObject(Decoration);

        let Elements:any=[new Engineer.Engine.TileCollection(null, ["/build/resources/inv_grid.png","/build/resources/inv_grid_c.png","/build/resources/inv_grid_h.png","/build/resources/inv_grid_v.png","/build/resources/inv_grid_blank.png","/build/resources/inv_vorlok.png"])];
        let Elem:any=new Engineer.Engine.Tile();
        Elem.Name="Element";
        Elem.Collection=Elements;
        this._Scene.AddSceneObject(Elem);
    }
}
