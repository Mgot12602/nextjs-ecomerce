import React, { useEffect, useState } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlApi } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame/HeaderGame";
import { Loader } from "semantic-ui-react";
import TabsGame from "../components/Game/TabsGame";

export default function Game() {
  const { query } = useRouter();
  const [game, setGame] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getGameByUrlApi(query.game);
      console.log("response de game", response);
      setGame(response);
    })();
  }, [query]);

  if (!game) return <Loader active />;

  return (
    <BasicLayout className="game">
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}