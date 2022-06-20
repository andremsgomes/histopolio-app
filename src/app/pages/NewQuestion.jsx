import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import EditAndLogout from "../components/EditAndLogout";

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
      <div>
        <nav
          aria-label="breadcrumb"
          className="navbar navbar-light bg-white px-4"
        >
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/admin" className="text-decoration-none">
                Menu
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}`}
                className="text-decoration-none"
              >
                {this.props.params.board}
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/edit`}
                className="text-decoration-none"
              >
                Editar
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              Casa {this.props.params.tile}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/${this.props.params.tile}/questions`}
                className="text-decoration-none"
              >
                Perguntas
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Nova pergunta
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {this.props.params.board} - Casa {this.props.params.tile}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">Nova pergunta</h3>
              <QuestionForm
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(NewQuestion);
