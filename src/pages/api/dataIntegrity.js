import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const {
    query: { value, currency },
  } = req;

  const unicRef = uuidv4();
  // monto de la transaccion
  const currentDate = new Date();
  const tenMinutesLater = new Date(currentDate.getTime() + 10 * 60 * 1000);
  const formattedDate = tenMinutesLater.toISOString();

  var cadenaConcatenada = `${unicRef}${value}${currency}${process.env.INT_KI}`;
  console.log(cadenaConcatenada);
  //Ejemplo
  const encondedText = new TextEncoder().encode(cadenaConcatenada);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const data = {
    mensaje: hashHex,
    reference: unicRef,
    ki: process.env.PUB_KI, // Remover cuando vaya a prod y cambiar las variables de entorno
  };

  // Envía la respuesta como JSON
  res.status(200).json(data);
}
