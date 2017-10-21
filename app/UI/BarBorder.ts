export { BarBorder };

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";

class BarBorder extends Engineer.Engine.Tile
{
    public constructor(Location:any)
    {
        super();
        this.Name = "BarBorder";
        this.Fixed = true;
        this.Trans.Scale = new Engineer.Math.Vertex(220, 220, 1);
        this.Trans.Translation = new Engineer.Math.Vertex(Location.X, Location.Y, 0.7);
        this.Collection = new Engineer.Engine.TileCollection(null, ["/build/resources/HealthBorder.png"]);
        this.Index = 0;
    }
}