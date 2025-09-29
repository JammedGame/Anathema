import Projectile from "./Projectile";
import { GameScene } from "./../../GameScene";


class Arrow extends Projectile {
    public constructor(Old: Arrow, ColliderTypes: string[], Scene?: GameScene) {
        super(Old, ColliderTypes, Scene);
        if (Old != null) { }
        else {
            this.loadSets("Arrow", 1);
        }
    }
}

export default Arrow;
