export { SpriteSetLoader };

import Engineer from "./../Engineer";

const SpriteSetResourcePath = "/build/resources/spritesets/";

class SpriteSetLoader
{
    public static LoadSets(Sprite:any, KeyWord:string, SubDir?:string)
    {
        Sprite.SpriteSets = [];
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "Walk/" + KeyWord, "Idle", 1);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "Walk/" + KeyWord, "Walk", 9);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackSlash/" + KeyWord, "Slash", 6);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackThurst/" + KeyWord, "Thurst", 8);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackBow/" + KeyWord, "Bow", 13);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "SpellCast/" + KeyWord, "Cast", 7);
    }
    private static LoadSetCollection(Sprite:any, Path:string, Name:string, Length:number)
    {
        Sprite.SpriteSets.push(SpriteSetLoader.LoadSingleSet(Path, Name, "Up", Length));
        Sprite.SpriteSets.push(SpriteSetLoader.LoadSingleSet(Path, Name, "Right", Length));
        Sprite.SpriteSets.push(SpriteSetLoader.LoadSingleSet(Path, Name, "Down", Length));
        Sprite.SpriteSets.push(SpriteSetLoader.LoadSingleSet(Path, Name, "Left", Length));
    }
    private static LoadSingleSet(Path:string, Name:string, Direction:string, Length:number) : any
    {
        let Set = new Engineer.Engine.SpriteSet(null, Name + "_" + Direction);
        Set.Seed = 5;
        Set.Sprites = [];
        for (let i = 0; i < Length; i++) Set.Sprites.push(Path + "/" + Direction + i + ".png");
        return Set;
    }
}
