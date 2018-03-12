export { MainMenu };

import Engineer from "./Engineer";

import { LevelManager } from "./LevelManager";
import { LocalSettings } from "./LocalSettings";

class MainMenu extends Engineer.Scene2D
{
    private _Manager:LevelManager;
    public constructor(Runner:any, Game:any)
    {
        super();
        this._Manager = new LevelManager(Runner, Game);
        this.Name = "Menu";
        this.Trans.Scale = new Engineer.Vertex(LocalSettings.Window.Y / LocalSettings.Scale.Y, LocalSettings.Window.Y / LocalSettings.Scale.Y, 1);
        let Buttons:any = new Engineer.ImageCollection(null, ["/build/resources/play.png"]);
        let Play:any = new Engineer.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new Engineer.Vertex(300, 150, 1);
        Play.Trans.Translation = new Engineer.Vertex(200, 200, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
    }
    public PlayClick(G:any, Args:any)
    {
        this.StartLevel("Cathedral");
    }
    private StartLevel(Level:string)
    {
        this._Manager.StartLevel(Level);
    }
}