import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";

const Form = (props: any) => {
  const router = useRouter();
  const [nameValue, setNameValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { mutate, refresh, toggleModal } = props;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const searchResult = trpc.useQuery(["participants.search", nameValue], {
    enabled: nameValue.length > 0,
  });
  const allResult = trpc.useQuery(["participants.getAll"], {
    enabled: nameValue.length === 0,
  });
  const result = nameValue.length > 0 ? searchResult : allResult;

  const formatter = Intl.DateTimeFormat("fr-CA", {
    dateStyle: "long",
    timeZone: "America/Montreal",
  });

  const handleSubmit = async (e: any): Promise<void> => {
    e.preventDefault();
    setError("");
    if (e.target.name.value === "Baconator") {
      router.push("/admin");
      return;
    }
    const name = e.target.name.value.trim();
    const distanceStr = e.target.distance.value;
    const dateStr = e.target.date.value;
    if (!name || !distanceStr || !dateStr) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    const distance = parseFloat(distanceStr);
    if (isNaN(distance) || distance <= 0) {
      setError("La distance doit être un nombre supérieur à 0.");
      return;
    }
    if (distance > 1000) {
      setError("La distance semble trop grande (max 1000 KM).");
      return;
    }
    setIsSubmitting(true);
    try {
      const d = new Date(dateStr);
      d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
      await mutate({ name, distance, date: d });
      e.target.date.value = "";
      e.target.name.value = "";
      e.target.distance.value = "";
      setNameValue("");
      await refresh();
      toggleModal();
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
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
            <button onClick={toggleModal} aria-label="Fermer" type="button" className={"ml-5 self-center hover:opacity-70 transition-opacity"}>
              <XIcon className={"w-10 cursor-pointer"} />
            </button>
          </div>

          <div className={"ml-3 font-poppins"}>
            <div className={"pt-4 max-w-sm"} ref={dropdownRef}>
              <div className={"text-2xl mb-1"}>Quel est votre nom?</div>
              <input
                name={"name"}
                value={nameValue}
                onChange={handleChange}
                type="text"
                className={`py-2 px-6 my-2 text-2xl w-full ${
                  isOpen ? "rounded-t-lg" : "rounded-lg"
                }`}
                placeholder={"Nom de la personne"}
                autoComplete="off"
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
                      className={`text-2xl py-2 cursor-pointer hover:bg-gray-100 ${
                        i == result.data.length - 1 ? "rounded-b-lg" : ""
                      } px-6 -mt-2 w-full bg-white`}
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
                max={"1000"}
                name={"distance"}
                step={0.1}
                type="number"
                className={"py-2 px-6 my-2 rounded-lg text-2xl"}
                placeholder={"ex: 5.2"}
              />
            </div>
            <div className={"pt-4"}>
              <div className={"text-2xl mb-1"}>
                Quelle est la date de votre course?
              </div>
              <input
                name={"date"}
                type="date"
                max={today}
                className={"py-2 px-6 my-2 rounded-lg text-2xl mb-8"}
              />
            </div>
          </div>
          {error && (
            <div className={"ml-3 text-red-600 font-poppins text-lg"}>
              {error}
            </div>
          )}
          <input
            className={
              `ml-3 px-8 rounded-lg py-4 px-6 text-2xl w-max font-poppins font-bold uppercase ${isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-white cursor-pointer"}`
            }
            type={"submit"}
            disabled={isSubmitting}
            value={isSubmitting ? "Envoi..." : "Envoyer"}
          />
        </div>
      </form>
    </>
  );
};
export default Form;
