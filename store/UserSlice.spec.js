import userReducer, { setUsers, toggleEmailMask } from './UserSlice';

describe('UserSlice', () => {
  const initialState = {
    users: [],
    maskedEmails: {},
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setUsers', () => {
    const users = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];
    const nextState = userReducer(initialState, setUsers(users));
    expect(nextState.users).toEqual(users);
  });

  it('should handle toggleEmailMask (mask email)', () => {
    const userId = 1;
    const stateWithUser = {
      users: [{ id: userId, name: 'John Doe', email: 'john@example.com' }],
      maskedEmails: {},
    };
    const nextState = userReducer(stateWithUser, toggleEmailMask(userId));
    expect(nextState.maskedEmails[userId]).toBe(true);
  });

  it('should handle toggleEmailMask (unmask email)', () => {
    const userId = 1;
    const stateWithMaskedEmail = {
      users: [{ id: userId, name: 'John Doe', email: 'john@example.com' }],
      maskedEmails: { [userId]: true },
    };
    const nextState = userReducer(stateWithMaskedEmail, toggleEmailMask(userId));
    expect(nextState.maskedEmails[userId]).toBe(false);
  });

  it('should toggle email mask for an existing user id', ()=>{
    const userId = 1;
    const previousState = {
      users: [{id: userId, name: 'test user', email: 'test@test.com'}],
      maskedEmails: {[userId]: false}
    };
    const nextState = userReducer(previousState, toggleEmailMask(userId));
    expect(nextState.maskedEmails[userId]).toBe(true);
  });

  it('should create new masked emails property if it does not exist', ()=>{
    const userId = 1;
    const previousState = {
      users: [{id: userId, name: 'test user', email: 'test@test.com'}],
      maskedEmails: {}
    };
    const nextState = userReducer(previousState, toggleEmailMask(userId));
    expect(nextState.maskedEmails[userId]).toBe(true);
  });
});