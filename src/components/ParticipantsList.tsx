import PropTypes from "prop-types";
import {trpc} from "../utils/trpc";
import Link from "next/link";


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
                            <div className=" my-1" key={el.id}>
                                <div className="flex flex-row space-x-2 items-center py-6 px-14 justify-between bg-primary rounded-2xl shadow">
                                    <div className={"flex flex-col"}>
                                        <div className={"text-4xl text-white font-poppins"}><Link href={`/profil/${el.participant.id}`}>{el.participant.name}</Link></div>
                                        <div className={"text-2xl text-dark text-dark mt-2"}>{formatter.format(el.date)}</div>
                                    </div>
                                    <div className={"flex flex-row justify-center items-center space-x-10"}>
                                    <div className={"text-5xl text-white font-bold"}>{el.distance} KM</div>
                                    <div onClick={()=>handleRemove(el.id)} className={"cursor-pointer text-white text-4xl font-bold"}>X</div>
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
