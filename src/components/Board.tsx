import { trpc } from "../utils/trpc";
import {useEffect, useState} from "react";


const IsLoading = () => <div>Loading...</div>

const LoadedBoard = (props: any) => {
    const {p, total, goal} = props
    const formatter = Intl.DateTimeFormat('fr-CA', {
        dateStyle: "medium"
    })
    return (
        <>
        <div className={"text-lg my-10"}>Les participants ont courus un total de <span className={"font-bold"}> {total._sum.distance} KM</span> sur un objectif de<span className={"font-bold"}> {goal._sum.distance} KM</span></div>
    {p?.map((el: any) => {
        return (
            <div className="border-b border-t min-w-full" key={el.date.toISOString()}>
                <div className="flex flex-row space-x-2 items-center py-2 px-6 justify-between">
                    <div className={"flex flex-col"}>
                        <div className={"text-xl"}>{el.name}</div>
                        <div className={"text-md"}>{formatter.format(el.date)}</div>
                    </div>
                    <div className={"text-xl font-bold"}>{el.distance} KM</div>
                </div>
            </div>
        )
    })}
        </>
    )
}

const Board = (props: any) => {
    const {p, isLoading, total, goal} = props;

    return(
        <>
            <div className={"bg-white flex flex-col border-2 mx-auto mx-20 rounded-lg p-10 my-20"}>
                <div className={"text-4xl"}>Résultats</div>
                {isLoading? <div>Loading...</div>: <LoadedBoard p={p} total={total} goal={goal}/>}
            </div>

        </>)
};
export default Board;
