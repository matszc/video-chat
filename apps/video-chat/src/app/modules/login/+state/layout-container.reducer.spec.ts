import { LayoutContainerEntity } from './layout-container.models';
import * as LayoutContainerActions from './layout-container.actions';
import { State, initialState, reducer } from './layout-container.reducer';

describe('LayoutContainer Reducer', () => {
  const createLayoutContainerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LayoutContainerEntity);

  beforeEach(() => {});

  describe('valid LayoutContainer actions', () => {
    it('loadLayoutContainerSuccess should return set the list of known LayoutContainer', () => {
      const layoutContainer = [
        createLayoutContainerEntity('PRODUCT-AAA'),
        createLayoutContainerEntity('PRODUCT-zzz'),
      ];
      const action = LayoutContainerActions.loadLayoutContainerSuccess({
        layoutContainer,
      });

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
