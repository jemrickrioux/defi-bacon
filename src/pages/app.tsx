import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import ProgressBar from "../components/ProgressBar";
import Link from "next/link";
import {useState} from "react";
import { HomeIcon, PlusIcon} from '@heroicons/react/solid'
import {useRouter} from "next/router";


const App: NextPage = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const formatter = Intl.DateTimeFormat('fr-CA', {
        dateStyle: "medium",
        timeZone:"America/Montreal"
    })


    const toggleModal = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }
    const {data: current} =  trpc.useQuery(["goal.current"]);
  const {mutateAsync: mutate} = trpc.useMutation('participations.addOne');
  const {data: p, isLoading, refetch: refetchAll} =  trpc.useQuery(["participations.getAll"]);
    const {data: l, isLoading: lbLoading , refetch: refetchLeaderboard} =  trpc.useQuery(["participants.leaderboard"]);
  const {data: total, refetch: refetchDistance} =  trpc.useQuery(["participations.totalDistance"]);
    const {data: goal} =  trpc.useQuery(["goal.totalDistance"]);
    let data = [] as any[];
  const refresh = async () => {
    await refetchAll();
    await refetchDistance();
      await refetchLeaderboard();

  }
  return (
    <>
      <Head>
        <title>Défi Bacon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        {isOpen?(<div className={"inset-0 md:bg-hero-i-like-food-100 absolute z-10 bg-dark bg-opacity-80 flex justify-center"}><Form mutate={mutate} refresh={refresh} toggleModal={toggleModal}></Form></div>): ""}
        <div className={" z-4 container mx-auto md:mt-10 md:w-3/4 flex flex-col"}>

          <div className={`${isOpen ? "hidden" : ""} flex h-max flex-col bg-dark  md:rounded-lg md:px-24 px-10 md:py-20 py-10 md:my-5`}>
              <div className={"md:mb-10 mb-5 self-start flex flex-row space-x-2"}>
                  <HomeIcon onClick={()=>router.push("/")} className={"w-8 md:w-12 text-white mb-5"}/>
              </div>
          <div className={"flex md:flex-row w-full md:justify-between justify-between"}>

              <div className={"md:text-6xl text-2xl mb-14 text-white uppercase font-bold font-poppins"}>Résultats</div>
              <div onClick={toggleModal} className={"cursor-pointer md:text-xl text-sm mb-14 self-center hover:shadow hover:text-white hover:bg-primary md:self-center w-max h-max text-dark uppercase bg-secondary md:py-4 py-2 px-4 rounded-lg  font-bold font-poppins flex items-center"}><PlusIcon className={"w-6"}/> <span className={"ml-2"}>Course</span></div>
          </div>
          <ProgressBar current={total ? total  :0} goal={current? current / 10 : 0} type={"distance"} />
              <div className={`border-b-2 -mt-5 mb-14 `}></div>
              <div className={"md:text-6xl text-4xl md:mb-14 mb-8 text-white uppercase font-bold font-poppins"}>Top 3</div>
              {l?.slice(0,3).map((el: any, index: number) => {
                  return (
                      <div className="my-1" key={el.id}>
                          <div className="flex flex-row space-x-2 items-center md:py-6 py-4 md:px-14 px-6 justify-between bg-primary rounded-2xl shadow">
                              <div className={"flex font-bold text-white text-4xl font-bold text-5xl"}>
                                  {index +1}
                                  <div className={"flex flex-col ml-6 justify-center"}>
                                      <div className={"md:text-4xl text-2xl text-white font-poppins underline hover:text-dark hover:animate-pulse underline-offset-1 "}><Link href={`/profil/${el.participant.id}`}>{el.participant.name + " >"}</Link></div>
                                  </div>
                              </div>

                              <div className={"md:text-5xl text-xl text-white w-max flex md:self-center self-start"}>{el.distance}KM</div>
                          </div>
                      </div>
                  )})}

          <div className={`border-b-2 my-14 `}></div>
          <div className={"md:text-6xl text-4xl md:mb-14 mb-8 text-white uppercase font-bold font-poppins"}>Dernières courses</div>
          {p?.map((el: any) => {
              return (
                  <div className="my-1" key={el.id}>
                      <div className="flex flex-row space-x-2 items-center md:py-6 py-4 md:px-14 px-6 justify-between bg-primary rounded-2xl shadow">
                          <div className={"flex flex-col"}>
                              <div className={"md:text-4xl text-2xl text-white font-poppins underline hover:text-dark hover:animate-pulse underline-offset-1"}><Link href={`/profil/${el.participant.id}`}>{el.participant.name + " >"}</Link></div>
                              <div className={"md:text-2xl text-lg text-dark text-dark mt-2"}>{formatter.format(el.date)}</div>
                          </div>
                          <div className={"md:text-5xl text-xl text-white w-max flex md:self-center self-start"}>{el.distance}KM</div>
                      </div>
                  </div>
              )})}
      </div>
      </div>
    </>
  );
};

export default App;
