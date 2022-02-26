import {
  createFormForAddTasks,
  createTitle,
  createTable,
  addLinkSwitchUser,
} from "./createElements.js";

/* render mainpage after username choice in modal */
export const renderPage = (parentWrapper) => {
  createTitle(parentWrapper);
  createFormForAddTasks(parentWrapper);
  /* if there is no user - create an empty array for subsequent tasks */
  if (localStorage.getItem(localStorage.getItem('currentUserName')) === null) {
    localStorage.setItem(localStorage.getItem('currentUserName'),
      JSON.stringify([]));
  }

  createTable(parentWrapper, localStorage.getItem('currentUserName'));
  addLinkSwitchUser(parentWrapper);
};

