import { useState } from "react";
import Match from "./tournament/match";
import TableGroup from "./tournament/table-group";

const Tournament = () => {
    const [teams, setTeams] = useState([
        'Kummanam FC',
        'Manchester FC',
        'Blue Wagenz',
        'Spartans Ettumanoor',
        'Nemezizz Pala',
        'MG University',
        'Gallexy FC',
        'KISA FC',
        'FC Forca Arpookara',
        'Demons',
        'Smashers Kurichi',
        'Uni City FC',
        'FC Falcons',
        'Eskimos'
    ]);

    return (
        <div className="tournament">
            <div className="playoff-table">
                <div className="playoff-table-content">
                    <div className="playoff-table-tour">
                        <strong>Round 1</strong>
                        <br />
                        <TableGroup teams={teams.slice(0, 4)} />
                        <TableGroup teams={teams.slice(4, 8)} />
                        <TableGroup teams={teams.slice(8, 12)} />
                        <TableGroup teams={teams.slice(12, 16)} />
                    </div>
                    <div className="playoff-table-tour">
                        <strong>Round 2</strong>
                        <br />
                        <TableGroup teams={['Kummanam FC', 'Blue Wagenz', 'MG University', 'Gallexy FC']} />
                        <TableGroup teams={['Demons', 'Smashers Kurichi', 'FC Falcons']} />
                    </div>
                    <div className="playoff-table-tour">
                        <strong>Quarter Final</strong>
                        <br />
                        <TableGroup teams={['Blue Wagenz', 'Gallexy FC', 'Demons', 'FC Falcons']} />
                    </div>
                    <div className="playoff-table-tour">
                        <strong>Semi Final</strong>
                        <br />
                        <div className="playoff-table-group">
                            <Match teams={['Blue Wagenz', 'Demons']} />
                        </div>
                    </div>
                    <div className="playoff-table-tour">
                        <strong>POOL A WINNER</strong>
                        <br />
                        <div className="playoff-table-group">
                            <Match teams={['Demons']} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tournament;
