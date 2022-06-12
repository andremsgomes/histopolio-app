import React, { Component } from "react";

import { w3cwebsocket } from "websocket";
import ReactDice from "react-dice-complete";
import { Link, useParams, useSearchParams } from "react-router-dom";
import "react-dice-complete/dist/react-dice-complete.css";

import Wait from "../components/Wait";
import PlayQuestion from "../components/PlayQuestion";
import Store from "../components/Store";
import Content from "../components/Content";
import Continue from "../components/Continue";

function withParams(Component) {
  return (props) => (
    <Component
      {...props}
      params={useParams()}
      save={useSearchParams()[0].get("save")}
    />
  );
}

class Play extends Component {
  constructor(props) {
    super(props);

    this.client = new w3cwebsocket(process.env.REACT_APP_WS_URL);

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
    gameStarted: false,
    playerTurn: false,
    showDice: false,
    rollTime: 0,
    diceRolled: false,
    question: null,
    content: "",
    cardInfo: false,
    storeOpen: false,
    finishTurn: false,
    finishTurnInfo: "",
    badges: [],
    points: 0,
    position: 0,
    rank: 0,
    userBadges: [],
  };

  componentDidMount() {
    if (this.props.save) {
      this.setState({
        save: this.props.save,
      });
    }

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
        this.handleInfoShownReceived();
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

  handleInfoShownReceived() {
    this.setState({
      playerTurn: true,
      cardInfo: true,
    });

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
      finishTurnInfo: dataReceived["info"],
    });

    this.hideDice();
  }

  handleAnswer(answerIndex) {
    this.setState({ question: null });

    const answer = answerIndex + 1;

    const dataToSend = {
      type: "answer",
      answer: answer,
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleContentClick() {
    this.setState({ content: "" });

    const dataToSend = {
      type: "content viewed",
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  rollDoneCallback(num) {
    const dataToSend = {
      type: "dice result",
      result: num,
      rollTime: this.state.rollTime * 1000,
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
      cardInfo: false,
    });

    const dataToSend = {
      type: "continue",
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  handleFinishClick() {
    this.setState({
      finishTurn: false,
      finishTurnInfo: "",
      playerTurn: false,
    });

    const dataToSend = {
      type: "next player",
    };

    this.sendToServer(JSON.stringify(dataToSend));
  }

  render() {
    return (
      <div>
        <nav aria-label="breadcrumb" className="m-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Menu</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/${this.props.params.board}/saves`}>
                {this.props.params.board}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.state.save.length > 0 ? (
                <>{this.state.save}</>
              ) : (
                <>Novo jogo</>
              )}
            </li>
          </ol>
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
                        <h2>Lança o dado!</h2>
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
                            <h4>Estás em {this.state.rank}º lugar</h4>
                          )}
                          <h5>
                            Tens {this.state.points} ponto
                            {this.state.points !== 1 && "s"}
                          </h5>
                        </div>
                        <button
                          className="btn btn-lg btn-primary mt-4"
                          onClick={this.handleStoreClick}
                          disabled={this.state.diceRolled}
                        >
                          Comprar troféus
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {this.state.question ? (
                      <PlayQuestion
                        question={this.state.question}
                        onAnswerClick={this.handleAnswer}
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
                                    info={this.state.finishTurnInfo}
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
                                {this.state.cardInfo ? (
                                  <Continue
                                    info={this.state.finishTurnInfo}
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

export default withParams(Play);
