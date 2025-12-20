import React, { useState, useEffect } from "react";

import { w3cwebsocket } from "websocket";
import ReactDice from "react-dice-complete";
import { Link, useParams } from "react-router-dom";
import "react-dice-complete/dist/react-dice-complete.css";
import { useTranslation } from "react-i18next";

import Wait from "../components/Wait";
import PlayQuestion from "../components/PlayQuestion";
import Store from "../components/Store";
import Content from "../components/Content";
import Continue from "../components/Continue";
import EditAndLogout from "../components/EditAndLogout";
import { getOrdinalSuffix } from "../utils/ranking";

function GameController() {
  const { t } = useTranslation(undefined, { keyPrefix: "game-controller" });
  const { board } = useParams();

  const [save, setSave] = useState("");
  const [adminId, setAdminId] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [playerTurn, setPlayerTurn] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [rollTime, setRollTime] = useState(0);
  const [diceRolled, setDiceRolled] = useState(false);
  const [question, setQuestion] = useState(null);
  const [tile, setTile] = useState("");
  const [content, setContent] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const [finishTurn, setFinishTurn] = useState(false);
  const [continueInfo, setContinueInfo] = useState(false);
  const [bodyColor, setBodyColor] = useState("#f8f9fa");
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const [position, setPosition] = useState(0);
  const [rank, setRank] = useState(0);
  const [userBadges, setUserBadges] = useState([]);

  let client = new w3cwebsocket(process.env.REACT_APP_WS_URL);

  const sendToServer = (message) => {
    client.send(message);
  };

  const sendIdentificationMessage = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "identification",
      platform: "react",
      id: user.id,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const loadBadges = () => {
    const dataToSend = {
      type: "load badges",
      board,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const sendRequestGameStatusMessage = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "game status",
      userId: user.id,
      board,
      saveFile: save,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const sendJoinGameMessage = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "join game",
      board,
      userId: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const handleGameStatusReceived = (dataReceived) => {
    if (
      dataReceived["board"] === board &&
      (save === "" || dataReceived["save"] === save)
    ) {
      setSave(dataReceived["save"]);
      setGameStarted(dataReceived["gameStarted"]);

      if (dataReceived["playerData"]) {
        setPoints(dataReceived["playerData"]["points"]);
        setPosition(dataReceived["playerData"]["position"]);
        setRank(dataReceived["playerData"]["rank"]);
        setUserBadges(dataReceived["playerData"]["badges"]);
      }

      if (gameStarted) {
        setAdminId(dataReceived["adminId"]);
        sendJoinGameMessage();
      }
    }
  };

  const handleBadgesReceived = (dataReceived) => {
    setBadges(dataReceived["badges"]);
  };

  const handleTurnReceived = () => {
    setPlayerTurn(true);
  };

  const handleDiceReceived = () => {
    setPlayerTurn(true);
    setShowDice(true);
  };

  const hideDice = () => {
    setShowDice(false);
    setRollTime(0);
    setDiceRolled(false);
  };

  const handleInfoShownReceived = (dataReceived) => {
    setPlayerTurn(true);
    setShowContinue(true);
    setContinueInfo(dataReceived["info"]);

    if (dataReceived["bodyColor"]) {
      setBodyColor(dataReceived["bodyColor"]);
    }

    hideDice();
  };

  const handleQuestionReceived = (dataReceived) => {
    setPlayerTurn(true);
    setQuestion(dataReceived["questionData"]);
    setTile(dataReceived["tile"]);

    hideDice();
  };

  const handleUpdate = (dataReceived) => {
    setPoints(dataReceived["points"]);
    setPosition(dataReceived["position"]);
    setRank(dataReceived["rank"]);
  };

  const handleContentReceived = (dataReceived) => {
    setPlayerTurn(true);
    setContent(dataReceived["content"]);

    hideDice();
  };

  const handleFinishTurnReceived = (dataReceived) => {
    setPlayerTurn(true);
    setFinishTurn(true);
    setContinueInfo(dataReceived["info"]);

    if (dataReceived["bodyColor"]) {
      setBodyColor(dataReceived["bodyColor"]);
    }

    hideDice();
  };

  useEffect(() => {
    const processDataReceived = (dataReceived) => {
      const command = dataReceived["type"];

      switch (command) {
        case "game status":
          handleGameStatusReceived(dataReceived);
          return;
        case "badges":
          handleBadgesReceived(dataReceived);
          return;
        case "turn":
          handleTurnReceived();
          return;
        case "dice":
          handleDiceReceived();
          return;
        case "info shown":
          handleInfoShownReceived(dataReceived);
          return;
        case "question":
          handleQuestionReceived(dataReceived);
          return;
        case "update":
          handleUpdate(dataReceived);
          return;
        case "content":
          handleContentReceived(dataReceived);
          return;
        case "finish turn":
          handleFinishTurnReceived(dataReceived);
          return;
        default:
          console.log("Unknown message: " + dataReceived);
      }
    };

    const checkWebSocktetState = async () => {
      setInterval(async () => {
        if (client.readyState !== client.OPEN) {
          client.close();
          client = new w3cwebsocket(process.env.REACT_APP_WS_URL);

          client.onopen = () => {
            console.log("WebSocket Client Connected");

            sendIdentificationMessage();
            loadBadges();
            sendRequestGameStatusMessage();
          };

          client.onmessage = (message) => {
            console.log(message.data);
            const dataReceived = JSON.parse(message.data);

            processDataReceived(dataReceived);
          };
        }
      }, 1000);
    };

    client.onopen = () => {
      console.log("WebSocket Client Connected");

      sendIdentificationMessage();
      loadBadges();
      sendRequestGameStatusMessage();
    };

    client.onmessage = (message) => {
      console.log(message.data);
      const dataReceived = JSON.parse(message.data);

      processDataReceived(dataReceived);
    };

    checkWebSocktetState();
  }, [
    client,
    sendIdentificationMessage,
    loadBadges,
    sendRequestGameStatusMessage,
  ]);

  const handleAnswer = (answerIndex) => {
    setQuestion(null);

    const answer = answerIndex + 1;

    const dataToSend = {
      type: "answer",
      answer: answer,
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const handleContentClick = () => {
    setContent("");

    const dataToSend = {
      type: "content viewed",
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const rollDoneCallback = (num) => {
    const dataToSend = {
      type: "dice result",
      result: num,
      rollTime: rollTime * 1000,
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const handleDiceClick = () => {
    if (!diceRolled) {
      const newRollTime = Math.random() * 2 + 1;

      setRollTime(newRollTime);
      setDiceRolled(true);

      this.reactDice.rollAll();
    }
  };

  const handleStoreClick = () => {
    setStoreOpen(true);

    document.body.style = "background: #f8f9fa;";
  };

  const handleCloseStoreClick = () => {
    setStoreOpen(false);
  };

  const handleBadgePurchased = (badgeId, cost) => {
    const newUserBadges = [...userBadges];
    newUserBadges.push(badgeId);
    const newPoints = points - cost;

    setPoints(newPoints);
    setUserBadges(newUserBadges);

    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "badge purchased",
      userId: user.id,
      board,
      save,
      badgeId: badgeId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const handleContinueClick = () => {
    setShowContinue(false);
    setContinueInfo("");
    setBodyColor("#f8f9fa");

    document.body.style = "background: #f8f9fa;";

    const dataToSend = {
      type: "continue",
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  const handleFinishClick = () => {
    setFinishTurn(false);
    setContinueInfo("");
    setPlayerTurn(false);
    setBodyColor("#f8f9fa");

    document.body.style = "background: #f8f9fa;";

    const dataToSend = {
      type: "next player",
      adminId,
    };

    sendToServer(JSON.stringify(dataToSend));
  };

  return (
    <div>
      <nav
        aria-label="breadcrumb"
        className="navbar navbar-light bg-white px-4"
      >
        <ol className="breadcrumb m-0">
          <li className="breadcrumb-item" aria-current="page">
            <Link to="/" className="text-decoration-none">
              {t("breadcrumbs.menu")}
            </Link>
          </li>
          <li className="breadcrumb-item">{board}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {save.length > 0 ? <>{save}</> : <>{t("breadcrumbs.new-game")}</>}
          </li>
        </ol>
        <div>
          <EditAndLogout />
        </div>
      </nav>
      {gameStarted ? (
        <div>
          {playerTurn ? (
            <div>
              {showDice ? (
                <div>
                  {storeOpen ? (
                    <Store
                      points={points}
                      badges={badges}
                      userBadges={userBadges}
                      onPurchaseClick={handleBadgePurchased}
                      onCloseClick={handleCloseStoreClick}
                    />
                  ) : (
                    <div className="text-center page-center">
                      <h2>{t("roll-dice")}</h2>
                      <div className="mt-4" onClick={handleDiceClick}>
                        <ReactDice
                          numDice={1}
                          faceColor="#ffF"
                          dotColor="#000000"
                          outline={true}
                          dieSize={200}
                          rollTime={rollTime}
                          rollDone={(num) => rollDoneCallback(num)}
                          disableIndividual={true}
                          ref={(dice) => (this.reactDice = dice)}
                        />
                      </div>
                      <div className="mt-4">
                        {rank !== 0 && (
                          <h4>
                            {t("rank", {
                              rank,
                              suffix: getOrdinalSuffix(rank),
                            })}
                          </h4>
                        )}
                        <h5>
                          {t("score", {
                            count: points,
                          })}
                        </h5>
                      </div>
                      <button
                        className="btn btn-lg btn-primary mt-4"
                        onClick={handleStoreClick}
                        disabled={diceRolled}
                      >
                        {t("store-button")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {question ? (
                    <PlayQuestion
                      tile={tile}
                      question={question}
                      onAnswerConfirm={handleAnswer}
                      rank={rank}
                      points={points}
                    />
                  ) : (
                    <div>
                      {content.length > 0 ? (
                        <Content
                          content={content}
                          onContentClick={handleContentClick}
                          points={points}
                          rank={rank}
                        />
                      ) : (
                        <div>
                          {finishTurn ? (
                            <div>
                              {storeOpen ? (
                                <Store
                                  points={points}
                                  badges={badges}
                                  userBadges={userBadges}
                                  onPurchaseClick={handleBadgePurchased}
                                  onCloseClick={handleCloseStoreClick}
                                />
                              ) : (
                                <Continue
                                  bodyColor={bodyColor}
                                  info={continueInfo}
                                  onContinueClick={handleFinishClick}
                                  points={points}
                                  rank={rank}
                                  storeButton={true}
                                  onStoreClick={handleStoreClick}
                                />
                              )}
                            </div>
                          ) : (
                            <div>
                              {showContinue ? (
                                <Continue
                                  bodyColor={bodyColor}
                                  info={continueInfo}
                                  onContinueClick={handleContinueClick}
                                  points={points}
                                  rank={rank}
                                  storeButton={false}
                                  onStoreClick={handleStoreClick}
                                />
                              ) : (
                                <Wait
                                  title={t("wait.end-turn")}
                                  points={points}
                                  rank={rank}
                                  storeButton={false}
                                  onStoreClick={handleStoreClick}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {storeOpen ? (
                <Store
                  points={points}
                  badges={badges}
                  userBadges={userBadges}
                  onPurchaseClick={handleBadgePurchased}
                  onCloseClick={handleCloseStoreClick}
                />
              ) : (
                <Wait
                  title={t("wait.your-turn")}
                  points={points}
                  rank={rank}
                  storeButton={true}
                  onStoreClick={handleStoreClick}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {storeOpen ? (
            <Store
              points={points}
              badges={badges}
              userBadges={userBadges}
              onPurchaseClick={handleBadgePurchased}
              onCloseClick={handleCloseStoreClick}
            />
          ) : (
            <Wait
              title={t("wait.start-game")}
              points={points}
              rank={rank}
              storeButton={true}
              onStoreClick={handleStoreClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default GameController;
