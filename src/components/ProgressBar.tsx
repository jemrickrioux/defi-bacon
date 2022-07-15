import { trpc } from "../utils/trpc";

const ProgressBar = (props: any) => {
    const {percent} = props;
    return(
        <>
            <div className="h-3 relative max-w-xl rounded-full overflow-hidden mb-10">
                <div className="w-full h-full bg-gray-200 absolute"></div>
                <div style={{ width: `${percent}%`}} className="h-full bg-green-500 absolute"></div>
            </div>

        </>)
};
export default ProgressBar;
