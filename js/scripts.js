import {
  disabledButtons,
  listenersModalSetName,
} from "./modules/listeners.js";
import { createModalSetName } from "./modules/createElements.js";

/* render only modal user select box */
createModalSetName();
disabledButtons('.form_set_user_name', '.modal_button');
listenersModalSetName();
