export { LevelCollection };

import Engineer from "./../Engineer";

import { Level } from "./Level";
import { LevelTileset } from "./Tilesets/LevelTileset";

class LevelCollection
{
    public Items: { [key: string]:any; };
    public constructor()
    {
        this.Items = {};
        
    }
    public static Single:LevelCollection;
}