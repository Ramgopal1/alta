const custodianGroupsListSuccess = {
  status: 200,
  data: [
    {
      id: 'group1',
      name: 'custodianGroup1',
      type: 'SSM',
    },
    {
      id: 'group2',
      name: 'custodianGroup2',
      type: 'SSM',
    },
    {
      id: 'group3',
      name: 'custodianGroup3',
      type: 'SSM',
    },
  ],
};

const custodianGroupsListFail = {
  data: {
    message: 'Some error message',
    response: {
      status: 408,
      data: {
        code: 408,
        message: 'Incorrect values supplied',
      },
    },
  },
};

export { custodianGroupsListSuccess, custodianGroupsListFail };
