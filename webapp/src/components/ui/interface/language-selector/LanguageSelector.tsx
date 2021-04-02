import { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { setLocale } from '../../../../data-flow/redux/actions/localeAction';
import Loading from '../loading/Loading';

import '@formatjs/intl-relativetimeformat/polyfill';

const mapDispatchToProps = dispatch => {
  return {
    setLocale: locale => dispatch(setLocale(locale)),
  };
};

const mapStateToProps = state => ({
  options: state.optionsReducer.options,
  locale: state.localeReducer.locale,
});

interface Props {
  setLocale?: any,
  onChange?: any,
  setUpdateOptions?: any,
  options?: any,
  locale?: string,
  intl: any,
}

export const LanguageSelector = ({ intl, locale, setLocale, onChange }: Props) => {
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