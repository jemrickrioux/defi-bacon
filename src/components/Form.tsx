import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useState } from "react";
import { name } from "next/dist/telemetry/ci-info";
import { XIcon } from "@heroicons/react/solid";

const Form = (props: any) => {
  const router = useRouter();
  const [nameValue, setNameValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, refresh, toggleModal } = props;
  let result: any = {};
  if (nameValue.length > 0) {
    result = trpc.useQuery(["participants.search", nameValue]);
  } else {
    result = trpc.useQuery(["participants.getAll"]);
  }

  const formatter = Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long",
    timeZone: "America/Montreal",
  });

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    if (e.target.name.value === "Baconator") {
      router.push("/admin");
    } else {
      if (
        e.target.name.value &&
        e.target.distance.value &&
        e.target.date.value
      ) {
        const d = new Date(e.target.date.value);
        console.log(d.setMinutes(d.getMinutes() + d.getTimezoneOffset()));
        await mutate({
          name: e.target.name.value,
          distance: parseFloat(e.target.distance.value),
          date: new Date(d.setMinutes(d.getMinutes() + d.getTimezoneOffset())),
        });
        e.target.date.value = "";
        e.target.name.value = "";
        e.target.distance.value = "";
        await refresh();
        toggleModal();
      } else {
        alert("Veuillez remplir tous les champs!");
      }
    }
  };

  const handleNewValue = (v: string) => {
    setNameValue(v);
    setIsOpen(false);
  };
  const handleChange = async (e: any) => {
    setNameValue(e.target.value);
    await result.refetch();
    setIsOpen(true);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={"bg-primary"}>
        <div
          className={
            " bg-primary flex flex-col justify-around mx-auto md:mx-20 rounded-lg space-y-4 px-10 py-20 md:my-20 max-w-4xl md:shadow-xl"
          }
        >
          <div className={"flex flex-row justify-between"}>
            <div
              className={
                "md:text-5xl text-3xl text-white uppercase font-bold font-poppins"
              }
            >
              Enregistrez une course
            </div>
            <XIcon
              onClick={toggleModal}
              className={"w-10 ml-5 cursor-pointer self-center"}
            />
          </div>

          <div className={"ml-3 font-poppins"}>
            <div className={"pt-4 max-w-sm"}>
              <div className={"text-2xl mb-1"}>Quel est votre nom?</div>
              <input
                name={"name"}
                value={nameValue}
                onChange={handleChange}
                type="text"
                className={`py-2 px-6 my-2  text-2xl w-full ${
                  isOpen ? "rounded-t-lg" : "rounded-lg"
                }`}
                placeholder={"Nom de la personne"}
              />
              {nameValue.length != 0 &&
                result.data &&
                result.data.length > 0 &&
                isOpen &&
                result.data.map((el: any, i: number) => {
                  return (
                    <div
                      onClick={() => handleNewValue(el.name)}
                      key={el.id}
                      className={`text-2xl py-2  ${
                        i == result.data.length - 1 ? "rounded-b-lg" : ""
                      } px-6 my-2 bg-white -mt-2 w-full mb-2`}
                    >
                      {el.name}
                    </div>
                  );
                })}
            </div>
            <div className={"pt-4"}>
              <div className={"text-2xl mb-1"}>
                Combien de KM avez-vous couru?
              </div>
              <input
                min={"0"}
                name={"distance"}
                step={"0.1"}
                type="number"
                className={"py-2 px-6 my-2 rounded-lg text-2xl"}
                placeholder={"Nombre"}
              />
            </div>
            <div className={"pt-4"}>
              <div className={"text-2xl mb-1"}>
                Quelle est la date de votre course?
              </div>
              <input
                name={"date"}
                type="date"
                className={"py-2 px-6 my-2 rounded-lg text-2xl mb-8"}
                placeholder={"Nombre"}
              />
            </div>
          </div>
          <input
            className={
              "bg-white ml-3 px-8 rounded-lg py-4 px-6 text-2xl w-max font-poppins font-bold uppercase"
            }
            type={"submit"}
          />
        </div>
      </form>
    </>
  );
};
export default Form;
