export {Skeleton};

import Engineer from "./../Engineer";
import { GameScene } from "./../GameScene";

class Skeleton extends Engineer.Engine.Sprite
{
    private _Scene:GameScene;

    public constructor(Scene:GameScene)
    {
        super();
        this.Name = "Skeleton";
        this._Scene=Scene;
        this.Trans.Scale = new Engineer.Math.Vertex(100, 150, 0);
        this.Trans.Translation = new Engineer.Math.Vertex(400,400,0);
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null,"S_WalkN"), new Engineer.Engine.SpriteSet(null,"S_WalkE"), new Engineer.Engine.SpriteSet(null,"S_WalkS"), new Engineer.Engine.SpriteSet(null,"S_WalkW")];
        Engineer.Util.Log.Print(this.SpriteSets);
        this.SpriteSets[0].Sprites = ["/build/resources/skeleton/E_up00.png","/build/resources/skeleton/E_up01.png","/build/resources/skeleton/E_up02.png","/build/resources/skeleton/E_up03.png","/build/resources/skeleton/E_up04.png","/build/resources/skeleton/E_up05.png","/build/resources/skeleton/E_up06.png","/build/resources/skeleton/E_up07.png","/build/resources/skeleton/E_up08.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/skeleton/E_rgt00.png","/build/resources/skeleton/E_rgt01.png","/build/resources/skeleton/E_rgt02.png","/build/resources/skeleton/E_rgt03.png","/build/resources/skeleton/E_rgt04.png","/build/resources/skeleton/E_rgt05.png","/build/resources/skeleton/E_rgt06.png","/build/resources/skeleton/E_rgt07.png","/build/resources/skeleton/E_rgt08.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/skeleton/E_dwn00.png","/build/resources/skeleton/E_dwn01.png","/build/resources/skeleton/E_dwn02.png","/build/resources/skeleton/E_dwn03.png","/build/resources/skeleton/E_dwn04.png","/build/resources/skeleton/E_dwn05.png","/build/resources/skeleton/E_dwn06.png","/build/resources/skeleton/E_dwn07.png","/build/resources/skeleton/E_dwn08.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/skeleton/E_lft00.png","/build/resources/skeleton/E_lft01.png","/build/resources/skeleton/E_lft02.png","/build/resources/skeleton/E_lft03.png","/build/resources/skeleton/E_lft04.png","/build/resources/skeleton/E_lft05.png","/build/resources/skeleton/E_lft06.png","/build/resources/skeleton/E_lft07.png","/build/resources/skeleton/E_lft08.png"];
        this.SpriteSets[0].Seed = 25;
        this.SpriteSets[1].Seed = 25;
        this.SpriteSets[2].Seed = 25;
        this.SpriteSets[3].Seed = 25;
        this.Data["Skeleton"] = true;
        this.Data["Collision"] = Engineer.Math.CollisionType.Rectangular2D;
        this._Scene.Events.TimeTick.push(this.movement.bind(this));
        this._Scene.AddSceneObject(this);
    }
    public movement():void
    {
        let s_direction:number;
        s_direction=Math.round(3*Math.random());
        switch(s_direction)
        {
        case 0: this.Trans.Translation=new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y-5,0);
        case 1: this.Trans.Translation=new Engineer.Math.Vertex(this.Trans.Translation.X+5, this.Trans.Translation.Y,0);
        case 2: this.Trans.Translation=new Engineer.Math.Vertex(this.Trans.Translation.X, this.Trans.Translation.Y+5,0);
        case 3: this.Trans.Translation=new Engineer.Math.Vertex(this.Trans.Translation.X-5, this.Trans.Translation.Y,0);
    }
    }
}
