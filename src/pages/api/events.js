import { API } from "aws-amplify";
import { createTransaction } from "@/graphql/mutations";
import { listModuleOnes } from "@/graphql/queries";

export default async function handler(req, res) {
    if (req.method === "POST") {
    if (req.method === "POST") {
      // primero validamos que exita el registro en la bd con el numero de trasaccion
    
      const allModuleOnes = await API.graphql({
        query: listModuleOnes,
      });
      const existingTransaction =
        allModuleOnes.data.listModuleOnes.items.filter(
          (item) => item.transactionId === req.body.data.transaction.id
        );
      //console.log(existingTransaction[0])
      const existing = existingTransaction[0];
      //console.log(existing)
        
      if(existing){
  if (req.method === "POST") {
      // primero validamos que exita el registro en la bd con el numero de trasaccion
    
      const allModuleOnes = await API.graphql({
        query: listModuleOnes,
      });
      const existingTransaction =
        allModuleOnes.data.listModuleOnes.items.filter(
          (item) => item.transactionId === req.body.data.transaction.id
        );
      //console.log(existingTransaction[0])
      const existing = existingTransaction[0];
      //console.log(existing)
        
      if(existing){
    // Validaciones para el checksum
    const reqData = req.body.data;
    const checkSumParams = req.body.signature.properties;
    const concatenatedString = checkSumParams
      .map((key) => {
        // Obtener el valor correspondiente de reqData usando la clave
        const value = key
          .split(".")
          .reduce(
            (obj, k) => (obj && obj[k] !== "undefined" ? obj[k] : undefined),
            reqData
          );

        // Retornar el valor si está definido, de lo contrario, una cadena vacía
        return value !== undefined ? value : "";
      })
      .join(""); // Unir los valores en una sola cadena

    const finalString = concatenatedString + req.body.timestamp + process.env.EVE_KI;

    const encondedText = new TextEncoder().encode(finalString);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    //llamamos a los modulos para ver si ya existe un modulo con esta data
    const allModuleOnes = await API.graphql({
      query: listModuleOnes,
    });
    const existingTransaction = allModuleOnes.data.listModuleOnes.items.filter(
      (item) => item.transactionId === req.body.data.transaction.id
    );
    //console.log(existingTransaction[0])
    const existing = existingTransaction[0];

    const params = {
      transactionId: reqData.transaction.id,
      checksum: req.body.signature.checksum,
      amountInCents: reqData.transaction.amount_in_cents,
      reference: reqData.transaction.reference,
      customerEmail: reqData.transaction.customer_email,
      currency: reqData.transaction.currency,
      paymentMethodType: reqData.transaction.payment_method_type,
      redirectUrl: reqData.transaction.redirect_url,
      status: reqData.transaction.status,
      event: req.body.event,
      environment: req.body.environment,
      timestamp: req.body.timestamp,
      sentAt: req.body.sent_at,
      ownCheckSum: hashHex,
      checksumParams: JSON.stringify(checkSumParams),
      modelID: existing?.id || "",
    };

    const newTransaction = await API.graphql({
      query: createTransaction,
      variables: {
        input: params,
      },
    });

    res.status(200).json(reqData);
  } else {
    res.status(404).json({ message: "Invalid" });
  }
}
