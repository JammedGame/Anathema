export { ActionArtCollection };

import Engineer from "./../../Engineer";

class ActionArtCollection extends Engineer.ImageCollection
{
    public constructor()
    {
        super(null, []);
        for(let i = 0; i < 33; i++)
        {
            let s:string = i.toString();
            if(i < 10) s = "00" + s;
            else if (i < 100) s = "0" + s;
            this.Images.push("/build/resources/skills/Skill"+s+".png");
        }
        ActionArtCollection.Single = this;
    }
    public static Single:ActionArtCollection;
}