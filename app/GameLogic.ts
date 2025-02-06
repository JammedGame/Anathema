export { GameLogic };

import Engineer from "./Engineer";

import { MainMenu } from "./MainMenu";

class GameLogic {
    private _Game: any;
    private _Runner: any;
    
    public constructor() {
        this._Game = new Engineer.Game();
        this._Game.Name = "Clayman";
        this._Runner = new Engineer.Runner(this._Game, Engineer.DrawEngineType.ThreeJS);
        this._Game.Attach(new MainMenu(this._Runner, this._Game));
    }

    public Run(): void {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}
