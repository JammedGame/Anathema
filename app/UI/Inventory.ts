export { Inventory };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Player";
import { Window } from "./Window";
import { Item } from "../Items/Item";

class Inventory extends Window
{  
    private currentCollumn;
    private currentRow;

    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Trans.Scale = new Engineer.Math.Vertex(500,800,1);
        this.Trans.Translation = new Engineer.Math.Vertex(1600, 460, 2);
        this.currentCollumn = 0;
        this.currentRow=0;        
        
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
    public addToInv(item:Item):void
    {
        if(this.currentCollumn<8 && this.currentRow<5)
        {            
            this.AddItem(item, new Engineer.Math.Vertex(this.currentCollumn * 50, 480 + this.currentRow * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);    
            this.currentCollumn++;
        }
        else if(this.currentCollumn==8 && this.currentRow!=5){        
        this.AddItem(item, new Engineer.Math.Vertex(this.currentCollumn * 50, 480 + this.currentRow * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);
        this.currentCollumn=0; 
        this.currentRow++;
        }        
        else if(this.currentCollumn==8 && this.currentRow==5) {
            //no space
        }
    }    
}
