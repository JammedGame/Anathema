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
    }
}