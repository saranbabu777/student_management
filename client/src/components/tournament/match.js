const Match = (props) => {
    return (
        <>
            <div className="playoff-table-pair playoff-table-pair-style">
                <div className="playoff-table-left-player">{props.teams[0]}</div>
                <div className="playoff-table-right-player">{props.teams[1]}</div>
            </div>
        </>
    )
}

export default Match;