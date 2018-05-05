import * as React from "react/cjs/react.development";

import './task-list-item.scss';

export class TaskListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isEdit: false,
    };
    this.destroy = this.destroy.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateText = this.updateText.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);

    this.onBlur = this.onBlur.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.item) {
      this.setState((state) => {
        state.value = this.props.item.title;
        return state;
      });
    }
  }


  updateText() {
    const task = Object.assign({}, this.props.item);
    task.title = this.state.value;
    this.props.onUpdate(task);
    console.log('texte updated');
    this.closeEdit();
  }

  toggleComplete() {
    const task = Object.assign({}, this.props.item);
    task.completed = !task.completed;
    this.props.onUpdate(task);
  }

  onInput() {
    const text = this.textInput.value;
    this.setState((state) => {
      state.value = text;
      return state;
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.updateText();
  }

  onBlur() {
    if (this.state.isEdit) {
      console.log('ONBLUR');
      this.updateText();
    }
  }

  destroy() {
    this.props.onDestroy(this.props.item.id)
  }

  closeEdit() {
    const nextState = !this.state.isEdit;
    this.setState((state) => {
      state.isEdit = nextState;

      return state;
    });
  }

  toggleEdit() {
    const nextState = !this.state.isEdit;
    if (nextState === true && this.textInput) {
      this.textInput.focus();
    }
    this.setState((state) => {
      state.isEdit = nextState;

      return state;
    });
  }

  render() {
    const { title, id, completed } = this.props.item;
    const classNames = `
      task-list-item 
      ${this.state.isEdit ? 'task-list-item_edit' : ''} 
      ${completed ? 'task-list-item_completed' : ''}
    `;
    return <li className={classNames}>
      <label className={'task-list-item'} htmlFor={id}>
        <input type="checkbox" id={id} checked={completed} onChange={this.toggleComplete}/>
      </label>
      <span onDoubleClick={this.toggleEdit} className="task-list-item__title">{title}</span>
      <form className="task-list-item__form" onSubmit={this.onSubmit}>
        <input type="text"
               ref={element => {
                 this.textInput = element;
               }}
               className="task-list-item__input"
               onInput={this.onInput}
               onBlur={this.onBlur}
               value={this.state.value}/>
      </form>
      <button onClick={this.destroy}>Del</button>
    </li>
  }
}
