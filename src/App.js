import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import IconSpinner from './icon__spinner.png';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.img`
  animation: ${rotate360} 2s linear infinite;
  height: 35px;
  padding: 1em;
  width: 35px;
`

const Button = styled.button`
  background-color: black;
  border: none;
  color: white;
  font-size: 28px;
  padding: .5em;
  text-transform: uppercase;
`

const Alert = styled.h2`
  color: red;
`

const Prices = styled.div`
  margin: 1em;
`

const Wrapper = styled.div`
  margin: 0 auto;
  width: 50vw;
  text-align: center;
`

const App = ({ error, fetching, prices, getPrices }) => (
  <Wrapper>
    <Button onClick={() => getPrices()}>
      Get Bitcoin value!
      <span role="img" aria-label="money eyes emoji"> 🤑</span>
    </Button>
    {error ? (
      <Alert>
        Ops, something went wrong!
        <span role="img" aria-label="sad face emoji"> 😕</span>
      </Alert>
    ) : (
        <div>
          {fetching ? (
            <Spinner src={IconSpinner} />
          ) : (
              <Prices>
                <h3>{prices['EUR'] ? `€ EUR ${prices['EUR'].rate}` : ''}</h3>
                <h3>{prices['GBP'] ? `£ GBP ${prices['GBP'].rate}` : ''}</h3>
                <h3>{prices['USD'] ? `$ USD ${prices['USD'].rate}` : ''}</h3>
              </Prices>
            )}
        </div>
      )}
  </Wrapper>
);

App.propTypes = {
  error: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
  prices: PropTypes.object.isRequired,
  getPrices: PropTypes.func.isRequired,
};

export default App;
