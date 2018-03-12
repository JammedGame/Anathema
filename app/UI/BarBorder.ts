export { BarBorder };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";

class BarBorder extends Engineer.Tile
{
    public constructor(Location:any)
    {
        super();
        this.Name = "BarBorder";
        this.Fixed = true;
        this.Trans.Scale = new Engineer.Vertex(220, 220, 1);
        this.Trans.Translation = new Engineer.Vertex(Location.X, Location.Y, 0.7);
        this.Collection = new Engineer.ImageCollection(null, ["/build/resources/HealthBorder.png"]);
        this.Index = 0;
    }
}