import {
  addUserTask,
  deleteUserTask,
  successUserTask,
  renameUserTasks,
} from "./storageFunc.js";
import { createTableRow } from "./createElements.js";
import { renderPage } from "./render.js";

export const disabledButtons = (formClass, buttonClass) => {
  const input = document.querySelector(formClass);
  input.addEventListener('input', (e) => {
    if (e.target.value === '') {
      document.querySelector(buttonClass).disabled = true;
    } else {
      document.querySelector(buttonClass).disabled = false;
    }
  });
};

export const listenersForm = () => {
  const form = document.querySelector('.add-tasks-form');

  form.querySelector('.btn-add').addEventListener('click', (e) => {
    e.preventDefault();
    const randomId = Math.random().toString().substring(2, 10); // set random id
    const userTask = form[0].value;
    const importance = document.querySelector('.form-select').value;
    // eslint-disable-next-line max-len
    addUserTask(localStorage.getItem('currentUserName'), randomId, userTask, importance);
    form[2].disabled = true; // disabled submit button after push task
    if (document.querySelector('.table-wrapper').style.display === 'none') {
      document.querySelector('.table-wrapper').style.display = 'block';
      document.querySelector('.success_block_wrapper').style.display = 'none';
    }
    createTableRow(document.querySelector('tbody'),
      (document.querySelector('tbody').childElementCount + 1), // all tasks + 1
      userTask, randomId, 'В процессе', importance);
    form.reset();
  });

  form.querySelector('.btn-reset').addEventListener('click', () => {
    form.querySelector('.btn-add').disabled = true;
  });

  form.querySelector('.form-select').addEventListener('change', () => {
    if (form.querySelector('.form-control').value === '') {
      form.querySelector('.btn-add').disabled = true;
    }
  });
};

export const tbodyListeners = () => {
  const tbody = document.querySelector('tbody');

  tbody.addEventListener('click', (e) => {
    const taskRow = (e.target.closest('tr'));
    /* handling an event when a task is completed  */
    if (e.target.classList.contains('btn-success')) {
      for (const item of taskRow.children) {
        item.classList.remove('table-light', 'table-warning', 'table-danger');
        item.classList.add('table-success');
      }
      taskRow.children[2].textContent = 'Выполнено'; // render success status
      successUserTask(localStorage.getItem('currentUserName'),
        taskRow.dataset.id);
    }

    /* handling an event when a task is deleted */
    if (e.target.classList.contains('btn-danger')) {
      const userChoice = confirm('Вы действительно хотите удалить задачу?');
      if (userChoice === true) {
        taskRow.remove(); // delete task in table
        deleteUserTask(localStorage.getItem('currentUserName'),
          taskRow.dataset.id); // delete task in localStorage
      }
    }

    if (e.target.classList.contains('btn-edit')) {
      taskRow.children[1].contentEditable = 'true'; // cell can be edited
      /* taskRow.children[1].style.backgroundColor = '#faf1de'; */
      taskRow.children[1].style.borderStyle = 'double';
      taskRow.children[1].style.borderColor = 'red';
      e.target.closest('.btn-edit').style.display = 'none';
      taskRow.querySelector('.btn-save').style.display = 'inline-block';
    }

    if (e.target.classList.contains('btn-save')) {
      taskRow.children[1].contentEditable = 'false';
      /* taskRow.children[1].style.backgroundColor = ''; */
      taskRow.children[1].style.borderStyle = 'solid';
      taskRow.children[1].style.borderColor = '#dfe0e1';
      e.target.closest('.btn-save').style.display = 'none';
      taskRow.querySelector('.btn-edit').style.display = 'inline-block';
      const taskId = taskRow.dataset.id;
      const renameTask = taskRow.children[1].textContent;

      renameUserTasks(localStorage.getItem('currentUserName'),
        taskId, renameTask); // rename task in localStorage
    }
  });
};

export const listenersModalSetName = () => {
  const modal = document.querySelector('.modal_dialog');

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal_button')) {
      e.preventDefault();
      const modalInput = modal.querySelector('.form_set_user_name');
      const inputUserName = modalInput[0].value.toLowerCase();
      /* set current user name in localStorage */
      localStorage.setItem('currentUserName', inputUserName);

      modal.style.transform = 'rotateX(90deg)';
      document.querySelector('.modal').style.display = 'none';

      /* render mainpage after username choice and create listeners */
      renderPage('.app-container');
      disabledButtons('.add-tasks-form', '.btn-add');
      listenersForm();
      tbodyListeners();
    }
  });
};
