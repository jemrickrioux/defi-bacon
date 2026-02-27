import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import Header from "../components/utils/header";

const Home: NextPage = () => {
  const { mutateAsync: mutate } = trpc.useMutation("participations.addOne");
  const {
    data: p,
    isLoading,
    refetch: refetchAll,
  } = trpc.useQuery(["participations.getAll"]);
  const { data: totalDistance, refetch: refetchDistance } = trpc.useQuery([
    "participations.totalDistance",
  ]);
  const { data: goalDistance } = trpc.useQuery(["goal.totalDistance"]);
  const { data: current } = trpc.useQuery(["goal.current"]);

  const refresh = async () => {
    await refetchAll();
    await refetchDistance();
  };

  return (
    <>
      <Head>
        <title>Défi Bacon - Courir pour la cause</title>
        <meta name="description" content="Défi Bacon : 32 000$ pour 32 années de vie. À chaque 10$ donné, nous courons 1 KM en mémoire de Maxime Papillon." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={"container mx-auto overflow-hidden"}>
        <Header current={current} />
      </div>
    </>
  );
};

export default Home;
