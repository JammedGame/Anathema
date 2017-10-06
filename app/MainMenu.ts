export { MainMenu };

import Engineer from "./Engineer";

import { LocalSettings } from "./LocalSettings";

class MainMenu extends Engineer.Engine.Scene2D
{
    public constructor()
    {
        super();
        this.Name = "Menu";
        this.Trans.Scale = new Engineer.Math.Vertex(LocalSettings.Window.Y / LocalSettings.Scale.Y, LocalSettings.Window.Y / LocalSettings.Scale.Y, 1);
        let Buttons:any = new Engineer.Engine.TileCollection(null, ["/build/resources/play.png"]);
        let Play:any = new Engineer.Engine.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new Engineer.Math.Vertex(300, 150, 1);
        Play.Trans.Translation = new Engineer.Math.Vertex(200, 200, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
    }
    public PlayClick(G:any, Args:any)
    {
        let Runner:any = this.Data["Runner"];
        Runner.SwitchScene("GameScene", false);
    }
}