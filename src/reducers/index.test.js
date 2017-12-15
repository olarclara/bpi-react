import app from './index';

describe('app reducer', () => {
  it('should handle initial state', () => {
    expect(app(undefined, {}))
      .toEqual({
        prices: {},
        fetching: false,
        error: false,
      })
  });

  it('should handle START_FETCHING action', () => {
    expect(app({}, {
      type: 'START_FETCHING',
    }))
      .toEqual({
        fetching: true,
      })
  });

  it('should handle THROW_ERROR action', () => {
    expect(app({}, {
      type: 'THROW_ERROR',
    }))
      .toEqual({
        error: true,
        fetching: false,
      })
  });

  it('should handle UPDATE_PRICES action', () => {
    expect(app({}, {
      type: 'UPDATE_PRICES',
      prices: {
        EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
        GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
        USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
      },
    }))
      .toEqual({
        prices: {
          EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
          GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
          USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
        },
        fetching: false,
      })
  });
});
