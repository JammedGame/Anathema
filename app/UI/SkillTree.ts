export { SkillTree };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import { Items } from "./../Items";
import { Window } from "./Window";

class SkillTree extends Window
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Trans.Scale = new Engineer.Math.Vertex(500,800,1);
        this.Trans.Translation = new Engineer.Math.Vertex(320, 460, 2);
        this.CreateBorder();
        this.AddElement(new Engineer.Math.Vertex(70,350,2.3), new Engineer.Math.Vertex(10,650,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,0));
        this.AddElement(new Engineer.Math.Vertex(200,350,2.3), new Engineer.Math.Vertex(10,400,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,0));
        this.AddElement(new Engineer.Math.Vertex(330,350,2.3), new Engineer.Math.Vertex(10,650,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,0));
        this.AddElement(new Engineer.Math.Vertex(135,110,2.3), new Engineer.Math.Vertex(10,200,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,-45));
        this.AddElement(new Engineer.Math.Vertex(135,590,2.3), new Engineer.Math.Vertex(10,200,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,45));
        this.AddElement(new Engineer.Math.Vertex(265,230,2.3), new Engineer.Math.Vertex(10,200,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,45));
        this.AddElement(new Engineer.Math.Vertex(265,470,2.3), new Engineer.Math.Vertex(10,200,1), -1, Engineer.Math.Color.FromRGBA(60,60,60,255), new Engineer.Math.Vertex(0,0,-45));
        this.AddElement(new Engineer.Math.Vertex(70,50,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(70,170,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(70,290,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(70,410,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(70,650,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(200,170,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(200,290,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(200,410,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(200,530,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(330,50,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(330,170,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(330,290,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(330,530,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        this.AddElement(new Engineer.Math.Vertex(330,650,2.5), new Engineer.Math.Vertex(80,80,1), 0);
        
        this.Init();
        this.Hide();
    }
}
