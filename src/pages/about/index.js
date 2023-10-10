import { useEffect } from "react";
import sergioImage from "../../../public/sergio-1.png";
import Image from "next/image";

function AboutPage() {
  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown });
    };
    init();
  }, []);

  return (
    <>
      <div class="container mt-24 mx-auto md:px-6">
        <section class="mb-16">
          <div class="flex flex-wrap">
            <div class="w-full shrink-0 grow-0 basis-auto md:w-2/12 lg:w-3/12">
              <Image
                src={sergioImage}
                class="mb-6 w-full rounded-lg shadow-lg dark:shadow-black/20"
                alt="Avatar"
              />
            </div>

            <div class="w-full shrink-0 grow-0 basis-auto text-center md:w-10/12 md:pl-6 md:text-left lg:w-9/12">
              <h5 class="mb-6 text-2xl font-semibold text-center text-black">
                Sergio Valiente Gómez
              </h5>

              <p>
                Sergio Valiente Gómez es un distinguido profesional en el campo
                del deporte, específicamente en la natación. Nació el 14 de
                julio de 1944 y ha dedicado gran parte de su vida a la formación
                y entrenamiento de nadadores de alto rendimiento. A lo largo de
                su carrera, ha obtenido una amplia gama de estudios y
                certificaciones en el ámbito deportivo, incluyendo una
                licenciatura en el Instituto Superior de Cultura Física de La
                Habana, Cuba, y un máster en Natación del Instituto Superior
                Alemán de Cultura Física en Leipzig, antigua RDA.
              </p>
              <br />
              <p>
                Valiente Gómez ha ocupado diversas posiciones, desde entrenador
                de enseñanza hasta director técnico nacional en Cuba y la
                Federación Colombiana de Natación. Además, ha tenido una
                destacada presencia en organismos deportivos internacionales,
                incluyendo su papel como directivo en la Confederación
                Centroamericana y del Caribe, así como presidente del Comité
                Técnico de Natación de la PANAM ACUATICS.
              </p>
              <br />
              <p>
                Además de su trabajo en el ámbito deportivo, Valiente Gómez ha
                contribuido significativamente a la literatura y educación en
                natación a través de numerosos artículos y publicaciones.
                También está involucrado en la creación de materiales
                educativos, como un manual del entrenador de natación con
                enfoque en el alto rendimiento y cursos de capacitación para
                instructores y entrenadores.
              </p>
              <br />
              <p>
                En cuanto a sus atributos personales, se destaca por su
                sinceridad, lealtad, autoridad, organización, responsabilidad,
                optimismo, exigencia, colaboración y educación. Estos atributos
                han sido fundamentales en su éxito profesional y han contribuido
                a su impacto positivo en el mundo de la natación. Actualmente,
                Valiente Gómez continúa trabajando de forma independiente,
                ofreciendo asesorías y cursos de capacitación en el campo de la
                natación.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
          <div class="border-b-2 border-indigo-500 px-6 py-3 ml-4 mr-4 text-center text-2xl text-indigo-950">
            Estudios medios y superiores realizados:
          </div>
          <ul className="p-6 text-center">
            <li>
              ⦁ Curso de formación de entrenadores en el Instituto Superior de
              Cultura Física de La Habana.
            </li>
            <li>
              ⦁ Licenciatura en el Instituto Superior de Cultura Física de La
              Habana, Cuba.
            </li>
            <li>
              ⦁ Master en Natación en el Instituto Superior Alemán de Cultura
              Física, ee Leipzig, antigua RDA
            </li>
          </ul>
        </div>
        <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
          <div class="border-b-2 border-indigo-500 px-6 py-3 ml-4 mr-4 text-center text-2xl text-indigo-950">
            Cursos, Seminarios y Conferencias Impartidos:
          </div>
          <ul className="p-6 text-center">
            <li>
              ⦁ Cursos de Capacitación de entrenadores en Brasil, Argentina,
              Chile, Bolivia, Perú, Paraguay, Colombia, Panamá, Nicaragua, Costa
              Rica, Guatemala, México.
            </li>
            <li>
              ⦁ Ponente en Congresos Técnicos Internacionales en España, Brasil,
              Argentina, Panamá, Puerto Rico, México y otros países.
            </li>
          </ul>
        </div>
      </div>
      <div class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-10">
        <div class="border-b-2 border-indigo-500 px-6 py-3 ml-4 mr-4 text-center text-2xl text-indigo-950">
          Cursos y postgrados recibidos
        </div>
        <ul className="p-6 text-center">
          <li>
            ⦁ Teoría y metodología del entrenamiento. La selección de talentos.
            Computación. Estructura y Planificación del Entrenamiento Deportivo.
            Historia del Deporte y la Cultura Física.
          </li>
        </ul>
      </div>

      <div class="block rounded-lg bg-indigo-950 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mt-10">
        <div class="border-b-2 border-indigo-500 px-6 py-3 ml-4 mr-4 text-center text-2xl text-white">
          Actividades en Organismos Deportivos Internacionales:
        </div>
        <ul className="p-6 text-gray-400 text-center">
          <li>
            ⦁ Directivo del Comité Técnico y Comité Ejecutivo de la
            Confederación Centroamericana y del Caribe desde 1986 y hasta 2006.
          </li>
          <li>
            ⦁ Presidente del Comité Técnico de Natación de la PANAM ACUATICS
            entre 1995 y 1999. Miembro de su Comité Ejecutivo entre 1999 y 2007.
          </li>
        </ul>
      </div>

      <h1 className="text-center pb-6 text-3xl text-black mt-4">
        Trayectoria Laboral:
      </h1>
      <ol class="border-l border-indigo-950  md:flex md:justify-center md:gap-6 md:border-l-0 md:border-t">
        <li>
          <div class="flex-start flex items-center pt-2 md:block md:pt-0">
            <div class="-ml-[5px] mr-3 h-[10px] w-[10px] rounded-full bg-indigo-950  md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div class="ml-4 mt-2 pb-5 md:ml-0">
            <p class="mb-3 text-neutral-500 dark:text-neutral-300">
              Inició como entrenador de Enseñanza. Continuó domo entrenador de
              equipos infantiles y juveniles. Entrenador de la Selección
              Nacional de Cuba.
            </p>
          </div>
        </li>

        <li>
          <div class="flex-start flex items-center pt-2 md:block md:pt-0">
            <div class="-ml-[5px] mr-3 h-[10px] w-[10px] rounded-full bg-indigo-950  md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div class="ml-4 mt-2 pb-5 md:ml-0">
            <p class="mb-3 text-neutral-500 dark:text-neutral-300">
              Promovido a Director Técnico Nacional en Cuba desde 1978 y hasta
              2000. Entre 2001 y hasta 2017 fue Director Técnico de la
              Federación Colombiana de Natación, Desde septiembre de 2018 y
              hasta diciembre de 2022 ejerció como Gerente de Equipos Acuática
              Nelson Vargas, en México.
            </p>
          </div>
        </li>

        <li>
          <div class="flex-start flex items-center pt-2 md:block md:pt-0">
            <div class="-ml-[5px] mr-3 h-[10px] w-[10px] rounded-full bg-indigo-950  md:-mt-[5px] md:ml-0 md:mr-0"></div>
          </div>
          <div class="ml-4 mt-2 pb-5 md:ml-0">
            <p class="mb-3 text-neutral-500 dark:text-neutral-300">
              Hoy trabaja como independiente en asesorías y cursos de
              capacitación.
            </p>
          </div>
        </li>
      </ol>
    </>
  );
}

export default AboutPage;
