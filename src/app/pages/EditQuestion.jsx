import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import EditAndLogout from "../components/EditAndLogout";
import QuestionForm from "../components/QuestionForm";
import { useTranslation } from "react-i18next";

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
    image: null,
    preview: "",
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
            preview: res.data.image,
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

  handleImageChange(files) {
    const image = files[0];
    this.setState({ image, preview: URL.createObjectURL(image) });
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

  async handleClick() {
    // TODO: validar tudo
    const id = this.props.params.id;
    const question = this.state.question;
    const image = this.state.image;
    let answers = [];
    const correctAnswer = this.state.correctAnswer;

    this.state.answers.forEach((answer) => {
      if (answer.length > 0) answers.push(answer);
    });

    const payload = new FormData();

    if (image) {
      const response = await fetch(this.state.preview, { mode: "no-cors" });
      const blob = await response.blob();
      payload.append("image", blob, image.name);
    } else {
      payload.append("image", "no-change");
    }

    payload.append("id", id);
    payload.append("question", question);
    payload.append("answers", JSON.stringify(answers));
    payload.append("correctAnswer", correctAnswer);

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
    const { t } = useTranslation(undefined, { keyPrefix: "edit-question" });

    return (
      <div>
        <nav
          aria-label="breadcrumb"
          className="navbar navbar-light bg-white px-4"
        >
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item" aria-current="page">
              <Link to="/admin" className="text-decoration-none">
                {t("breadcrumbs.menu")}
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
                {t("breadcrumbs.edit")}
              </Link>
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {t("breadcrumbs.tile", {
                tile: this.props.params.tile,
              })}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              <Link
                to={`/admin/${this.props.params.board}/${this.props.params.tile}/questions`}
                className="text-decoration-none"
              >
                {t("breadcrumbs.questions")}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("breadcrumbs.edit-question")}
            </li>
          </ol>
          <div>
            <EditAndLogout />
          </div>
        </nav>
        <div className="text-center mt-5">
          <h1>
            {t("tile", {
              board: this.props.params.board,
              tile: this.props.params.tile,
            })}
          </h1>
          <div className="card my-5 mx-md-5 py-2 px-0">
            <div className="card-body px-0">
              <h3 className="card-title">{t("subtitle")}</h3>
              <QuestionForm
                onQuestionChange={this.handleQuestionChange}
                question={this.state.question}
                onImageChange={this.handleImageChange}
                preview={this.state.preview}
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

export default withParams(EditQuestion);
