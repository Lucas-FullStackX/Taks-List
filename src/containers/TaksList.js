import React, { Component } from "react";

const Edit = ({ tak, editTak }) => {
  const { id, text, completed } = tak;
  const [state, setState] = React.useState({ text: "", edit: false });
  return (
    <>
      {state.edit ? (
        <input
          className="edit"
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
      <button
        onClick={() => {
          setState({ ...state, edit: !state.edit });
        }}
        className="destroy"
        data-test-id="edit"
      />
    </>
  );
};
export default function TaksList({ props }) {
  console.log(props.withTaks);
  console.log(props);
  return <div>Taks</div>;
}
/* class TaksList extends Component {
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
                <button
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
} */
