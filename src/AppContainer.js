import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPrices } from './actions';
import App from './App';

const mapStateToProps = state => ({
  error: state.error,
  fetching: state.fetching,
  prices: state.prices,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getPrices: getPrices,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)