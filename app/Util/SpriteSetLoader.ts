export { SpriteSetLoader };

import Engineer from "./../Engineer";

const SpriteSetResourcePath = "/build/resources/spritesets/";

class SpriteSetLoader
{
    public static LoadSets(Sprite:any, KeyWord:string, SetsLength?:number[], SubDir?:string)
    {
        Sprite.SpriteSets = [];
        if(!SubDir) SubDir = "";
        if(SetsLength) SpriteSetLoader.LoadCollections(Sprite, KeyWord, SetsLength, SubDir);
        else SpriteSetLoader.LoadCollections(Sprite, KeyWord, [1,9,6,8,13,7], SubDir);
    }
    private static LoadCollections(Sprite:any, KeyWord:string, SetsLength:number[], SubDir:string)
    {
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "Walk/" + SubDir + KeyWord + "/", "Idle", SetsLength[0]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "Walk/" + SubDir + KeyWord  + "/", "Walk", SetsLength[1]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackSlash/" + SubDir + KeyWord + "/", "Slash", SetsLength[2]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackThurst/" + SubDir + KeyWord + "/", "Thurst", SetsLength[3]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "AttackBow/" + SubDir + KeyWord + "/", "Bow", SetsLength[4]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + "SpellCast/" + SubDir + KeyWord + "/", "Cast", SetsLength[5]);
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
        for (let i = 0; i < Length; i++) Set.Sprites.push(Path + Direction + i + ".png");
        return Set;
    }
}
