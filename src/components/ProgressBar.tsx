import PropTypes from "prop-types";



const ProgressBar = (props: any) => {
    const {goal, total, type} = props;
    const percent = total ? (total / goal) * 100 : 0;
    const formatter = Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
    })
    const objectif = type === "currency" ? `${formatter.format(goal)}` : `${goal} KM`;
    const current = type === "currency" ? `${formatter.format(total)}` : `${total} KM`;
    console.log(percent)
    return(
        <>
            <div className="h-10 md:h-12 relative max-w-4xl rounded-full overflow-hidden mb-20">
                <div className="w-full h-full bg-primary absolute">
                    <div className={"flex md:text-3xl text-xl text-white flex-row justify-end items-center pr-10 w-full h-full"}>{objectif}</div>
                </div>
                <div style={ percent > 40 ? { width: `${percent}%`} : {width: "40%" }} className="h-full min-w-sm bg-white shadow-xl absolute rounded-full">
                    <div className={"flex md:text-3xl text-xl flex-row justify-end items-center pr-10 w-full h-full text-dark"}>{current}</div>
                </div>
            </div>

        </>)
};
ProgressBar.propTypes = {
    goal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["currency", "distance"]).isRequired
}

export default ProgressBar;
