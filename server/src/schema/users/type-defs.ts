import { inputObjectType, objectType } from 'nexus';

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('username');
    t.nonNull.int('tokenVersion');
  }
});

const UserMutationResponse = objectType({
  name: 'UserMutationResponse',
  definition(t) {
    t.nonNull.string('accessToken');
    t.nonNull.field('user', { type: User });
  }
});

const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('password');
  }
});
const SignInInput = inputObjectType({
  name: 'SignInInput',
  definition(t) {
    t.nonNull.string('username');
    t.nonNull.string('password');
  }
});

export { User, UserMutationResponse, SignUpInput, SignInInput };
