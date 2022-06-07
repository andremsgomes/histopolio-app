import React, { Component } from "react";

import api from "../api";
import { useParams } from "react-router-dom";
import Question from "../components/Question";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    question: "",
    image: "",
    answers: ["", "", "", "", "", "", "", "", "", ""],
    correctAnswer: 1,
  };

  handleQuestionChange(e) {
    this.setState({
      question: e.target.value,
    });
  }

  handleImageChange(e) {
    // TODO: importar imagens do computador
    this.setState({
      image: e.target.value,
    });
  }

  handleAnswerChange(e, i) {
    let newAnswers = [...this.state.answers];
    newAnswers[i] = e.target.value;

    this.setState({
      answers: newAnswers,
    });
  }

  handleSelectChange(e) {
    this.setState({
      correctAnswer: parseInt(e.target.value),
    });
  }

  handleClick() {
    // TODO: validar tudo

    const boardName = this.props.params.board;
    const boardPosition = parseInt(this.props.params.tile);
    const question = this.state.question;
    const image = this.state.image;
    let answers = [];
    const correctAnswer = this.state.correctAnswer;

    this.state.answers.forEach((answer) => {
      if (answer.length > 0) answers.push(answer);
    });

    const payload = {
      boardName,
      boardPosition,
      question,
      image,
      answers,
      correctAnswer,
    };

    api
      .newQuestion(payload)
      .then(() => {
        window.location.href = `/admin/${this.props.params.board}/${this.props.params.tile}/questions`;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <Question
        onQuestionChange={this.handleQuestionChange}
        question={this.state.question}
        onImageChange={this.handleImageChange}
        image={this.state.image}
        answers={this.state.answers}
        onAnswerChange={this.handleAnswerChange}
        correctAnswer={this.state.correctAnswer}
        onSelectChange={this.handleSelectChange}
        onClick={this.handleClick}
      />
    );
  }
}

export default withParams(NewQuestion);
