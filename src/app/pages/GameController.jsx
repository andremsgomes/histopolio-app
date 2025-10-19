import React, { Component } from "react";

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

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class GameController extends Component {
  constructor(props) {
    super(props);

    this.client = new w3cwebsocket(process.env.REACT_APP_WS_URL);

    this.checkWebSocktetState = this.checkWebSocktetState.bind(this);
    this.handleDiceClick = this.handleDiceClick.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
    this.handleInfoShownReceived = this.handleInfoShownReceived.bind(this);
    this.handleStoreClick = this.handleStoreClick.bind(this);
    this.handleCloseStoreClick = this.handleCloseStoreClick.bind(this);
    this.handleBadgePurchased = this.handleBadgePurchased.bind(this);
    this.handleFinishTurnReceived = this.handleFinishTurnReceived.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleFinishClick = this.handleFinishClick.bind(this);
  }

  state = {
    save: "",
    adminId: "",
    gameStarted: false,
    playerTurn: false,
    showDice: false,
    rollTime: 0,
    diceRolled: false,
    question: null,
    tile: "",
    content: "",
    showContinue: false,
    storeOpen: false,
    finishTurn: false,
    continueInfo: "",
    bodyColor: "#f8f9fa",
    badges: [],
    points: 0,
    position: 0,
    rank: 0,
    userBadges: [],
  };

  componentDidMount() {
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");

      this.sendIdentificationMessage();
      this.loadBadges();
      this.sendRequestGameStatusMessage();
    };

    this.client.onmessage = (message) => {
      console.log(message.data);
      const dataReceived = JSON.parse(message.data);

      this.processDataReceived(dataReceived);
    };

    this.checkWebSocktetState();
  }

  async checkWebSocktetState() {
    setInterval(async () => {
      if (this.client.readyState !== this.client.OPEN) {
        this.client.close();
        this.client = new w3cwebsocket(process.env.REACT_APP_WS_URL);

        this.client.onopen = () => {
          console.log("WebSocket Client Connected");

          this.sendIdentificationMessage();
          this.loadBadges();
          this.sendRequestGameStatusMessage();
        };

        this.client.onmessage = (message) => {
          console.log(message.data);
          const dataReceived = JSON.parse(message.data);

          this.processDataReceived(dataReceived);
        };
      }
    }, 1000);
  }

  sendIdentificationMessage() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "identification",
      platform: "react",
      id: user.id,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  sendRequestGameStatusMessage() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "game status",
      userId: user.id,
      board: this.props.params.board,
      saveFile: this.state.save,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  loadBadges() {
    const dataToSend = {
      type: "load badges",
      board: this.props.params.board,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  sendToServer(message) {
    this.client.send(message);
  }

  processDataReceived(dataReceived) {
    const command = dataReceived["type"];

    switch (command) {
      case "game status":
        this.handleGameStatusReceived(dataReceived);
        break;
      case "badges":
        this.handleBadgesReceived(dataReceived);
        break;
      case "turn":
        this.handleTurnReceived();
        break;
      case "dice":
        this.handleDiceReceived();
        break;
      case "info shown":
        this.handleInfoShownReceived(dataReceived);
        break;
      case "question":
        this.handleQuestionReceived(dataReceived);
        break;
      case "update":
        this.handleUpdate(dataReceived);
        break;
      case "content":
        this.handleContentReceived(dataReceived);
        break;
      case "finish turn":
        this.handleFinishTurnReceived(dataReceived);
        break;
      default:
        console.log("Unknown message: " + dataReceived);
    }
  }

  handleGameStatusReceived(dataReceived) {
    if (
      dataReceived["board"] === this.props.params.board &&
      (this.state.save === "" || dataReceived["save"] === this.state.save)
    ) {
      this.setState({
        save: dataReceived["save"],
        gameStarted: dataReceived["gameStarted"],
      });

      if (dataReceived["playerData"]) {
        this.setState({
          points: dataReceived["playerData"]["points"],
          position: dataReceived["playerData"]["position"],
          rank: dataReceived["playerData"]["rank"],
          userBadges: dataReceived["playerData"]["badges"],
        });
      }

      if (this.state.gameStarted) {
        this.setState({
          adminId: dataReceived["adminId"],
        });
        this.sendJoinGameMessage();
      }
    }
  }

  handleBadgesReceived(dataReceived) {
    this.setState({
      badges: dataReceived["badges"],
    });
  }

  sendJoinGameMessage() {
    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "join game",
      board: this.props.params.board,
      userId: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleTurnReceived() {
    this.setState({
      playerTurn: true,
    });
  }

  handleDiceReceived() {
    this.setState({
      playerTurn: true,
      showDice: true,
    });
  }

  handleInfoShownReceived(dataReceived) {
    this.setState({
      playerTurn: true,
      showContinue: true,
      continueInfo: dataReceived["info"],
    });

    if (dataReceived["bodyColor"]) {
      this.setState({
        bodyColor: dataReceived["bodyColor"],
      });
    }

    this.hideDice();
  }

  hideDice() {
    this.setState({
      showDice: false,
      rollTime: 0,
      diceRolled: false,
    });
  }

  handleQuestionReceived(dataReceived) {
    this.setState({
      playerTurn: true,
      question: dataReceived["questionData"],
      tile: dataReceived["tile"],
    });

    this.hideDice();
  }

  handleUpdate(dataReceived) {
    this.setState({
      points: dataReceived["points"],
      position: dataReceived["position"],
      rank: dataReceived["rank"],
    });
  }

  handleContentReceived(dataReceived) {
    this.setState({
      playerTurn: true,
      content: dataReceived["content"],
    });

    this.hideDice();
  }

  handleFinishTurnReceived(dataReceived) {
    this.setState({
      playerTurn: true,
      finishTurn: true,
      continueInfo: dataReceived["info"],
    });

    if (dataReceived["bodyColor"]) {
      this.setState({
        bodyColor: dataReceived["bodyColor"],
      });
    }

    this.hideDice();
  }

  handleAnswer(answerIndex) {
    this.setState({ question: null });

    const answer = answerIndex + 1;

    const dataToSend = {
      type: "answer",
      answer: answer,
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleContentClick() {
    this.setState({ content: "" });

    const dataToSend = {
      type: "content viewed",
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  rollDoneCallback(num) {
    const dataToSend = {
      type: "dice result",
      result: num,
      rollTime: this.state.rollTime * 1000,
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleDiceClick() {
    if (!this.state.diceRolled) {
      const rollTime = Math.random() * 2 + 1;

      this.setState({
        rollTime: rollTime,
        diceRolled: true,
      });

      this.reactDice.rollAll();
    }
  }

  handleStoreClick() {
    this.setState({
      storeOpen: true,
    });

    document.body.style = "background: #f8f9fa;";
  }

  handleCloseStoreClick() {
    this.setState({
      storeOpen: false,
    });
  }

  handleBadgePurchased(badgeId, cost) {
    const newUserBadges = [...this.state.userBadges];
    newUserBadges.push(badgeId);
    const newPoints = this.state.points - cost;

    this.setState({
      points: newPoints,
      userBadges: newUserBadges,
    });

    const user = JSON.parse(sessionStorage.getItem("user"));

    const dataToSend = {
      type: "badge purchased",
      userId: user.id,
      board: this.props.params.board,
      save: this.state.save,
      badgeId: badgeId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleContinueClick() {
    this.setState({
      showContinue: false,
      continueInfo: "",
      bodyColor: "#f8f9fa",
    });

    document.body.style = "background: #f8f9fa;";

    const dataToSend = {
      type: "continue",
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleFinishClick() {
    this.setState({
      finishTurn: false,
      continueInfo: "",
      playerTurn: false,
      bodyColor: "#f8f9fa",
    });

    document.body.style = "background: #f8f9fa;";

    const dataToSend = {
      type: "next player",
      adminId: this.state.adminId,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  render() {
    const { t } = useTranslation(undefined, { keyPrefix: "game-controller" });

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
            <li className="breadcrumb-item">{this.props.params.board}</li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.state.save.length > 0 ? (
                <>{this.state.save}</>
              ) : (
                <>{t("breadcrumbs.new-game")}</>
              )}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        {this.state.gameStarted ? (
          <div>
            {this.state.playerTurn ? (
              <div>
                {this.state.showDice ? (
                  <div>
                    {this.state.storeOpen ? (
                      <Store
                        points={this.state.points}
                        badges={this.state.badges}
                        userBadges={this.state.userBadges}
                        onPurchaseClick={this.handleBadgePurchased}
                        onCloseClick={this.handleCloseStoreClick}
                      />
                    ) : (
                      <div className="text-center page-center">
                        <h2>{t("roll-dice")}</h2>
                        <div className="mt-4" onClick={this.handleDiceClick}>
                          <ReactDice
                            numDice={1}
                            faceColor="#ffF"
                            dotColor="#000000"
                            outline={true}
                            dieSize={200}
                            rollTime={this.state.rollTime}
                            rollDone={(num) => this.rollDoneCallback(num)}
                            disableIndividual={true}
                            ref={(dice) => (this.reactDice = dice)}
                          />
                        </div>
                        <div className="mt-4">
                          {this.state.rank !== 0 && (
                            <h4>
                              {t("rank", {
                                rank: this.state.rank,
                                suffix: getOrdinalSuffix(props.rank),
                              })}
                            </h4>
                          )}
                          <h5>
                            {t("score", {
                              count: this.state.points,
                            })}
                          </h5>
                        </div>
                        <button
                          className="btn btn-lg btn-primary mt-4"
                          onClick={this.handleStoreClick}
                          disabled={this.state.diceRolled}
                        >
                          {t("store-button")}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {this.state.question ? (
                      <PlayQuestion
                        tile={this.state.tile}
                        question={this.state.question}
                        onAnswerConfirm={this.handleAnswer}
                        rank={this.state.rank}
                        points={this.state.points}
                      />
                    ) : (
                      <div>
                        {this.state.content.length > 0 ? (
                          <Content
                            content={this.state.content}
                            onContentClick={this.handleContentClick}
                            points={this.state.points}
                            rank={this.state.rank}
                          />
                        ) : (
                          <div>
                            {this.state.finishTurn ? (
                              <div>
                                {this.state.storeOpen ? (
                                  <Store
                                    points={this.state.points}
                                    badges={this.state.badges}
                                    userBadges={this.state.userBadges}
                                    onPurchaseClick={this.handleBadgePurchased}
                                    onCloseClick={this.handleCloseStoreClick}
                                  />
                                ) : (
                                  <Continue
                                    bodyColor={this.state.bodyColor}
                                    info={this.state.continueInfo}
                                    onContinueClick={this.handleFinishClick}
                                    points={this.state.points}
                                    rank={this.state.rank}
                                    storeButton={true}
                                    onStoreClick={this.handleStoreClick}
                                  />
                                )}
                              </div>
                            ) : (
                              <div>
                                {this.state.showContinue ? (
                                  <Continue
                                    bodyColor={this.state.bodyColor}
                                    info={this.state.continueInfo}
                                    onContinueClick={this.handleContinueClick}
                                    points={this.state.points}
                                    rank={this.state.rank}
                                    storeButton={false}
                                    onStoreClick={this.handleStoreClick}
                                  />
                                ) : (
                                  <Wait
                                    title="Espera pelo fim da jogada!"
                                    points={this.state.points}
                                    rank={this.state.rank}
                                    storeButton={false}
                                    onStoreClick={this.handleStoreClick}
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
                {this.state.storeOpen ? (
                  <Store
                    points={this.state.points}
                    badges={this.state.badges}
                    userBadges={this.state.userBadges}
                    onPurchaseClick={this.handleBadgePurchased}
                    onCloseClick={this.handleCloseStoreClick}
                  />
                ) : (
                  <Wait
                    title="Espera pela tua vez!"
                    points={this.state.points}
                    rank={this.state.rank}
                    storeButton={true}
                    onStoreClick={this.handleStoreClick}
                  />
                )}
              </div>
            )}
          </div>
        ) : (
          <div>
            {this.state.storeOpen ? (
              <Store
                points={this.state.points}
                badges={this.state.badges}
                userBadges={this.state.userBadges}
                onPurchaseClick={this.handleBadgePurchased}
                onCloseClick={this.handleCloseStoreClick}
              />
            ) : (
              <Wait
                title="Espera pelo início do jogo!"
                points={this.state.points}
                rank={this.state.rank}
                storeButton={true}
                onStoreClick={this.handleStoreClick}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withParams(GameController);
