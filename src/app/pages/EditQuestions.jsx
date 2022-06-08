import React, { Component } from "react";

import api from "../api";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class EditQuestions extends Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  state = {
    questions: [],
  };

  componentDidMount() {
    api
      .questions(this.props.params.board, this.props.params.tile)
      .then((res) => {
        this.setState({
          questions: res.data,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  handleDelete(id) {
    const payload = { id };

    api.deleteQuestion(payload).then(() => {
      const newQuestions = this.state.questions.filter((question) => {
        return question._id !== id;
      });

      this.setState({
        questions: newQuestions,
      });
    });
  }

  render() {
    return (
      <div className="text-center mt-4">
        <h1>
          {this.props.params.board} - Casa {this.props.params.tile}
        </h1>
        <h4>Tabela de perguntas</h4>
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Pergunta</th>
              <th scope="col">Opção Correta</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.questions.map((question, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{question.question}</td>
                  <td>{question.answers[question.correctAnswer - 1]}</td>
                  <td>
                    <Link
                      to={`/admin/${this.props.params.board}/${this.props.params.tile}/question/${question._id}/edit`}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="#"
                      className="text-danger"
                      onClick={() => this.handleDelete(question._id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link
          to={
            "/admin/" +
            this.props.params.board +
            "/" +
            this.props.params.tile +
            "/questions/new"
          }
          style={{ textDecoration: "none" }}
        >
          <button className="btn btn-lg btn-primary my-4">
            Adicionar pergunta
          </button>
        </Link>
      </div>
    );
  }
}

export default withParams(EditQuestions);
