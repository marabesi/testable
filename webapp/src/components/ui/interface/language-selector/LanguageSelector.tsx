import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocale } from '../../../../data-flow/redux/actions/localeAction';

import '@formatjs/intl-relativetimeformat/polyfill-locales';

const mapDispatchToProps = dispatch => {
  return {
    setLocale: locale => dispatch(setLocale(locale)),
  };
};

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
  locale: state.localeReducer.locale,
});

export const LanguageSelector = (props) => {
  const { intl, locale, setLocale, } = props;

  const onChange = event => setLocale(event.target.value);

  return (
    <select onChange={onChange} value={locale}>
      <option value="en">{intl.messages.options.languages.en}</option>
      <option value="pt-br">{intl.messages.options.languages['pt-br']}</option>
    </select>
  );
};

LanguageSelector.propTypes = {
  setLocale: PropTypes.func,
  setUpdateOptions: PropTypes.func,
  options: PropTypes.object,
  locale: PropTypes.string,
  intl: PropTypes.object,
};

LanguageSelector.defaultProps = {
  options: {},
  locale: 'pt-br',
  intl: {
    messages: {
      options: {
        languages: {}
      },
      global: {},
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(LanguageSelector));