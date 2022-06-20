import React, { Component } from "react";

import api from "../api";
import EditAndLogout from "../components/EditAndLogout";

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
    api.deleteQuestion(id).then(() => {
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
            <li className="breadcrumb-item active" aria-current="page">
              Perguntas
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
              <h3 className="card-title">Perguntas</h3>
              <div className="table-responsive mt-3">
                <table className="table table-hover">
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
                          <td>
                            {question.answers[question.correctAnswer - 1]}
                          </td>
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
              </div>
              <Link
                to={
                  "/admin/" +
                  this.props.params.board +
                  "/" +
                  this.props.params.tile +
                  "/questions/new"
                }
                className="text-decoration-none"
              >
                <button className="btn btn-lg btn-primary mt-3">
                  Adicionar pergunta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(EditQuestions);
