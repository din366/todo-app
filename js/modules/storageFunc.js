import { createTableRow } from "./createElements.js";

/* parse and render tasks in table */
export const parseUserTasks = (userName) => {
  const userTasksList = JSON.parse(localStorage.getItem(userName));
  let tableTaskCount = 1;
  for (const userTask of userTasksList) {
    createTableRow(document.querySelector('tbody'), tableTaskCount,
      userTask.userTask, userTask.id, userTask.status, userTask.importance);
    tableTaskCount++; // serial task counter (created for task deletion process)
  }
};

/* add task in localStorage and add in table */
export const addUserTask = (userName, id, userTask, importance) => {
  const taskObject = {
    id,
    userTask,
    status: 'В процессе',
    importance,
  };

  const currentLocalStorage = JSON.parse(localStorage.getItem(userName));
  if (currentLocalStorage.length === 0) {
    document.querySelector('.success_block_wrapper').style.display = 'none';
  }
  currentLocalStorage.push(taskObject);
  localStorage.setItem(userName, JSON.stringify(currentLocalStorage));
};

/* delete user task in localStorage and delete in table */
export const deleteUserTask = (userName, id) => {
  if (id !== null) {
    let userTasksArray = JSON.parse(localStorage.getItem(userName));
    /* exclusion from the array by id */
    userTasksArray = userTasksArray.filter((item) => {
      if (+item.id !== +id) {
        return item;
      }
    });
    localStorage.setItem(userName, JSON.stringify(userTasksArray));

    if (userTasksArray.length === 0) {
      document.querySelector('.success_block_wrapper').style.display = 'block';
      document.querySelector('.table-wrapper').style.display = 'none';
    } else {
      document.querySelector('tbody').innerHTML = '';
      parseUserTasks(localStorage.getItem('currentUserName'));
    }
  }
};

/* add task success status to localStorage  */
export const successUserTask = (userName, id) => {
  const userTasksArray = JSON.parse(localStorage.getItem(userName));

  const modifiedUserTasksArray = userTasksArray.map(item => {
    if (+item.id === +id) {
      item.status = 'Выполнено';
    }
    return item;
  });

  localStorage.setItem(userName, JSON.stringify(modifiedUserTasksArray));
};

/* rename task in localStorage (used in tbodyListeners func) */
export const renameUserTasks = (userName, itemId, renameTask) => {
  let userTasksArray = JSON.parse(localStorage.getItem(userName));
  userTasksArray = userTasksArray.filter((item) => {
    if (+item.id === +itemId) {
      item.userTask = renameTask;
      return item;
    }
    return item;
  });
  localStorage.setItem(userName, JSON.stringify(userTasksArray));
};
