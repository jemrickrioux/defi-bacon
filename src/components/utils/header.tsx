import Link from "next/link";
import ProgressBar from "../ProgressBar";

function Header(props: { current: any }) {
  return (
    <div className={"grid"}>
      <div className={"flex flex-col md:my-20 my-4 md:mx-20 mx-6"}>
        <div className="relative flex py-5 items-center md:-mb-10 -mb-6">
          <span className="flex-shrink mr-4 md:text-9xl text-7xl text-primary uppercase font-bold font-poppins">
            Le Défi
          </span>
          <div className="flex-grow border-t-2 border-primary"></div>
        </div>
        <h1
          className={
            "md:text-9xl text-7xl mb-2  uppercase text-white font-bold font-poppins"
          }
        >
          Bacon
        </h1>

        <h2 className={"md:text-4xl text-xl font-poppins"}>
          32 000$ pour <span className={"font-bold"}>32 années de vie</span>
        </h2>
        <p className={"md:text-2xl text-lg mt-4 max-w-xl mt-12"}>
          À chaque tranche de 10$ nous allons courir 1KM à la mémoire de Maxime
          Papillon.
        </p>
        <div
          className={
            "flex md:flex-row flex-col my-14 md:space-x-3 md:space-y-0 space-y-2"
          }
        >
          <div
            className={
              "w-max h-max hover:shadow py-4 px-6 rounded-lg cursor-pointer md:text-2xl  bg-primary text-white uppercase font-bold font-rubik"
            }
          >
            <a
              target={"__blank__"}
              href={
                "https://www.gofundme.com/f/gofundme-en-la-mmoire-de-mon-frre-maxime?qid=ebd1a3895ff5966bc933b363abac173c"
              }
            >
              Donner à la cause
            </a>
          </div>
          <div
            className={
              "w-max h-max hover:shadow py-4 px-6 rounded-lg cursor-pointer md:text-2xl bg-dark text-white uppercase font-bold font-rubik"
            }
          >
            <Link href={"/app"}>Contribuer à la course</Link>
          </div>
        </div>
        <div className={"flex flex-col space-y-2 max-w-4xl"}>
          <h3 className={"md:text-5xl text-3xl mb-8 font-rubik text-dark"}>
            À quelques pas{" "}
            <span className={"font-bold text-primary"}>de notre objectif</span>
          </h3>
          <ProgressBar
            current={props.current ? props.current : 0}
            goal={32000}
            type={"currency"}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
