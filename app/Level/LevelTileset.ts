export { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType, LevelTilesetCeilingCalculation }

import Engineer from "./../Engineer";

enum LevelTilesetLayoutType
{
    Bordered = 0,
    Story = 1
}
enum LevelTilesetCeilingType
{
    Uniform = 0,
    Crested = 1,
    Bordered = 2
}
enum LevelTilesetFloorType
{
    Uniform = 0,
    Checkered = 1
}
class LevelTileset
{
    private _Name:string;
    private _LayoutType:LevelTilesetLayoutType;
    private _FloorType:LevelTilesetFloorType;
    private _CeilingType:LevelTilesetCeilingType;
    private _Floor:any;
    private _FloorSet2:any;
    private _WallUpper:any;
    private _WallLower:any;
    private _Ceiling:any;
    public get LayoutType() : LevelTilesetLayoutType { return this._LayoutType; }
    public get FloorType() : LevelTilesetFloorType { return this._FloorType; }
    public get CeilingType() : LevelTilesetCeilingType { return this._CeilingType; }
    public get Floor() : any { return this._Floor; }
    public get FloorSet1() : any { return this._Floor; }
    public get FloorSet2() : any { return this._FloorSet2; }
    public get WallUpper() : any { return this._WallUpper; }
    public get WallLower() : any { return this._WallLower; }
    public get Ceiling() : any { return this._Ceiling; }
    public constructor(Name:string, LayoutType:LevelTilesetLayoutType, FloorType:LevelTilesetFloorType, CeilingType:LevelTilesetCeilingType, ArrayLengths:number[])
    {
        this._Name = Name;
        this._LayoutType = LayoutType;
        this._FloorType = FloorType;
        this._CeilingType = CeilingType;
        this.Init(ArrayLengths);
        console.log(this);
    }
    private Init(ArrayLengths:number[]) : void
    {
        let FloorImages:string[] = [];
        let FloorSet2Images:string[] = [];
        for(let i = 1; i < ArrayLengths[0] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            FloorImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/g"+s+".png");
            if(this._FloorType == LevelTilesetFloorType.Checkered)
            {
                FloorSet2Images.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/g"+s+"t02.png");
            }
        }
        this._Floor = new Engineer.Engine.TileCollection(null, FloorImages);
        if(this._FloorType == LevelTilesetFloorType.Checkered)
        {
            this._FloorSet2 = new Engineer.Engine.TileCollection(null, FloorSet2Images);
        }
        let WallUpperImages:string[] = [];
        let WallLowerImages:string[] = [];
        for(let i = 1; i < ArrayLengths[1] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            WallUpperImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wu"+s+".png");
            WallLowerImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wl"+s+".png");
        }
        this._WallUpper = new Engineer.Engine.TileCollection(null, WallUpperImages);
        this._WallLower = new Engineer.Engine.TileCollection(null, WallLowerImages);
        let CeilingLength = 2;
        if(this._CeilingType == LevelTilesetCeilingType.Crested) CeilingLength = 13;
        if(this._CeilingType == LevelTilesetCeilingType.Bordered) CeilingLength = 17;
        let CeilingImages:string[] = [];
        for(let i = 1; i < CeilingLength; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            CeilingImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/c"+s+".png");
        }
        this._Ceiling = new Engineer.Engine.TileCollection(null, CeilingImages);
    }
}
class LevelTilesetCeilingCalculation
{
    public static CalculateCrested(WM:number[]) : number
    {
        let Index = 0;
        let WM1:boolean[] = [];
        let WM4:boolean[] = [];
        for(let i = 0; i < 9; i++)
        {
            WM1.push(WM[i] == 1 || WM[i] == 2 || WM[i] == 3);
            WM4.push(WM[i] == 4 || WM[i] == 0);
        }
        if(WM1[3] && WM1[7] && WM4[1] && WM4[5]) Index = 12;
        else if(WM1[5] && WM1[7] && WM4[1] && WM4[3]) Index = 11;
        else if(WM1[5] && WM1[1] && WM4[7] && WM4[3]) Index = 10;
        else if(WM1[3] && WM1[1] && WM4[7] && WM4[5]) Index = 9;
        else if(WM1[3] && WM4[1] && WM4[7]) Index = 8;
        else if(WM1[7] && WM4[3] && WM4[5]) Index = 7;
        else if(WM1[5] && WM4[1] && WM4[7]) Index = 6;
        else if(WM1[1] && WM4[3] && WM4[5]) Index = 5;
        else if(WM1[6] && WM4[3] && WM4[7]) Index = 4;
        else if(WM1[8] && WM4[5] && WM4[7]) Index = 3;
        else if(WM1[2] && WM4[5] && WM4[1]) Index = 2;
        else if(WM1[0] && WM4[1] && WM4[3]) Index = 1;
        return Index;
    }
    public static CalculateBordered(Up:boolean, Down:boolean, Left:boolean, Right:boolean) : number
    {
        let Index = 17;
        if(Up)
        {
            if(Down)
            {
                if(Left)
                {
                    if(Right) Index = 17;
                    else Index = 14;
                }
                else
                {
                    if(Right) Index = 16;
                    else Index = 6;
                }
            }
            else
            {
                if(Left)
                {
                    if(Right) Index = 15;
                    else Index = 3;
                }
                else
                {
                    if(Right) Index = 4;
                    else Index = 12;
                }
            }
        }
        else
        {
            if(Down)
            {
                if(Left)
                {
                    if(Right) Index = 13;
                    else Index = 2;
                }
                else
                {
                    if(Right) Index = 1;
                    else Index = 10;
                }
            }
            else
            {
                if(Left)
                {
                    if(Right) Index = 5;
                    else Index = 11;
                }
                else
                {
                    if(Right) Index = 9;
                    else Index = 17;
                }
            }
        }
        return Index;
    }
}