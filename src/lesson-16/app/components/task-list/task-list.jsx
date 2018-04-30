import * as React from "react/cjs/react.development";
import { AjaxService } from "../../ajax-service";

export class TaskList extends React.Component {
  constructor() {
    super();
    this.ajaxService = new AjaxService('http://localhost:4001/list');
    this.state = {
      tasks: [],
      inputText: ''
    };
    this.inputUpdated = this.inputUpdated.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    this.ajaxService.get().then((tasks) => {
      this.setState((state) => {
        state.tasks = tasks;
        return state;
      })
    });
  }

  inputUpdated(eventObject) {
    const inputText = eventObject.currentTarget.value;
    this.setState((state) => {
      state.inputText = inputText;
      return state;
    });
  }

  addTask(eventObject) {
    eventObject.preventDefault();
    const requestBody = {
      title: this.state.inputText
    };

    this.ajaxService.post(requestBody).then((task) => {
      this.setState((state) => {
        state.tasks.push(task);
        return state;
      })
    });
  }

  render() {
    const elements = this.state.tasks.map((task, i) => <li key={i} className="task-list__item">{task.title}</li>);

    return <div className="task-list">
      <header className="task-list__header">
        <form onSubmit={this.addTask}>
          <input type="text" value={this.state.inputText} onChange={this.inputUpdated}/>
          <button>Add</button>
        </form>
      </header>
      <ul className="task-list__content">
        {elements}
      </ul>
    </div>
  }
}