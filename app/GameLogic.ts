export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new Engineer.Game();
        this._Game.Name = "Anathema";
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.ThreeJS);
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        this._Game.Attach(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}