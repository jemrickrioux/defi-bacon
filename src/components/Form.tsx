import { trpc } from "../utils/trpc";
import { useRouter } from 'next/router'
import {useState} from "react";
import {name} from "next/dist/telemetry/ci-info";


const Form = (props: any) => {
    const router = useRouter()
    const [nameValue, setNameValue] = useState("");
    const [isOpen, setIsOpen]= useState(false);
    const {mutate, refresh, toggleModal} = props
    let result : any = {};
    if (nameValue.length > 0) {
        result =  trpc.useQuery(["participants.search", nameValue])
    } else {
        result =  trpc.useQuery(["participants.getAll"]);
    }
    console.log(result)

    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        if(e.target.name.value === "Baconator") {
            router.push("/admin")
        } else {
            if (e.target.name.value && e.target.distance.value && e.target.date.value) {
                await mutate({
                    name: e.target.name.value,
                    distance: parseFloat(e.target.distance.value),
                    date: new Date(Date.parse(e.target.date.value))
                })
                e.target.date.value = ""
                e.target.name.value = ""
                e.target.distance.value = ""
                await refresh()
                toggleModal()
            } else {
                alert("Veuillez remplir tous les champs!")
            }
        }

    }

    const handleNewValue = (v: string) => {
        setNameValue(v);
        setIsOpen(false);
    }
    const handleChange = async (e: any) => {
        setNameValue(e.target.value);
        await result.refetch()
        setIsOpen(true)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={"bg-primary flex flex-col justify-around mx-auto md:mx-20 mx-5 rounded-lg space-y-4 px-24 py-20 md:my-20 max-w-4xl"}>
                    <div className={"flex flex-row justify-between"}>
                        <div className={"md:text-5xl text-3xl text-white uppercase font-bold font-poppins"}>Enregistrez une course</div>
                        <div onClick={toggleModal} className={"text-4xl cursor-pointer self-center text-dark font-bold"}>X</div>
                    </div>

                    <div className={"ml-3"}>
                        <div className={"pt-8 max-w-sm"}>
                            <div className={"text-2xl mb-2"}>Quel est votre nom?</div>
                            <input name={"name"} value={nameValue} onChange={handleChange} type="text" className={`py-2 px-6 my-2  text-2xl w-full ${isOpen  ? "rounded-t-lg": "rounded-lg"}`} placeholder={"Nom de la personne"}/>
                            {nameValue.length != 0 && result.data && result.data.length > 0 && isOpen && result.data.map((el: any,i: number)=>{
                                return (<div onClick={()=>handleNewValue(el.name)} key={el.id} className={`text-2xl py-2  ${i == result.data.length -1 ? "rounded-b-lg": ""} px-6 my-2 bg-white -mt-2 w-full mb-2`}>{el.name}</div>)
                            })}
                        </div>
                        <div className={"pt-6"}>
                            <div className={"text-2xl mb-2"}>Combien de KM avez-vous couru?</div>
                            <input name={"distance"} step={"0.1"} type="number" className={"py-2 px-6 my-2 rounded-lg text-2xl"} placeholder={"Nombre"}/>
                        </div>
                        <div className={"pt-6"}>
                            <div className={"text-2xl mb-2"}>Quelle est la date de votre course?</div>
                            <input name={"date"} type="date" className={"py-2 px-6 my-2 rounded-lg text-2xl mb-10"} placeholder={"Nombre"}/>
                        </div>
                    </div>
                    <input className={"bg-white ml-3 px-8 rounded-full py-5 text-4xl w-max font-rubik font-bold uppercase"} type={"submit"}/>
                </div>

            </form>

        </>
    );
};
export default Form;
