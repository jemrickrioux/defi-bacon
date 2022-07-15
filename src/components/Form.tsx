import { trpc } from "../utils/trpc";
import { useRouter } from 'next/router'


const Form = (props: any) => {
    const router = useRouter()
    const {mutate, refresh} = props
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
            } else {
                alert("Veuillez remplir tous les champs!")
            }
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={"bg-white flex flex-col mx-auto md:mx-20 mx-5 border-2 rounded-lg space-y-4 p-10 my-20"}>
                    <h1 className={"text-4xl"}>Contribuez au défi Bacon</h1>
                    <div>
                        <div className={"text-xl font-sans"}>Quel est votre nom?</div>
                        <input name={"name"} type="text" className={""} placeholder={"Nom de la personne"}/>
                    </div>
                    <div>
                        <div className={"text-xl font-sans"}>Combien de KM avez-vous couru?</div>
                        <input name={"distance"} step={"0.1"} type="number" className={""} placeholder={"Nombre"}/>
                    </div>
                    <div>
                        <div className={"text-xl font-sans"}>Quelle est la date de votre course?</div>
                        <input name={"date"} type="date" className={""} placeholder={"Nombre"}/>
                    </div>
                    <input className={"self-start"} type={"submit"}/>
                </div>
            </form>

        </>
    );
};
export default Form;
