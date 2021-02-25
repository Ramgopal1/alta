import { workbenchConnection } from 'insg-workbench-lib/lib/ApiConnection.js';
import { groups } from 'isng-workbench-lib/camunda/api/ssm/paths.js';
import { IsNGFormError } from 'insg-workbench-lib/lib/NotificationHandler.js';

function getGroups(tokenManager) {
  try {
    return workbenchConnection(tokenManager).get(`/${groups}`);
  } catch (error) {
    throw new IsNGFormError(`Unable to retrieve transaction: ${error.message}`, 'error');
  }
}

export default {
  getGroups,
};
