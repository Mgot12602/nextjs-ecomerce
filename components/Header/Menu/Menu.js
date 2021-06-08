import { Container, Menu, Grid, Icon, Label, Divider } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import { useState, useEffect } from "react";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(undefined);
  const [titleModal, setTitleModal] = useState("Inicia sessión");
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      console.log("response from Menujs", response);
      setUser(response);
    })();
  }, [auth]);

  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlataformas />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <h2>Contenido de modal</h2>
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlataformas() {
  return (
    <Menu>
      <Link href="/play-station">
        <Menu.Item as="a">PlayStation</Menu.Item>
      </Link>
      <Link href="/xbox">
        <Menu.Item as="a">Xbox</Menu.Item>
      </Link>
      <Link href="/switch">
        <Menu.Item as="a">Switch</Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions({ onShowModal, user, logout }) {
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
          </Link>
          <Link href="/whishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Whishlist
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              Mi carrito
            </Menu.Item>
          </Link>

          <Menu.Item onClick={logout}>
            <Icon name="power off" />
            Cerrar sessión
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
