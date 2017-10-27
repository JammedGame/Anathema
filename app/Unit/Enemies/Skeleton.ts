export { Skeleton };

import Engineer from "./../../Engineer";

import { GameScene } from "./../../GameScene";
import { Unit } from "./../Unit";
import { Player } from "./../Player";
import { Stats } from "./../Stats";
import { Action } from "./../Actions/Action";
import { Move } from "./../Actions/Move";
import { Enemy } from "./Enemy";

class Skeleton extends Enemy
{
    public constructor(Scene: GameScene, X:number, Y:number)
    {
        super(Scene, X, Y);
        this._Stats.BaseDamage = 1;
        this._Stats.Health = 30;
        this._Stats.MaxHealth = 30;
        this._Stats.Store();
        this.LoadSprites();
    }
    private LoadSprites()
    {
        this.SpriteSets = [new Engineer.Engine.SpriteSet(null, "S_IdleN"), new Engineer.Engine.SpriteSet(null, "S_IdleE"), new Engineer.Engine.SpriteSet(null, "S_IdleS"), new Engineer.Engine.SpriteSet(null, "S_IdleW"), new Engineer.Engine.SpriteSet(null, "S_WalkN"), new Engineer.Engine.SpriteSet(null, "S_WalkE"), new Engineer.Engine.SpriteSet(null, "S_WalkS"), new Engineer.Engine.SpriteSet(null, "S_WalkW"), new Engineer.Engine.SpriteSet(null, "S_AttN"), new Engineer.Engine.SpriteSet(null, "S_AttE"), new Engineer.Engine.SpriteSet(null, "S_AttS"), new Engineer.Engine.SpriteSet(null, "S_AttW")];
        this.SpriteSets[0].Sprites = ["/build/resources/skeleton/E_up00.png"];
        this.SpriteSets[1].Sprites = ["/build/resources/skeleton/E_rgt00.png"];
        this.SpriteSets[2].Sprites = ["/build/resources/skeleton/E_dwn00.png"];
        this.SpriteSets[3].Sprites = ["/build/resources/skeleton/E_lft00.png"];
        this.SpriteSets[4].Sprites = ["/build/resources/skeleton/E_up00.png", "/build/resources/skeleton/E_up01.png", "/build/resources/skeleton/E_up02.png", "/build/resources/skeleton/E_up03.png", "/build/resources/skeleton/E_up04.png", "/build/resources/skeleton/E_up05.png", "/build/resources/skeleton/E_up06.png", "/build/resources/skeleton/E_up07.png", "/build/resources/skeleton/E_up08.png"];
        this.SpriteSets[5].Sprites = ["/build/resources/skeleton/E_rgt00.png", "/build/resources/skeleton/E_rgt01.png", "/build/resources/skeleton/E_rgt02.png", "/build/resources/skeleton/E_rgt03.png", "/build/resources/skeleton/E_rgt04.png", "/build/resources/skeleton/E_rgt05.png", "/build/resources/skeleton/E_rgt06.png", "/build/resources/skeleton/E_rgt07.png", "/build/resources/skeleton/E_rgt08.png"];
        this.SpriteSets[6].Sprites = ["/build/resources/skeleton/E_dwn00.png", "/build/resources/skeleton/E_dwn01.png", "/build/resources/skeleton/E_dwn02.png", "/build/resources/skeleton/E_dwn03.png", "/build/resources/skeleton/E_dwn04.png", "/build/resources/skeleton/E_dwn05.png", "/build/resources/skeleton/E_dwn06.png", "/build/resources/skeleton/E_dwn07.png", "/build/resources/skeleton/E_dwn08.png"];
        this.SpriteSets[7].Sprites = ["/build/resources/skeleton/E_lft00.png", "/build/resources/skeleton/E_lft01.png", "/build/resources/skeleton/E_lft02.png", "/build/resources/skeleton/E_lft03.png", "/build/resources/skeleton/E_lft04.png", "/build/resources/skeleton/E_lft05.png", "/build/resources/skeleton/E_lft06.png", "/build/resources/skeleton/E_lft07.png", "/build/resources/skeleton/E_lft08.png"];
        this.SpriteSets[8].Sprites = ["/build/resources/skeleton/S_slash_up00.png", "/build/resources/skeleton/S_slash_up01.png", "/build/resources/skeleton/S_slash_up02.png", "/build/resources/skeleton/S_slash_up03.png", "/build/resources/skeleton/S_slash_up04.png", "/build/resources/skeleton/S_slash_up05.png"];
        this.SpriteSets[9].Sprites = ["/build/resources/skeleton/S_slash_rgt00.png", "/build/resources/skeleton/S_slash_rgt01.png", "/build/resources/skeleton/S_slash_rgt02.png", "/build/resources/skeleton/S_slash_rgt03.png", "/build/resources/skeleton/S_slash_rgt04.png", "/build/resources/skeleton/S_slash_rgt05.png"];
        this.SpriteSets[10].Sprites = ["/build/resources/skeleton/S_slash_btm00.png", "/build/resources/skeleton/S_slash_btm01.png", "/build/resources/skeleton/S_slash_btm02.png", "/build/resources/skeleton/S_slash_btm03.png", "/build/resources/skeleton/S_slash_btm04.png", "/build/resources/skeleton/S_slash_btm05.png"];
        this.SpriteSets[11].Sprites = ["/build/resources/skeleton/S_slash_lft00.png", "/build/resources/skeleton/S_slash_lft01.png", "/build/resources/skeleton/S_slash_lft02.png", "/build/resources/skeleton/S_slash_lft03.png", "/build/resources/skeleton/S_slash_lft04.png", "/build/resources/skeleton/S_slash_lft05.png"];
        this.SpriteSets[0].Seed = 5;
        this.SpriteSets[1].Seed = 5;
        this.SpriteSets[2].Seed = 5;
        this.SpriteSets[3].Seed = 5;
        this.SpriteSets[4].Seed = 5;
        this.SpriteSets[5].Seed = 5;
        this.SpriteSets[6].Seed = 5;
        this.SpriteSets[7].Seed = 5;
        this.SpriteSets[8].Seed = 5;
        this.SpriteSets[9].Seed = 5;
        this.SpriteSets[10].Seed = 5;
        this.SpriteSets[11].Seed = 5;
    }
}
