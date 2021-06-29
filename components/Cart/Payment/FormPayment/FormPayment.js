import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../api/cart";

export default function FormPayment({ products, address }) {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { auth, logout } = useAuth();
  const { removeAllProductsCart } = useCart();
  const router = useRouter();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      console.log("resultado acuerdo cobro", result);
      const response = await paymentCartApi(
        result.token,
        products,
        auth.idUser,
        address,
        logout
      );
      if (size(response) > 0) {
        console.log("final response", response);
        toast.success("Pedido completado");
        removeAllProductsCart();
        router.push("/orders");
      } else {
        toast.error("Error al realizar el pedido");
      }
    }
    setLoading(false);
  };

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" loading={loading} disabled={!stripe}>
        Pagar
      </Button>
    </form>
  );
}
