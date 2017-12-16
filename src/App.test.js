import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { wrap } from 'module';

describe('<App />', () => {
  const getPrices = jest.fn();

  const props = {
    fetching: false,
    error: false,
    prices: {},
    getPrices: getPrices,
  };

  it('shallow renders correctly', () => {
    expect(shallow(<App {...props} />));
  });

  it('calls getPrices on button click', () => {
    const wrapper = mount(<App {...props} />);

    wrapper.find('button').simulate('click');
    expect(getPrices).toHaveBeenCalledTimes(1);
  });

  it('renders a h2 tag if error', () => {
    const wrapper = mount(
      <App
        fetching={false}
        error={true}
        prices={{}}
        getPrices={getPrices}
      />);

    expect(wrapper.find('h2').length).toBe(1);
  });

  it('does not render a h2 tag if error', () => {
    const wrapper = mount(<App {...props} />);

    expect(wrapper.find('h2').length).toBe(0);
  });

  it('renders an img if fetching equals true', () => {
    const wrapper = mount(
      <App
        fetching={true}
        error={false}
        prices={{}}
        getPrices={getPrices}
      />
    );

    expect(wrapper.find('img').length).toBe(1);
  })

  it('renders a div with three p tags on successful fetch', () => {
    const wrapper = mount(
      <App
        fetching={false}
        error={false}
        prices={{
          EUR: { code: "EUR", symbol: "&euro;", rate: "14,669.3032", description: "Euro", rate_float: 14669.3032 },
          GBP: { code: "GBP", symbol: "&pound;", rate: "12,862.8981", description: "British Pound Sterling", rate_float: 12862.8981 },
          USD: { code: "USD", symbol: "&#36;", rate: "17,287.3313", description: "United States Dollar", rate_float: 17287.3313 },
        }}
        getPrices={getPrices} />
    );

    expect(wrapper.find('h3').length).toBe(3)
  });
});