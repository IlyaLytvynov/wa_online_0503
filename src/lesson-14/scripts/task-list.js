class TaskList {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.render();
    this.handleEvents();
    this.fetchListData();
  }

  render() {
    const title = document.createElement('h1');
    title.textContent = 'Task list';

    this.input = document.createElement('input');
    this.form = document.createElement('form');
    this.ul = document.createElement('ul');

    this.form.appendChild(this.input);
    this.rootElement.appendChild(title);
    this.rootElement.appendChild(this.form);
    this.rootElement.appendChild(this.ul);
  }

  renderList(taskList) {
    taskList.forEach((task) => {
      this.renderOne(task);
    })
  }

  handleEvents() {
    this.form.addEventListener('submit', (eventObject) => {
      eventObject.preventDefault();
      this.addTask();
    });
  }

  renderOne(task) {
    const li = document.createElement('li');
    li.textContent = task.title;
    this.ul.appendChild(li);
  }

  addTask() {
    const requestBody = {
      title: this.input.value
    };

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:4001/list', true);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify(requestBody));

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.renderOne(JSON.parse(xhr.response));
        } else {
          console.error(xhr.status, xhr.statusText);
        }
      }
    };
  }

  fetchListData() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://localhost:4001/list', true);

    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.renderList(JSON.parse(xhr.response));
        } else {
          console.error(xhr.status, xhr.statusText);
        }
      }
    };
  }
}

export { TaskList };
