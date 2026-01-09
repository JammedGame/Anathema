import Enemy from "./Enemy";
import { GameScene } from "../../GameScene";
import { SpriteSetLoader } from "../../Util/SpriteSetLoader";

class Skeleton extends Enemy {
    private static _Sets: any[];

    public constructor(Old: Skeleton, Scene?: GameScene) {
        super(Old, Scene);
        this.Name = "Skeleton";
        if (Old != null) { }
        else {
            this._Stats.Health = 30;
            this._Stats.MaxHealth = 30;
            this._Stats.PhysicalDamage = 4;
            this._Stats.Armor = 20;
            this._Stats.Store();
            this.attackIndex = 1;
            this.SpriteSets = this.LoadSets();
        }
    }
    
    protected LoadSets(): any[] {
        if (!Skeleton._Sets) {
            SpriteSetLoader.LoadSets(this, "Skeleton");
            Skeleton._Sets = this.SpriteSets;
        }
        return Skeleton._Sets;
    }
}

export default Skeleton;
