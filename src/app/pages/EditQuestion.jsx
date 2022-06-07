import React, { Component } from "react";

import api from "../api";
import { useParams } from "react-router-dom";
import Question from "../components/Question";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditQuestion extends Component {
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

  componentDidMount() {
    api
      .question(this.props.params.id)
      .then((res) => {
        this.setState({
          question: res.data.question,
          correctAnswer: res.data.correctAnswer,
        });

        if (res.data.image) {
          this.setState({
            image: res.data.image,
          });
        }

        const answers = this.state.answers;
        for (let i = 0; i < res.data.answers.length; i++) {
          answers[i] = res.data.answers[i];
        }

        this.setState({
          answers: answers,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

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

    const id = this.props.params.id;
    const question = this.state.question;
    const image = this.state.image;
    let answers = [];
    const correctAnswer = this.state.correctAnswer;

    this.state.answers.forEach((answer) => {
      if (answer.length > 0) answers.push(answer);
    });

    const payload = {
      id,
      question,
      image,
      answers,
      correctAnswer,
    };

    api
      .updateQuestion(payload)
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
        onSelectChange={this.handleSelectChange}
        onClick={this.handleClick}
      />
    );
  }
}

export default withParams(EditQuestion);
