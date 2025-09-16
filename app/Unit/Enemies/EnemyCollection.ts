export { EnemyCollection };

import Engineer from "./../../Engineer";

import { Enemy } from "./Enemy";
import { Skeleton } from "./Skeleton";
import { Orc } from "./Orc";

class EnemyCollection {
    public Items: { [key: string]: Enemy; };

    public constructor() {
        this.Items = {};
        this.Items["skeleton"] = new Skeleton(null);
        this.Items["orc"] = new Orc(null);
        EnemyCollection.Single = this;
    }
    
    public static Single: EnemyCollection;
}
