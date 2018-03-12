export { InventoryCollection };

import Engineer from "./../../Engineer";

class InventoryCollection extends Engineer.ImageCollection
{
    public constructor()
    {
        super(null, []);
        for(let i = 1; i <= 48; i++)
        {
            let s:string = i.toString();
            if(i < 10) s = "00" + s;
            else if (i < 100) s = "0" + s;
            this.Images.push("/build/resources/items/inventory/i"+s+".png");
        }
        InventoryCollection.Single = this;
    }
    public static Single:InventoryCollection;
}