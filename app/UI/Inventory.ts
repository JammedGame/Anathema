export { Inventory };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";
import { Player } from "./../Unit/Player";
import { Window } from "./Window";
import { Item } from "../Items/Item";

class Inventory extends Window
{  
    private currentCollumn;
    private currentRow;
    private TileField:any[][];
    public static clickedItem:Item;
    private Dragging:boolean;
    private startRow:number;
    private startCol:number;
    

    public constructor(Scene:GameScene)
    {
        super(Scene);
        this.Trans.Scale = new Engineer.Math.Vertex(500,800,1);
        this.Trans.Translation = new Engineer.Math.Vertex(1600, 460, 2);
        this.currentCollumn = 0;
        this.currentRow=0;  
        this.Dragging=false;     
        this.TileField=[];
        
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
        Scene.Events.MouseMove.push(this.MouseMove.bind(this));

        for(let i = 0; i < 5; i++)
        {
            this.TileField[i]=[];
            for(let j = 0; j < 9; j++)
            {                  
                this.TileField[i][j]=this.AddElement(new Engineer.Math.Vertex(j * 50, 480 + i * 50, 2.5), new Engineer.Math.Vertex(50,50,1), 0);
                this.TileField[i][j].Events.MouseUp.push(this.MouseUp.bind(this));
                
            }
        }        
        this.Init();
        this.Hide();
    }
    public addToInv(item:Item):void
    {
        if(this.firstFit()!=null){ 
        item.Events.MouseDown.push(this.MouseDown.bind(this));        
        let Lok = new Engineer.Math.Vertex(this.firstFit().Y * 50, 480 + this.firstFit().X * 50, 2.5);
        this.AddItem(item,Lok,this.firstFit(),new Engineer.Math.Vertex(50,50,1),0);     
        }   
    }
    private MouseUp(G: any, Args: any) 
    {
        if (this.Active==true && Args.MouseButton == 0)
        {
                
            let r,c:number;            
            for(let i=0;i<5;i++){
                for(let j=0;j<9;j++){
                    
                    if(Args.Sender.ID==this.TileField[i][j].ID)
                    {
                        r=i;
                        c=j;
                        break;
                    }
                }
            }
            if(r!=null && c!=null)
            {         
                Engineer.Util.Log.Error(this.TileField[r][c].Trans.Translation.X);
                Engineer.Util.Log.Error(this.TileField[r][c].Trans.Translation.Y);  
                Engineer.Util.Log.Error(this._Item);  
                
                this._Item[r][c]=Inventory.clickedItem;
                this._Item[this.startRow][this.startCol]=null;
                
                Inventory.clickedItem.Trans.Translation = new Engineer.Math.Vertex(this.TileField[r][c].Trans.Translation.X,this.TileField[r][c].Trans.Translation.Y, 2.5);                            
                               
            }
        }
        this.Dragging=false;
    }
    private MouseDown(G: any, Args: any) 
    {
        if (this.Active==true && Args.MouseButton == 0)
        {  
            let r,c:number;            
            for(let i=0;i<5;i++){
                for(let j=0;j<9;j++){
                    if(this._Item[i][j]!=null){
                    if(Args.Sender.ID==this._Item[i][j].ID)
                    {
                        r=i;
                        c=j;
                        break;
                    }
                }
                }
            }          
            //Engineer.Util.Log.Error(Args);
            this.startRow=r;
            this.startCol=c;
            Inventory.clickedItem = Args.Sender;
            this.Dragging=true;
        }
    }
    private MouseMove(G: any, Args: any) 
    {
        //Engineer.Util.Log.Error(Args);
        if (this.Active==true && this.Dragging==true)
        {                            
            Inventory.clickedItem.Trans.Translation = new Engineer.Math.Vertex(Args.Location.X,Args.Location.Y,2.5);            
        }
    }
}
