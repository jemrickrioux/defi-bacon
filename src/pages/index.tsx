import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import Board from "../components/Board";
import Link from 'next/link'
import {goalRouter} from "../server/router/goal";
import ProgressBar from "../components/ProgressBar";



const Home: NextPage = () => {
  const {mutateAsync: mutate} = trpc.useMutation('participations.addOne');
  const {data: p, isLoading, refetch: refetchAll} =  trpc.useQuery(["participations.getAll"]);
  const {data: totalDistance, refetch: refetchDistance} =  trpc.useQuery(["participations.totalDistance"]);
  const {data: goalDistance} =  trpc.useQuery(["goal.totalDistance"]);

  const refresh = async () => {
    await refetchAll();
    await refetchDistance();
  }

  return (
    <>
      <Head>
        <title>Défi Bacon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"container h-screen mx-auto overflow-hidden"}>
        <div className={"grid"}>
            <div className={"flex flex-col md:py-20 py-6 my-10 md:my-40 mx-6"}>
                <h1 className={"md:text-9xl text-5xl mb-6"}>Le Défi Bacon</h1>
                <h2 className={"md:text-6xl text-4xl"}>32 000$ pour 32 années de vies.</h2>
                <div className={"flex md:flex-row flex-col my-20 md:space-x-3 md:space-y-0 space-y-2"}>
                    <div className={"w-max h-max hover:shadow py-2 px-4 rounded-lg cursor-pointer md:text-xl bg-green-800 text-white uppercase font-bold"}><a target={"__blank__"} href={"https://www.gofundme.com/f/gofundme-en-la-mmoire-de-mon-frre-maxime?qid=ebd1a3895ff5966bc933b363abac173c"}>Donner à la cause</a></div>
                    <div  className={"w-max h-max hover:shadow py-2 px-4 rounded-lg cursor-pointer md:text-xl bg-white text-black uppercase font-bold"}><Link href={"/app"}>Contribuer à la course</Link></div>
                </div>
                <ProgressBar total={23010} goal={32000}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;
