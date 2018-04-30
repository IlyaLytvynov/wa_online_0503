import { TaskList } from './components/task-list/task-list';
import './lesson-15.scss';

new TaskList(document.querySelector('#taskList'));

$('.test')
  .on('click', function () {
    $(this).slideUp(2000);
  })
  .addClass('test-test');