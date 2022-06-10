import { makeSchema } from 'nexus';

import * as users from './users';

const schema = makeSchema({
  types: [users],
  contextType: {
    module: '@utils/prisma',
    export: 'Context'
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma'
      }
    ]
  }
});

export default schema;
