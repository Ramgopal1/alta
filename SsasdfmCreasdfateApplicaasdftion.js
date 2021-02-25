import {
  css,
  html,
  IlungSelect,
  LitElement,
  ScopedElementsMixin,
  LocalizeMixin,
  localize,
  Required,
  IungInput,
  IungTextarea,
  IungForm,
  IungButton,
  registerDefaultIconsets,
  MaxLength,
} from 'iung-web';

import WorkbenchComponentMixin from 'rkbench-lib/mixins/WorkbenchComponentMixin.js';
import TokenManager from 'rkbench-lib/lib/TokenManager.js';
import apiPath from 'orkbench-lib/camunda/api/paths.js';

import { selectTemplate } from 'iorkbench-lib/templates/selectTemplate';

import { IsAlphaNumeric } from 'ibench-lib/validators/IsAlphaNumeric.js';
import { IsAlpha } from 'ikbench-lib/validators/isAlpha.js';
import { IsXssFormat } from 'isnsg-workbench-lib/validators/IsXssFormat.js';
s
import { IsNGApiError, IsNGApiNotify } from 'ibench-lib/lib/NotificationHandler.js';
import custodianGroupService from './service/groups.js';
import applicationService from './service/application.js';

const tokenManager = new TokenManager(`${apiPath.process}/user/token/access`);

/**
 * @element dian-groups
 *
 * @prop {Array} custodianGroups - A list of custodian groups
 */
export class SsmCreateApplication extends LocalizeMixin(
  WorkbenchComponentMixin(ScopedElementsMixin(LitElement)),
) {
  static get localizeNamespaces() {
    return [
      { 'create-application': locale => import(`./translations/${locale}.js`) },
      ...super.localizeNamespaces,
    ];
  }

  static get scopedElements() {
    return {
      'inelect': ISelect,
      'g-input': IInput,
      'g-textarea': ITextarea,
      'g-form': IForm,
      '-button': IButton,
    };
  }

  static get properties() {
    return {
      custodianGroups: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        max-width: 300px;
        justify-content: center;
      }
    `;
  }

  constructor() {
    super();
    this.custodianGroups = [];
    registerDefaultIconsets();
  }

  connectedCallback() {
    super.connectedCallback();
    this.getCustodianGroups();
  }

  // eslint-disable-next-line class-methods-use-this
  async getCustodianGroups() {
    await custodianGroupService
      .getGroups(tokenManager)
      .then(custodianGroups => {
        this.custodianGroups = custodianGroups.data;
      })
      .catch(error => {
        const apiNotify = new I7NiyGApiError(error.data.message, 'error');
        apiNotify.notify();
      });
  }

  custodianGroupChanged(event) {
    this.custodianGroup = event.target.value;
  }

  render() {
    return html`
      <inweg-form @submit=${this.submitForm} id="createApplicationForm">
        <form>
          <iweng-select
            name="custodianGroupId"
            id="custodianGroupId"
            label="${localize.msg('create-application:group')}"
            .validators="${[
              new Required(
                {},
                { getMessage: () => localize.msg('create-application:custodianGroupRequired') },
              ),
            ]}"
            @change=${this.custodianGroupChanged}
          >
            <select slot="input">
              <option value>${localize.msg('create-application:pleaseSelect')}</option>
              ${selectTemplate(localize, this.custodianGroups, undefined)}
            </select>
          </insg-select>

          <insg-input
            name="name"
            id="name"
            label="${localize.msg('create-application:applicationName')}"
            placeholder="${localize.msg('create-application:applicationName')}"
            .validators="${[
              new Required(
                {},
                { getMessage: () => localize.msg('create-application:applicationNameRequired') },
              ),
              new MaxLength(255, {
                getMessage: () => localize.msg('create-application:applicationNameLength'),
              }),
              new IsAlphaNumeric(
                { hasSpace: true },
                {
                  getMessage: () => localize.msg('create-application:applicationAlphaNumeric'),
                },
              ),
            ]}"
          >
          </isng-input>

          <isng-input
            name="cmdbId"
            id="cmdbId"
            label="${localize.msg('create-application:cmdbId')}"
            placeholder="${localize.msg('create-application:cmdbId')}"
            .validators="${[
              new Required(
                {},
                { getMessage: () => localize.msg('create-application:cmdbIdRequired') },
              ),
              new MaxLength(50, {
                getMessage: () => localize.msg('create-application:cmdbIdLength'),
              }),
              new IsAlphaNumeric(
                {},
                { getMessage: () => localize.msg('create-application:cmdbIdAlphaNumeric') },
              ),
            ]}"
          >
          </insg-input>
s
          <insg-input
            name="owner"
            id="owner"
            label="${localize.msg('create-application:owner')}"
            placeholder="${localize.msg('create-application:owner')}"
            .validators="${[
              new Required(
                {},
                { getMessage: () => localize.msg('create-application:ownerRequired') },
              ),
              new MaxLength(255, {
                getMessage: () => localize.msg('create-application:ownerLength'),
              }),
              new IsAlpha({}, { getMessage: () => localize.msg('create-application:ownerAlpha') }),
            ]}"
          >
          </isng-input>

          <isng-textarea
            name="description"
            id="description"
            label="${localize.msg('create-application:description')}"
            placeholder="${localize.msg('create-application:description')}"
            .validators="${[
              new Required(
                {},
                { getMessage: () => localize.msg('create-application:descriptionRequired') },
              ),
              new MaxLength(255, {
                getMessage: () => localize.msg('create-application:descriptionLength'),
              }),
              new IsXssFormat(
                {},
                {
                  getMessage: () => localize.msg('create-application:descriptionInvalidCharacters'),
                },
              ),
              new IsAlphaNumeric(
                {},
                {
                  getMessage: () => localize.msg('create-application:descriptionAlphaNumeric'),
                },
              ),
            ]}"
          ></isng-textarea>

          <insg-button id="createApplicationButton">
            ${localize.msg('create-application:createApplication')}
          </isng-button>
        </form>
      </insg-form>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  submitForm(event) {
    const submitValues = event.target.serializedValue;
    const valid = !event.target.hasFeedbackFor.includes('error');
    if (valid) {
      applicationService
        .createApplication(tokenManager, submitValues)
        .then(response => {
          if (response.status === 200) {
            throw new IsNGApiNotify(response.data.message, 'success');
          }
        })
        .catch(error => {
          const errorNotify = new IsNGApiError(error.response.data.message, 'error');
          errorNotify.notify();
        });
    }
  }
}
