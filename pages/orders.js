import React, { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";
import Seo from "../components/Seo";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  console.log("response in orders", orders);

  useEffect(() => {
    (async () => {
      const response = await getOrdersApi(auth.idUser, logout);
      setOrders(response || []);
    })();
  }, []);

  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Listado de todos tus pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ textAlign: "center" }}>
              Todavia no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

function OrderList({ orders }) {
  console.log(orders);
  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={6} computer={8} key={order.id}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
}
