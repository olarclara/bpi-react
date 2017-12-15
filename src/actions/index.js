export const startFetching = () => ({ type: 'START_FETCHING' })
export const throwError = () => ({ type: 'THROW_ERROR' })
export const updatePrices = prices => ({ type: 'UPDATE_PRICES', prices })

export function getPrices() {
  return dispatch => {
    dispatch(startFetching());

    return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => dispatch(updatePrices(data.bpi)))
      .catch(err => dispatch(throwError()))
  }
}