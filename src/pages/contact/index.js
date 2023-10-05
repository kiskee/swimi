import { API } from "aws-amplify";
import { createCandidate } from "@/graphql/mutations";
import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onMessageChanged = (e) => setMessage(e.target.value);

  async function handleCreateCandidate(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    try {
      const newCandidate = await API.graphql({
        query: createCandidate,
        variables: {
          input: {
            name: form.get("name"),
            email: form.get("email"),
            message: form.get("message"),
          },
        },
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-8 text-slate-950 bg-gray-50">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x text-center">
        <div className="py-6 md:py-0 md:px-6 text-center">
          <h1 className="text-4xl font-bold">Contacte con Nosotros</h1>
          <p className="pt-2 pb-4">
            Nos gustaria tener noticias suyas. Envienos un mensaje atravez de
            este canal.
          </p>
          <div className="space-y-4 t">
            <p className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Medellin, Antioquia, Colombia</span>
            </p>
            <p className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2 sm:mr-6"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>nieladverse@gmail.com</span>
            </p>
          </div>
        </div>
        <form
          onSubmit={handleCreateCandidate}
          className="flex flex-col py-6 space-y-6 md:py-0 md:px-6"
        >
          <label className="block">
            <span className="mb-1">Nombre completo</span>
            <input
              type="text"
              name="name"
              class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
              placeholder="Tu nombre aca"
              value={name}
              onChange={onNameChanged}
            />
          </label>
          <label className="block">
            <span className="mb-1">Email </span>
            <input
              type="email"
              name="email"
              placeholder="leroy@jenkins.com"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 "
              value={email}
              onChange={onEmailChanged}
            />
          </label>
          <label className="block">
            <span className="mb-1">Mensaje</span>
            <textarea
              name="message"
              rows="3"
              className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              value={message}
              onChange={onMessageChanged}
            ></textarea>
          </label>
          <button className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri bg-purple-700 text-white  focus:ri hover:ri">
            Contactanos
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
