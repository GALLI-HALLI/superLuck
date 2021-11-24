import React, { useState, useEffect, memo } from "react";
import "@egjs/react-flicking/dist/flicking.css";
import Flicking from "@egjs/react-flicking";
import io from "socket.io-client";
import MemberList from "../components/RoomPage/MemberList";
import styles from "./RoomPage.module.scss";
import Button from "../components/common/Button";
import { useSelector } from "../hooks/typeReduxHook";
import { useParams, useHistory } from "react-router-dom";
import { setMetaData } from "../store/room/room.action";
import { useDispatch } from "react-redux";
import { TMetadata } from "../types/api";
import { GameStatus, GameType } from "../constants/game";
import { SocketServerEvent } from "../constants/socket";
import BombGame from "../components/GamePage/BombGame";
import GameList from "../components/RoomPage/GameList";

const GameMap = {
  [GameType.None]: () => (
    <div>
      서버에서 문제가 발생했습니다. 게임을 지정하지 않고 게임을 시작할수
      없습니다.
    </div>
  ),
  [GameType.Bomb]: BombGame,
};

const RoomPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [socket] = useState(() => io("/api/room"));
  const history = useHistory();
  const metadata = useSelector((state) => state.room.metadata);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      socket.emit("enter", roomId, token);
      socket.on("metadata", (data: TMetadata) => {
        dispatch(setMetaData({ data }));
      });
      socket.on(SocketServerEvent.GameAlreadyStarted, () => {
        alert("이미 진행중이라고~~~");
        socket.disconnect();
        history.push("/lobby");
      });
    }
  }, [socket, dispatch, roomId, history]);

  console.log(metadata);

  const joinGame = (type: GameType) => {
    if (type === GameType.None) {
      return;
    }
    socket.emit("gameStart", type);
  };

  if (!metadata) {
    return <div>로딩중 입니다.</div>;
  }

  if (metadata.gameStatus === GameStatus.Started) {
    console.log("what?");
    const GameComponent = GameMap[metadata.type];
    return <GameComponent socket={socket} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <Button>뒤로가기</Button>
        <label className={styles.masterName}>방장 아이디: {metadata.id}</label>
      </div>
      <Flicking className={styles.roomPageContainer}>
        <div style={{ width: "360px", height: "540px" }}>
          <MemberList roomId={roomId} players={metadata.players} />
        </div>
        <div style={{ width: "360px", height: "540px" }}>
          <GameList onClickGame={joinGame} />
        </div>
      </Flicking>
    </div>
  );
};

export default RoomPage;
