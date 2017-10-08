export { Inventory };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import { Items } from "./../Items";
import { Window } from "./Window";

class Inventory extends Window
{
    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Trans.Scale = new Engineer.Math.Vertex(500,800,1);
        this.Trans.Translation = new Engineer.Math.Vertex(1600, 460, 2);
        this.CreateBorder();
        this.AddElement(new Engineer.Math.Vertex(200,200,2.5), new Engineer.Math.Vertex(300,460,1), 1, Engineer.Math.Color.FromRGBA(60,60,60,255));
        this.AddElement(new Engineer.Math.Vertex(220,80,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,80,2.5), new Engineer.Math.Vertex(50,50,1), 2, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(120,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(120,170,2.5), new Engineer.Math.Vertex(50,50,1), 4, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(320,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(320,170,2.5), new Engineer.Math.Vertex(50,50,1), 5, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(220,170,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,170,2.5), new Engineer.Math.Vertex(50,50,1), 3, Engineer.Math.Color.FromRGBA(30,30,30,255));
        this.AddElement(new Engineer.Math.Vertex(220,310,2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.AddElement(new Engineer.Math.Vertex(220,310,2.5), new Engineer.Math.Vertex(50,50,1), 2, Engineer.Math.Color.FromRGBA(30,30,30,255));
        for(let i = 0; i < 5; i++)
        {
            for(let j = 0; j < 9; j++)
            {
                this.AddElement(new Engineer.Math.Vertex(j * 50, 480 + i * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);
            }
        }
        this.Init();
        this.Hide();
    }
}
