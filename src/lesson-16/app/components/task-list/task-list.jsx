import * as React from 'react/cjs/react.development';
import { AjaxService } from '../../ajax-service';
import { TaskListItem } from './task-list-item.jsx';

const FILTERS = {
  ALL: {
    type: 'ALL',
    value: 'All tasks'
  },
  COMPLETED: {
    type: 'COMPLETED',
    value: 'Completed tasks'
  },
  ACTIVE: {
    type: 'ACTIVE',
    value: 'Active tasks'
  }
};

export class TaskList extends React.Component {
  constructor() {
    super();
    this.ajaxService = new AjaxService('http://localhost:4001/list');
    this.state = {
      tasks: new Map(),
      shownTasks: new Map(),
      activeFilter: FILTERS['COMPLETED'],
      inputText: ''
    };
    this.inputUpdated = this.inputUpdated.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    this.ajaxService.get().then((responseTasks) => {
      this.setState((state) => {
        const tasks = new Map();
        responseTasks.forEach((task) => {
          tasks.set(task.id, task);
        });
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
        state.tasks.set(task.id, task);
        return state;
      })
    });
  }

  updateTask(updatedTask) {
    this.ajaxService.put(updatedTask.id, updatedTask).then((newTask) => {
      this.setState((state) => {
        state.tasks.set(newTask.id, newTask);
        return state;
      });
    })
  }


  deleteTask(id) {
    this.ajaxService.delete(id).then(() => {
      this.setState((state) => {
        state.tasks.delete(id);
        return state;
      })
    });
  }

  filterTasks() {
    const { activeFilter, tasks } = this.state;
    switch (activeFilter) {
      case FILTERS.COMPLETED:
        return Array.from(tasks.values()).filter((task) => task.completed);
      case FILTERS.ACTIVE:
        return Array.from(tasks.values()).filter((task) => !task.completed);
      default:
        return Array.from(tasks.values());
    }
  }

  get onCompletedCount() {
    return Array.from(this.state.tasks.values())
      .filter((task) => !task.completed)
      .length;
  }

  changeFilter(filter) {

    this.setState((state) => {
      state.activeFilter = filter;
      return state;
    });
  }

  renderFilters() {
    return Object.keys(FILTERS).map((key, i) => {
      const id = Date.now() + (i * 3);
      const filter = FILTERS[key];
      return <li key={id}>
        <label htmlFor={id}>
          <input type="radio"
                 id={id}
                 name={'FILTERS'}
                 value={filter.value}
                 checked={this.state.activeFilter === filter}
                 onChange={() => this.changeFilter(filter)}/>
          <span>{filter.value}</span>
        </label>
      </li>;
    });
  }

  render() {
    const elements = this.filterTasks().map((task, i) => (
      <TaskListItem key={i} item={task} onUpdate={this.updateTask} onDestroy={this.deleteTask}/>
    ));
    const filters = this.renderFilters();

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
      <footer>
        <ul>
          {filters}
        </ul>
        <span>{this.onCompletedCount}</span>
      </footer>
    </div>
  }
}