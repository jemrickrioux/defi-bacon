import PropTypes from "prop-types";
import {trpc} from "../utils/trpc";


const ParticipantsList = (props: any) => {
    const {p, isLoading, total, goal} = props;
    const {mutate} = trpc.useMutation('participations.removeOne');


    const formatter = Intl.DateTimeFormat('fr-CA', {
        dateStyle: "medium"
    })
    const handleRemove = async (id: number) => {
        if(confirm("Êtes-vous certain de vouloir supprimer cette participation")) {
            mutate(id);
        }
    }
    return(
        <>
            {isLoading? <div>Loading...</div>:(
                <>
                    {p?.map((el: any) => {
                        return (
                            <div className="border-b border-t min-w-full" key={el.id}>
                                <div className="flex flex-row space-x-2 items-center py-2 justify-between">
                                    <div className={"flex flex-col"}>
                                        <div className={"text-xl"}>{el.name}</div>
                                        <div className={"text-md"}>{formatter.format(el.date)}</div>
                                    </div>
                                    <div className={"flex flex-row space-x-3 items-center"}>
                                        <div className={"text-xl font-bold"}>{el.distance} KM</div>
                                        <div onClick={()=>handleRemove(el.id)} className={"cursor-pointer text-2xl font-bold"}>X</div>
                                    </div>
                                </div>
                            </div>
                        )})}
                </>
            )}
        </>)
};

ParticipantsList.propTypes = {
    p: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
    goal: PropTypes.number.isRequired
}
export default ParticipantsList;
