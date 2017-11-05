export { EnemyCollection };

import Engineer from "./../../Engineer";

import { Enemy } from "./Enemy";
import { Skeleton } from "./Skeleton";
import { Orc } from "./Orc";

class EnemyCollection
{
    public Items: { [key: string]:Enemy; };
    public constructor()
    {
        this.Items = {};
        this.Items["Skeleton"] = new Skeleton(null);
        this.Items["Orc"] = new Orc(null);
        EnemyCollection.Single = this;
    }
    public static Single:EnemyCollection;
}