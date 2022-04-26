import { getters } from '@/store/filters';
import catalogItems from './fixtures/catalog.json';
import state from './fixtures/filters.json';

describe('filters test', () => {
    it('should filter', () => {
        getters.FOUND_SERVICES = jest.fn().mockImplementation((list) => list);
        const result = getters.FILTERED_SERVICES(state, { FOUND_SERVICES: getters.FOUND_SERVICES })(
            catalogItems
        );
        expect(result).toEqual([catalogItems[4]]);
    });
    it('should return full list', () => {
        getters.FOUND_SERVICES = jest.fn().mockImplementation((list) => list);
        const result = getters.FILTERED_SERVICES(
            { items: state.items, selected: {}, search: '' },
            { FOUND_SERVICES: getters.FOUND_SERVICES }
        )(catalogItems);
        expect(result).toEqual(catalogItems);
    });
});
