import Match from "./match";

const TableGroup = (props) => {
    console.log('// ', props.teams)
    return (
        <>
            <div className="playoff-table-group">
                <Match teams={[props.teams[0], props.teams[1]]} />
                <Match teams={[props.teams[2], props.teams[3]]} />
            </div>
        </>
    )
}

export default TableGroup;