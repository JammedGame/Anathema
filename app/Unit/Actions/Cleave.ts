export { Cleave };

import Engineer from "./../../Engineer";

import { Action } from "./Action";
import { Attack } from "./Attack";
import { GameScene } from "./../../GameScene";
import { ItemWorld } from "./../Items/ItemWorld";
import { ItemCollection } from "./../Items/ItemCollection";
import { Stats } from "./../Stats";

class Cleave extends Attack
{
    private _Victims:any[];
    public constructor(Old?:Cleave, ID?:string, Owner?:any)
    {
        super(Old, ID, Owner);
        this._Art = 3;
    }
    protected Prepare()
    {
        let Collider = this._Owner.Collider;
        if(!Collider) return false;
        let Enemies = this._Scene.GetObjectsWithData(this.Prefs["TargetType"], true);
        this._Victims = [];
        let TargetVertex = new Engineer.Math.Vertex(this._Target.X - Collider.Trans.Translation.X, this._Target.Y - Collider.Trans.Translation.Y, 0);
        for(let i = 0; i < Enemies.length; i++)
        {
            if(Engineer.Math.Vertex.Distance(Enemies[i].Collider.Trans.Translation, Collider.Trans.Translation) < this._Owner.Stats.Radius * 1.25)
            {
                let EnemyVertex = new Engineer.Math.Vertex(Enemies[i].Collider.Trans.Translation.X - Collider.Trans.Translation.X, Enemies[i].Collider.Trans.Translation.Y - Collider.Trans.Translation.Y, 0);
                let Angle = Math.atan2(TargetVertex.Y, TargetVertex.X) - Math.atan2(EnemyVertex.Y, EnemyVertex.X);
                Angle = (Angle / Math.PI) * 180;
                if(Angle > 180) Angle = 360 - Angle;
                Angle = Math.abs(Angle);
                if(Angle < 90)
                {
                    this._Victims.push(Enemies[i]);
                }
            }    
        }
        return true;
    }
    protected DamageApply()
    {
        for(let i = 0; i < this._Victims.length; i++)
        {
            this._Victims[i].Stats.Health -= this.DamageTaken(this._Owner, this._Victims[i], 0.7);
            this._Victims[i].Invoke("Damaged");
            if(this._Victims[i].Stats.Health < 0)
            {
                this._Victims[i].Destroy();
                if(this._Victims[i].Data["Enemy"])
                {
                    let Item = ItemCollection.Single.DropRandom();
                    let WorldItem = new ItemWorld(this._Scene.Data["Player"], this._Scene, Item, this._Victims[i].Trans.Translation.X, this._Victims[i].Trans.Translation.Y);
                }
            }
        }
    }
}
