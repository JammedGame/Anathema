export { GameLogic };

import * as TBX from "toybox-engine";

import { MainMenu } from "./MainMenu";

class GameLogic {
    private _Game: TBX.Game;
    private _Runner: TBX.RunnerService;
    
    public constructor() {
        this._Game = new TBX.Game();
        this._Game.Name = "Clayman";
        
        this._Runner = TBX.Inject(TBX.RunnerService);
        this._Runner.Init(this._Game);

        this._Game.Attach(new MainMenu());
    }

    public Run(): void {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}
