import { LoginEntity } from './login.models';
import * as LoginActions from './login.actions';
import { State, initialState, reducer } from './login.reducer';

describe('Login Reducer', () => {
  const createLoginEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LoginEntity);

  beforeEach(() => {});

  describe('valid Login actions', () => {
    it('loadLoginSuccess should return set the list of known Login', () => {
      const login = [
        createLoginEntity('PRODUCT-AAA'),
        createLoginEntity('PRODUCT-zzz'),
      ];
      const action = LoginActions.loadLoginSuccess({ login });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
