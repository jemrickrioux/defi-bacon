import PropTypes from "prop-types";



const ProgressBar = (props: any) => {
    const {goal, total, type} = props;
    const percent = total ? (total / goal) * 100 : 0;
    const formatter = Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
        minimumFractionDigits: 0
    })
    const objectif = type === "currency" ? `${formatter.format(goal)}` : `${goal} KM`;
    const current = type === "currency" ? `${formatter.format(total)}` : `${total} KM`;
    return(
        <>
            <div className="h-10 md:h-12 relative  rounded-full overflow-hidden mb-20 font-poppins">
                <div className="w-full h-full bg-primary absolute ">
                    <div className={"flex md:text-3xl text-sm text-white flex-row justify-end items-center md:pr-8 pr-4 w-full h-full"}>{objectif}</div>
                </div>
                <div style={ percent > 30 ? { width: `${percent}%`} : {width: "max-content" }} className="h-full min-w-sm bg-white shadow-xl absolute rounded-full">
                    <div className={"flex md:text-3xl text-xl flex-row justify-end items-center md:px-8 px-4 w-full h-full text-dark"}>{current}</div>
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
