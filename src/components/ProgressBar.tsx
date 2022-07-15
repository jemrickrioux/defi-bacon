import { trpc } from "../utils/trpc";

const ProgressBar = (props: any) => {
    const {goal, total} = props;
    const percent = total ? (total / goal) * 100 : 0;
    return(
        <>
            <div className={"text-xl"}>{total} sur l'objectif de {goal}</div>
            <div className="h-8 relative max-w-xl rounded-lg overflow-hidden mb-10 border-2 border-black">
                <div className="w-full h-full bg-gray-100 absolute"></div>
                <div style={{ width: `${percent}%`}} className="h-full bg-green-700 absolute"></div>
            </div>

        </>)
};
export default ProgressBar;
