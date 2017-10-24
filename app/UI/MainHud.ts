export { MainHud };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Window } from "./Window";

class MainHud extends Window
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Trans.Scale = new Engineer.Math.Vertex(435,120,1);
        this.Trans.Translation = new Engineer.Math.Vertex(960, 1035, 2);
        this._ElementT = new Engineer.Engine.TileCollection(null, ["/build/resources/skills/Move.png","/build/resources/skills/Attack.png","/build/resources/skills/None.png","/build/resources/skills/Slash.png","/build/resources/elements/char.png","/build/resources/elements/inventory.png","/build/resources/elements/quests.png","/build/resources/elements/settings.png",]);
        this.AddElement(new Engineer.Math.Vertex(10,10,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(85,-5,2.5), new Engineer.Math.Vertex(50,50,1), 3);
        this.AddElement(new Engineer.Math.Vertex(85,38,2.5), new Engineer.Math.Vertex(50,30,1), 4, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.AddElement(new Engineer.Math.Vertex(140,-5,2.5), new Engineer.Math.Vertex(50,50,1), 2);
        this.AddElement(new Engineer.Math.Vertex(140,38,2.5), new Engineer.Math.Vertex(50,30,1), 5, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.AddElement(new Engineer.Math.Vertex(195,-5,2.5), new Engineer.Math.Vertex(50,50,1), 2);
        this.AddElement(new Engineer.Math.Vertex(195,38,2.5), new Engineer.Math.Vertex(50,30,1), 6, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.AddElement(new Engineer.Math.Vertex(250,-5,2.5), new Engineer.Math.Vertex(50,50,1), 2);
        this.AddElement(new Engineer.Math.Vertex(250,38,2.5), new Engineer.Math.Vertex(50,30,1), 7, Engineer.Math.Color.FromRGBA(180,180,180,255));
        this.AddElement(new Engineer.Math.Vertex(325,10,2.5), new Engineer.Math.Vertex(80,80,1), 1);
        this.CreateBorder();
        this.Init();
    }
}