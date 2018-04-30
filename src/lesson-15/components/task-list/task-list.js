import { AjaxService } from '../ajax-service';
import { modalWindow } from '../modal-window/modal-window';

const ajaxService = new AjaxService('http://localhost:4001/list');

class TaskList {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.erroHandler = this.erroHandler.bind(this);

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
      this.ul.appendChild(this.renderOne(task));
    });
  }

  handleEvents() {
    this.form.addEventListener('submit', (eventObject) => {
      eventObject.preventDefault();
      this.addTask();
    });
  }

  renderOne(task) {
    const li = document.createElement('li');
    const btnDel = document.createElement('button');
    const input = document.createElement('input');
   
    btnDel.textContent = 'X';
    li.textContent = task.title;

    li.setAttribute('data-id', task.id);
    btnDel.addEventListener('click', () => this.deleteTask(task.id));

    li.appendChild(input);
    li.appendChild(btnDel);
    input.value = task.title;
    input.addEventListener('blur', () => {
      const title = input.value;
      const completed = task.completed;

      this.updateTask(task.id, { title, completed });
    });
    return li;
  }

  addTask() {
    const requestBody = {
      title: this.input.value
    };
    this.input.value = '';
    ajaxService.post(requestBody)
      .then((task) => {
        this.ul.appendChild(this.renderOne(task));
      })
      .catch(this.erroHandler);
  }

  deleteTask(id) {
    console.log(id);
    ajaxService
      .delete(id)
      .then((resp) => {
        const removingElement = this.ul.querySelector(`[data-id='${id}']`);
        this.ul.removeChild(removingElement);
      })
      .catch(this.erroHandler);
  }

  updateTask(id, data) {
    ajaxService.put(id, data)
      .then((data) => {
        const oldElement = this.ul.querySelector(`[data-id='${id}']`);
        const newElement = this.renderOne(data);
        this.ul.replaceChild(newElement, oldElement);
      })
      .catch(this.erroHandler);
  }

  fetchListData() {
    // $.ajax({
    //   url: 'http://localhost:4001/list',
    //   success: (data) => {
    //     this.renderList(data)
    //   },
    //   error: (e) => {
    //     this.erroHandler(e);
    //   }
    // })
    ajaxService.get()
      .then((data) => this.renderList(data))
      .catch(this.erroHandler);
  }

  erroHandler(errMessage) {
    const modalConfig = {
      headerText: 'Error',
      content: `
       ${errMessage}
      `,
      withButtons: true
    };

    modalWindow.show(modalConfig)
      .then(this.fetchListData.bind(this))
      .catch((e) => {
        console.error(e);
        console.log('Canceled');
      });
  }
}

export { TaskList };
