import { parseUserTasks } from "./storageFunc.js";

const appContainer = document.querySelector('.app-container');

/* add classes for app-container */
appContainer.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
  'justify-content-center', 'flex-column');

/* create app title */
export const createTitle = (parentClass) => {
  const title = document.createElement('h1');
  title.classList.add('mb-4');
  title.textContent = 'ToDo App';
  document.querySelector(parentClass).append(title);
};

/* add button by options */
const createButton = (parentItem, type, buttonText, ...classes) => {
  /*
  example
  createButton(form, 'submit', 'Добавить', 'btn', 'btn-primary');
  */
  const button = document.createElement('button');
  button.type = type;
  button.textContent = buttonText;
  for (const item of classes) {
    button.classList.add(item);
  }
  parentItem.append(button);
};

export const createFormForAddTasks = (parentClass) => {
  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-4', 'add-tasks-form');
  /* Create label in form */
  const inputForm = document.createElement('label');
  inputForm.classList.add('form-group', 'me-3', 'mb-0');
  /* Create label and input form */
  const labelForm = document.createElement('input');
  labelForm.classList.add('form-control');
  labelForm.type = 'text';
  labelForm.placeholder = 'Введите задачу';
  inputForm.append(labelForm);
  form.append(inputForm);

  /* create importance select in form */
  const selectImportance = document.createElement('select');
  selectImportance.low = document.createElement('option');
  selectImportance.low.textContent = 'Обычная';
  selectImportance.medium = document.createElement('option');
  selectImportance.medium.textContent = 'Важная';
  selectImportance.high = document.createElement('option');
  selectImportance.high.textContent = 'Срочная';
  selectImportance.classList.add('form-select');
  selectImportance.ariaLabel = 'Важность задачи';
  selectImportance.append(selectImportance.low, selectImportance.medium,
    selectImportance.high);
  form.append(selectImportance);

  /* add button in form */
  createButton(form, 'submit', 'Добавить', 'btn', 'btn-primary', 'me-3',
    'btn-add');
  createButton(form, 'reset', 'Очистить', 'btn', 'btn-warning', 'btn-reset');

  inputForm.append(labelForm);
  appContainer.append(form);
  form[2].disabled = true; // disabled submit button in form at app start
  selectImportance.disabled = false; // off autodisabled of importance at start
};

/* Create task row function (only render task in table) */
export const createTableRow = (tableBody, tableTaskCount, task, id,
  status, importance) => {
  const tableTaskTr = document.createElement('tr');
  tableTaskTr.classList.add('table-light', 'text-center');
  tableTaskTr.dataset.id = id;

  const tdBlockButton = document.createElement('div');
  createButton(tdBlockButton, 'button', 'Удалить', 'btn', 'btn-danger', 'me-1');
  createButton(tdBlockButton, 'button', 'Завершить', 'btn',
    'btn-success', 'me-1');
  createButton(tdBlockButton, 'button', 'Редактировать', 'btn',
    'btn-link', 'btn-edit');
  createButton(tdBlockButton, 'button', '  Сохранить ', 'btn',
    'btn-primary', 'btn-dsp-none', 'btn-save');

  /* create row sequence and set importance color */
  const tdTempArray = [tableTaskCount, task, status, tdBlockButton];
  for (const item of tdTempArray) {
    const elem = document.createElement('td');
    elem.append(item);
    tableTaskTr.append(elem);
    if (importance === 'Обычная') {
      elem.classList.add('table-light');
    } else if (importance === 'Важная') {
      elem.classList.add('table-warning');
    } else if (importance === 'Срочная') {
      elem.classList.add('table-danger');
    }

    /* At the first start, check for execution (for parseUserTasks func) */
    if (status === 'Выполнено') {
      elem.classList.remove('table-light', 'table-warning', 'table-danger');
      elem.classList.add('table-success');
    }
  }
  tableBody.append(tableTaskTr);
};

/* block when all tasks are done  */
const createSuccessTaskBlock = (parentWrapper, display) => {
  const blockWrapper = document.createElement('div');
  blockWrapper.classList.add('success_block_wrapper');
  blockWrapper.textContent = 'Все задачи выполнены! Поздравляю!';
  parentWrapper.append(blockWrapper);
  blockWrapper.style = `display: ${display}`;
};

/* Creating a table when the app is first opened  */
export const createTable = (parentClass, userName) => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered', 'table-styles');
  tableWrapper.append(table);

  /* Create table header func */
  const createTableHeader = () => {
    const tableHeader = document.createElement('thead');
    tableHeader.tr = document.createElement('tr');
    tableHeader.append(tableHeader.tr);

    const tableHeadersName = ['№', 'Задача', 'Статус', 'Действия'];
    for (const item of tableHeadersName) {
      const tableTh = document.createElement('th');
      tableTh.textContent = item;
      tableHeader.tr.append(tableTh);
    }

    table.append(tableHeader);
  };

  const tableBody = document.createElement('tbody');
  const tableHeader = document.createElement('thead');
  tableHeader.tr = document.createElement('tr');
  createTableHeader();
  table.append(tableBody);
  document.querySelector(parentClass).append(tableWrapper);

  /* show table if there are tasks or show block 'all tasks completed' */
  if (localStorage.getItem(userName) !== null &&
    JSON.parse(localStorage.getItem(userName)).length !== 0) {
    /* parse tasks from localStorage */
    parseUserTasks(userName);
    createSuccessTaskBlock(appContainer, 'none');
  } else {
    document.querySelector('.table-wrapper').style.display = 'none';
    /* show block 'all tasks completed */
    createSuccessTaskBlock(appContainer, 'block');
  }
};

/* create first app block 'setUserName' */
export const createModalSetName = () => {
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal');
  modalWrapper.style.display = 'block';
  const modal = document.createElement('div');
  modal.style.transform = 'rotateX(0deg)';
  modal.classList.add('modal_dialog');

  const modalTitle = document.createElement('span');
  modalTitle.textContent = 'Введите имя пользователя';
  modalTitle.classList.add('form_title');

  const modalFormWrapper = document.createElement('div');
  modalFormWrapper.classList.add('form_wrapper');
  const modalForm = document.createElement('form');
  modalForm.classList.add('form_set_user_name');
  const modalInput = document.createElement('input');
  modalInput.setAttribute("required", true);
  modalInput.classList.add('modal_input', 'form-control');

  modalWrapper.append(modal);
  modal.append(modalTitle, modalFormWrapper);
  modalFormWrapper.append(modalForm);
  modalForm.append(modalInput);

  createButton(modalForm, 'submit', 'Продолжить', 'btn',
    'btn-success', 'modal_button');

  appContainer.append(modalWrapper);
  modalForm[1].disabled = true; // disable button on app startup
};

/* add switch user button */
export const addLinkSwitchUser = (parentWrapper) => {
  const switchLink = document.createElement('a');
  switchLink.classList.add('switch_user_link');
  switchLink.href = '';
  switchLink.textContent = 'Сменить пользователя';
  document.querySelector(parentWrapper).append(switchLink);
};
