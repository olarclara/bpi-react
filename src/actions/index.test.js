import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from './index';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions creator', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('startFetching should dispatch a START_FETCHING action', () => {
    expect(actions.startFetching())
      .toEqual({
        type: 'START_FETCHING'
      })
  })

  it('throwError should dispatch a THROW_ERROR action', () => {
    expect(actions.throwError())
      .toEqual({
        type: 'THROW_ERROR'
      })
  })

  it('updatePrices should dispath an UPDATE_ITEMS action', () => {
    expect(actions.updatePrices({
      EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
      GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
      USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
    }))
      .toEqual({
        type: 'UPDATE_PRICES',
        prices: {
          EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
          GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
          USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
        }
      })
  })

  it('successful getPrices dispatches START_FETCHING and UPDATE_PRICES actions', () => {
    const store = mockStore({
      feching: false,
      error: false,
      prices: {},
    });

    const expectedActions = [
      { type: 'START_FETCHING' },
      { type: 'UPDATE_PRICES', prices: 
        {
          EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
          GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
          USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
        }
      }
    ];

    fetchMock.get('*', {
      body: {
        bpi: {
          EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
          GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
          USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
        }
      }
    });

    return store.dispatch(actions.getPrices())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  });

  it('failed getPrices dispatches START_FETCHING and THROW_ERROR actions', () => {
    const store = mockStore({
      feching: false,
      error: false,
      prices: {},
    });

    const expectedActions = [
      { type: 'START_FETCHING' },
      { type: 'THROW_ERROR' }
    ];

    fetchMock.get('*', { throws: 'Unexpected error!' });

    return store.dispatch(actions.getPrices())
      .then(() => expect(store.getActions()).toEqual(expectedActions))
  });
});