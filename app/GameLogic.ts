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
        this._Game = new Engineer.Engine.Game();
        this._Game.Name = "Anathema";
        this._Runner = new Engineer.Runner.Runner(this._Game, Engineer.Draw.DrawEngineType.ThreeJS);
        let _Menu:any = new MainMenu();
        _Menu.Data["Game"] = this._Game;
        _Menu.Data["Runner"] = this._Runner;
        this._Game.AddScene(_Menu);
        let _GameScene:any = new GameScene();
        _GameScene.Data["GameScene"] = this._Game;
        _GameScene.Data["Runner"] = this._Runner;
        this._Game.AddScene(_GameScene);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
        Engineer.Util.Log.Print("test");
    }
}