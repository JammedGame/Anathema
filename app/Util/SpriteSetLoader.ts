export { SpriteSetLoader, SpriteSetResourcePath };

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
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/Walk/", "Idle", SetsLength[0]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/Walk/", "Walk", SetsLength[1]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/AttackSlash/", "Slash", SetsLength[2]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/AttackThurst/", "Thurst", SetsLength[3]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/AttackBow/", "Bow", SetsLength[4]);
        SpriteSetLoader.LoadSetCollection(Sprite, SpriteSetResourcePath + SubDir + KeyWord + "/SpellCast/", "Cast", SetsLength[5]);
    }
    public static LoadSetCollection(Sprite:any, Path:string, Name:string, Length:number)
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
    public static LoadSet(Path:string, KeyWord:string, Length:number, Seed?:number) : any
    {
        let Set = new Engineer.Engine.SpriteSet(null, KeyWord);
        if(Seed) Set.Seed = Seed;
        else Set.Seed = 5;
        Set.Sprites = [];
        for (let i = 0; i < Length; i++) Set.Sprites.push(Path + KeyWord + "/Animation" + i + ".png");
        return Set;
    }
}
