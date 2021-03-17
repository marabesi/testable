import { useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLocale } from '../../../../data-flow/redux/actions/localeAction';
import Loading from '../loading/Loading';

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

export const LanguageSelector = ({ intl, locale, setLocale, onChange }) => {
  const [loading, setLoading] = useState(false);

  const didChange = event => {
    const language = event.target.value;
    setLoading(true);
    setLocale(language);

    if (onChange) {
      onChange(language);
    }

    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <>
      {loading && <Loading />}
      <select onChange={didChange} value={locale}>
        <option value="en">{intl.messages.options.languages.en}</option>
        <option value="pt-br">{intl.messages.options.languages['pt-br']}</option>
        <option value="ro">{intl.messages.options.languages['ro']}</option>
        <option value="es">{intl.messages.options.languages['es']}</option>
      </select>
    </>
  );
};

LanguageSelector.propTypes = {
  setLocale: PropTypes.func,
  onChange: PropTypes.func,
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