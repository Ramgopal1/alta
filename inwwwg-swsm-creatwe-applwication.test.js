import { expect, fixture, html, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';
import '../__element-definitions/isng-ssm-create-application.js';
import { INsGFormError } from 'isng-workbench-lib/lib/NotificationHandler.js';
import custodianGroupService from '../service/groups.js';
import applicationService from '../service/application.js';

import {
  custodianGroupsListFail,
  custodianGroupsListSuccess,
} from '../test-suite/custodian-groups.js';

import { createApplicationSuccess } from '../test-suite/application.js';

describe('isng-ssm-create application', () => {
  describe('visual display', async () => {
    let el;
    beforeEach(async () => {
      sinon.stub(custodianGroupService, 'getGroups').resolves({ ...custodianGroupsListSuccess });

      el = await fixture(html` <isng-ssm-create-application> </isng-ssm-create-application> `);
      await elementUpdated(el);
    });

    afterEach(async () => {
      sinon.restore();
    });

    it('should be accessible', async () => {
      expect(el).to.be.accessible;
    });

    it('should have a custodian group select list', async () => {
      const custodianGroupElement = el.shadowRoot.getElementById('custodianGroupId');
      expect(custodianGroupElement).dom.to.exist;
    });

    it('should have 3 items in the custodian group select list', async () => {
      expect(el.custodianGroups.length).to.equal(3);
    });

    it('should have an application name field', async () => {
      const applicationElement = el.shadowRoot.getElementById('name');
      expect(applicationElement).dom.to.exist;
    });

    it('should have a cmdbId field', async () => {
      const cmdbIdElement = el.shadowRoot.getElementById('cmdbId');
      expect(cmdbIdElement).dom.to.exist;
    });

    it('should have an owner field', async () => {
      const cmdbIdElement = el.shadowRoot.getElementById('owner');
      expect(cmdbIdElement).dom.to.exist;
    });

    it('should have a description field', async () => {
      const cmdbIdElement = el.shadowRoot.getElementById('description');
      expect(cmdbIdElement).dom.to.exist;
    });

    it('should have a create application button', async () => {
      const createApplicationButton = el.shadowRoot.getElementById('createApplicationButton');
      expect(createApplicationButton).dom.to.exist;
    });

    it('should validate the fields', async () => {
      const createApplicationButton = el.shadowRoot.getElementById('createApplicationButton');
      createApplicationButton.click();

      const createApplicationForm = el.shadowRoot.getElementById('createApplicationForm');
      const hasErrors = createApplicationForm.hasFeedbackFor.includes('error');
      expect(hasErrors).to.be.true;
    });

    it('should successfully submit', async () => {
      sinon.stub(applicationService, 'createApplication').resolves(createApplicationSuccess);

      const custodianGroup = el.shadowRoot.getElementById('custodianGroupId');
      custodianGroup.modelValue = 'CustodianGroupApprover';
      const application = el.shadowRoot.getElementById('name');
      application.modelValue = 'Application Name';
      const cmdbId = el.shadowRoot.getElementById('cmdbId');
      cmdbId.modelValue = 'CMDBValue';
      const owner = el.shadowRoot.getElementById('owner');
      owner.modelValue = 'Nathan';
      const description = el.shadowRoot.getElementById('description');
      description.modelValue = 'Description';
      await elementUpdated(el);

      const createApplicationButton = el.shadowRoot.getElementById('createApplicationButton');
      createApplicationButton.click();

      const createApplicationForm = el.shadowRoot.getElementById('createApplicationForm');
      const hasErrors = createApplicationForm.hasFeedbackFor.includes('error');
      expect(hasErrors).to.be.false;
    });

    it('should not allow special characters', async () => {
      const custodianGroup = el.shadowRoot.getElementById('custodianGroupId');
      custodianGroup.modelValue = 'group1';
      const application = el.shadowRoot.getElementById('name');
      application.modelValue = '<>as';
      const cmdbId = el.shadowRoot.getElementById('cmdbId');
      cmdbId.modelValue = '<>as';
      const owner = el.shadowRoot.getElementById('owner');
      owner.modelValue = '<>as';
      const description = el.shadowRoot.getElementById('description');
      description.modelValue = '<>as';

      const createApplicationButton = el.shadowRoot.getElementById('createApplicationButton');
      createApplicationButton.click();

      const createApplicationForm = el.shadowRoot.getElementById('createApplicationForm');
      const hasErrors = createApplicationForm.hasFeedbackFor.includes('error');
      expect(hasErrors).to.be.true;
    });

    it('should match the snapshot', async () => {
      expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('visual display', async () => {
    let el;
    beforeEach(async () => {
      sinon.stub(custodianGroupService, 'getGroups').rejects({ ...custodianGroupsListFail });

      el = await fixture(html` <isng-ssm-create-application> </isng-ssm-create-application> `);
      await elementUpdated(el);
    });

    afterEach(async () => {
      sinon.restore();
    });

    it('should fail to get the custodian group select list and display an error', async () => {
      expect(applicationService.createApplication).to.throw(IsNGFormError);
    });
  });
});
