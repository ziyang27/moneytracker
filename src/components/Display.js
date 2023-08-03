const Display = ({ transaction }) => {
    return ( 
        <div className="transactions">
            <div className="transaction">
                <div className="left">
                    <div className="name">{ transaction.name }</div>
                    <div className="description">{ transaction.description }</div>
                </div>
                <div className="right">
                    <div className={"price " + (transaction.price < 0 ? "red" : "green")}>
                        { transaction.price }
                    </div>
                    <div className="datetime">2022-12-18 15:45</div>
                </div>
            </div>
        </div>
    );
}
 
export default Display;