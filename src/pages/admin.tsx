import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Form from "../components/Form";
import ParticipantsList from "../components/ParticipantsList";
import Link from "next/link";
import { Button } from "react-query/types/devtools/styledComponents";

const Admin: NextPage = () => {
  const utils = trpc.useContext();
  const { data: goalDistance, refetch } = trpc.useQuery(["goal.totalDistance"]);
  const { data: totalDistance, refetch: refetchDistance } = trpc.useQuery([
    "participations.totalDistance",
  ]);
  const {
    data: p,
    isLoading,
    refetch: refetchAll,
  } = trpc.useQuery(["participations.getAll"]);
  const { mutate, isLoading: isGoalLoading } = trpc.useMutation("goal.update", {
    onSuccess: () => {
      utils.invalidateQueries(["goal.current"]);
    },
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const number = e.target.totalDistance.value;
    await mutate(parseInt(number));
    e.target.totalDistance.value = "";
  };

  const handleRefresh = async () => {
    const refresh = await fetch(
      "https://defibacon.com/.netlify/functions/scraper"
    );
    const data = await refresh.json();
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Défi Bacon</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"container mx-auto min-h-screen my-10 "}>
        <div
          className={
            "border-2 rounded-lg mx-auto md:mx-20 mx-5 rounded-lg p-10 my-20 px-6 bg-white flex flex-col space-y-2"
          }
        >
          <div
            className={
              "bg-primary rounded-lg py-4 px-8 w-max cursor-pointer font-poppins font-extrabold text-white text-xl uppercase hover:shadow-lg hover:text-black"
            }
            onClick={handleRefresh}
          >
            Rafraîchir les données
          </div>

          <h2 className={"text-4xl font-rubik"}>Admin</h2>
          <div>
            La distance totale est de : {goalDistance ? goalDistance : ""} KM
          </div>
          <form onSubmit={handleSubmit} className={"space-y-2 mb-10"}>
            {isGoalLoading ? (
              <p>Loading...</p>
            ) : (
              <input
                className={"w-full"}
                type={"text"}
                name={"totalDistance"}
                placeholder={"Entrer la nouvelle distance"}
              />
            )}
            <input
              type={"submit"}
              className={
                "w-max h-max hover:shadow py-4 px-4  rounded-lg cursor-pointer md:text-xl bg-dark text-white uppercase font-bold font-rubik"
              }
            />
          </form>
          <div className={""}>
            <ParticipantsList
              p={p ? p : []}
              isLoading={isLoading}
              total={totalDistance ? totalDistance : 0}
              goal={goalDistance ? goalDistance : 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
