export { MainMenu };

import TBX from "./Engineer";

import LevelManager from "./Level/Levels/LevelManager";
import { LocalSettings } from "./LocalSettings";
import { HealthBar } from "./UI/HealthBar";
import Player from "./Unit/Player";

class MainMenu extends TBX.Scene2D {
    private _Manager: LevelManager;

    public constructor() {
        super();
        this._Manager = new LevelManager();
        this.Name = "Menu";
        this.Trans.Scale = new TBX.Vertex(LocalSettings.Window.Y / LocalSettings.Scale.Y, LocalSettings.Window.Y / LocalSettings.Scale.Y, 1);
        const creationService: TBX.ObjectCreationService = TBX.Inject(TBX.ObjectCreationService);

        let Play: TBX.Tile = creationService.CreateTile('Play', ['/play.png'], new TBX.Vertex(200, 200, 0), new TBX.Vertex(300, 150, 1));
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.Attach(Play);
    }

    public PlayClick(G: any, Args: any) {
        this.StartLevel("Cathedral");
    }
    
    private StartLevel(level: string) {
        this._Manager.startLevel(level);
    }
}
