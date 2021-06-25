import React from "react";
import ReactPlayer from "react-player/lazy";
import CarouselScreenShots from "../CarouselScreenShots";
import moment from "moment";
import "moment/locale/es";

export default function InfoGame({ game }) {
  console.log("game", game);
  return (
    <div className="info-game">
      <ReactPlayer
        className="info-game__video"
        url={game.video}
        controls={true}
      />
      <CarouselScreenShots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento:</h4>
          <p>{moment(game.relaseDate).format("LL")}</p>
        </div>
      </div>
    </div>
  );
}
