import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import Board from "../components/Board";


const Admin: NextPage = () => {
    const {data: goalDistance, refetch} =  trpc.useQuery(["goal.totalDistance"]);
    const {mutate, isLoading} = trpc.useMutation('goal.update',{
        onSuccess: () => {
            refetch()
        }
    });
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const number = e.target.totalDistance.value;
        await mutate(parseInt(number));
        e.target.totalDistance.value = ""
    }

    return (
        <>
            <Head>
                <title>Défi Bacon</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={"container mx-auto min-h-screen my-10"}>
                <div className={"border-2 rounded-lg py-10 px-6 bg-white flex flex-col space-y-2"}>
                    <h2 className={"text-4xl font-sans"}>Admin</h2>
                    <div>Total distance is: {goalDistance ? goalDistance._sum.distance: ""}</div>
                    <form onSubmit={handleSubmit} className={"space-y-2"}>
                        {isLoading? (<p>Loading...</p>) : (<input className={"w-full"} type={"text"} name={"totalDistance"} placeholder={"Entrer la nouvelle distance"}/>)}
                        <input type={"submit"} className={"bg-green-200 w-max px-3 py-1 border border-white rounded-lg cursor-pointer hover:border-gray-300 hover:shadow"}/>
                    </form>
                </div>

            </div>
        </>
    );
};

export default Admin;
