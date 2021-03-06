import React, { Component } from "react";
import compose from "lodash/flowRight";
import { TiDelete } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { EightBaseAppProvider } from "@8base/app-provider";
import * as taks from "./server/actions";
import "./App.css";
const ENDPOINT_URL = "https://api.8base.com/ckt1npfed019r09l94czm79lq";

export class Header extends Component {
  state = { text: "" };
  render() {
    const { createTak } = this.props;
    return (
      <header className="header">
        <h1>TAKS LIST</h1>
        <input
          className="newTak"
          onChange={({ target }) =>
            this.setState(({ text }) => ({ text: target.value }))
          }
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              createTak({ text: this.state.text });
              this.setState({ text: "" });
            }
          }}
          value={this.state.text}
          placeholder="Create new Tak"
        />
      </header>
    );
  }
}

Header = taks.withCreateTak(Header);

const Edit = ({ tak, editTak }) => {
  const { id, text, completed } = tak;
  const [state, setState] = React.useState({ text: "", edit: false });
  return (
    <>
      {state.edit ? (
        <input
          className="edit"
          data-test-id="inputEdit"
          onChange={({ target }) => {
            setState(() => ({ ...state, text: target.value }));
            console.log(state);
          }}
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              console.log({ id, text: state.text, completed });
              editTak({ id, text: state.text, completed });
              setState({ ...state, edit: !state.edit });
            }
          }}
          defaultValue={text}
        />
      ) : (
        <label data-test-id="text">{text}</label>
      )}
      <MdEdit
        onClick={() => {
          setState({ ...state, edit: !state.edit });
        }}
        className="editBtn"
        data-test-id="edit"
      />
    </>
  );
};
export class Main extends Component {
  render() {
    const { taks, takUpdate, removeTak } = this.props;
    return taks && taks.length ? (
      <section className="main">
        <ul className="tak-list">
          {taks.map((tak) => (
            <li
              key={tak.id}
              className={tak.completed ? "completed" : undefined}
            >
              <div className="view">
                <input
                  data-test-id="completed"
                  className="toggle"
                  onChange={() =>
                    takUpdate({
                      id: tak.id,
                      completed: !tak.completed,
                      text: tak.text,
                    })
                  }
                  checked={tak.completed}
                  type="checkbox"
                />
                <Edit tak={tak} editTak={takUpdate} />
                <TiDelete
                  onClick={() => removeTak(tak.id)}
                  className="destroy"
                  data-test-id="delete"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    ) : null;
  }
}
Main = compose(
  taks.withTaks,
  taks.withToggleTak,
  taks.withToggleAllTaks,
  taks.withRemoveTak
)(Main);

class App extends Component {
  render() {
    return (
      <EightBaseAppProvider uri={ENDPOINT_URL}>
        {({ loading }) =>
          loading ? (
            <div>"Loading..."</div>
          ) : (
            <div className="taksApp">
              <Header />
              <Main />
            </div>
          )
        }
      </EightBaseAppProvider>
    );
  }
}

export default App;
