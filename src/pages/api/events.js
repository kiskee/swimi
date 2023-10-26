import { API } from "aws-amplify";
import { createTransaction } from "@/graphql/mutations";

export default async function handler(req, res) {
    if (req.method === 'POST') {

    const params = {
        transactionId: req.body.data.transaction.id,
        checksum: req.body.signature.checksum,
        amountInCents: req.body.data.transaction.amount_in_cents,
        reference: req.body.data.transaction.reference,
        customerEmail: req.body.data.transaction.customer_email,
        currency: req.body.data.transaction.currency,
        paymentMethodType: req.body.data.transaction.payment_method_type,
        redirectUrl: req.body.data.transaction.redirect_url,
        status: req.body.data.transaction.status,
        event: req.body.event,
        environment: req.body.environment,
        timestamp: req.body.timestamp,
        sentAt: req.body.sent_at
    }


    const newTransaction = await API.graphql({
        query: createTransaction,
        variables: {
            input: params
        }
    });

      console.log(req.body)
      
     

      res.status(200).json(params);
    } else {
      return
    }
  }