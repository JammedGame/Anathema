export { LevelTilesetCeilingCalculation }

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