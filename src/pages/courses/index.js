import Image from "next/image";
import certificadoImg from '../../../public/certificado.jpeg'

function CoursesPage() {
  return (
    <>
      <div className="bg-indigo-950 py-8 px-6 text-center text-xl pl-2">
        <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-white ss:text-left ss:text-xs">
          Curso de Capacitación de Instructores y Entrenadores de <br />
          <span className="text-primary">Natación</span>
        </h1>
        <div className="flex justify-center">
          <ul className="space-y-4 text-left text-white">
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span>
                Se integra por 6 Módulos de estudio para técnicos de Natación.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span>Se realiza virtual por Internet, no presencial.</span>
            </li>
            <li>
              <div className="flex items-center space-x-3">
                <svg
                  className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
                <span>
                  Transcurre en 3{" "}
                  <span className="font-semibold text-primary">niveles:</span>
                </span>
              </div>
              <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                <li>Nivel I – Instructor. Tres Módulos</li>
                <li>Nivel II - Entrenador Infantiles. Dos Módulos.</li>
                <li>Nivel III Entrenador Juv A, B y Mayores. 1 Módulo.</li>
              </ul>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span>
                A cada Nivel corresponde un certificado otorgado por
                <span className="font-semibold text-primary text-2xl">
                  {" "}
                  Acuàtica Nelson Vargas, Mèxico
                </span>
              </span>
            </li>
          </ul>
        </div>

        
      </div>
      <h1 className="text-4xl text-center mt-4 text-black">
        Características del Programa de Capacitación.
      </h1>
      <p className="mt-4 text-xl mx-12">
        {" "}
        El Programa de Capacitación está concebido para estandarizar niveles
        generales de conocimientos sobre el proceso de enseñanza y formación de
        nadadores, con argumentos y conceptos que se sustentan en las Ciencias
        Deportivas, lo que contribuirá a que todos los técnicos que se
        desempeñan en Clubes, Centros Recreativos, Asociaciones e instituciones
        privadas y otras entidades que desarrollan la natación, dispongan de las
        bases teóricas y los medios técnicos y metodológicos que requieren para
        hacer más eficiente y segura su labor práctica.
        <br />
        El Programa está diseñado para llevarlo a cabo, como máximo en 12 meses,
        tiempo en el cual se transita por 6 módulos de estudio, con una
        extensión de dos meses para cada uno de ellos. Si los interesados se
        proponen hacerlo en menos tiempo, siempre que aprueben un módulo pueden
        continuar con el siguiente, pues es absolutamente individual, no
        presencial, siendo todo su desarrollo vía internet.
      </p>
      <div className="flex justify-center">
      <Image src={certificadoImg} className="mt-8" height={800} width={600} alt="certificado-image"/>
      </div>
      <h1 className="text-4xl text-center mt-4 text-indigo-800 font-semibold">
        Espera nuestro primer Modulo pronto
      </h1>
    </>
  );
}

export default CoursesPage;
