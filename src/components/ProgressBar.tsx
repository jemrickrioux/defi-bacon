import PropTypes from "prop-types";



const ProgressBar = (props: any) => {
    const {goal, total, type} = props;
    const percent = total ? (total / goal) * 100 : 0;
    const formatter = Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
    })
    const text = type === "currency" ? `${formatter.format(total)} de l'objectif de ${formatter.format(goal)}` : `${total} KM / ${goal} KM`;
    return(
        <>
            <div className={"text-xl"}>{text}</div>
            <div className="h-8 relative max-w-xl rounded-lg overflow-hidden mb-10 border-2 border-black">
                <div className="w-full h-full bg-gray-100 absolute"></div>
                <div style={{ width: `${percent}%`}} className="h-full bg-green-700 absolute"></div>
            </div>

        </>)
};
ProgressBar.propTypes = {
    goal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["currency", "distance"]).isRequired
}

export default ProgressBar;
