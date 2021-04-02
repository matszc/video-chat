import { LayoutContainerEntity } from './layout-container.models';
import {
  State,
  layoutContainerAdapter,
  initialState,
} from './layout-container.reducer';
import * as LayoutContainerSelectors from './layout-container.selectors';

describe('LayoutContainer Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getLayoutContainerId = (it) => it['id'];
  const createLayoutContainerEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as LayoutContainerEntity);

  let state;

  beforeEach(() => {
    state = {
      layoutContainer: layoutContainerAdapter.setAll(
        [
          createLayoutContainerEntity('PRODUCT-AAA'),
          createLayoutContainerEntity('PRODUCT-BBB'),
          createLayoutContainerEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('LayoutContainer Selectors', () => {
    it('getAllLayoutContainer() should return the list of LayoutContainer', () => {
      const results = LayoutContainerSelectors.getAllLayoutContainer(state);
      const selId = getLayoutContainerId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = LayoutContainerSelectors.getSelected(state);
      const selId = getLayoutContainerId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLayoutContainerLoaded() should return the current 'loaded' status", () => {
      const result = LayoutContainerSelectors.getLayoutContainerLoaded(state);

      expect(result).toBe(true);
    });

    it("getLayoutContainerError() should return the current 'error' state", () => {
      const result = LayoutContainerSelectors.getLayoutContainerError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
