import localeReducer from './localeReducer'
import { setLocale } from '../actions/localeAction'

describe('localeReducer', () => {

  it('define pt-br as locale', () => {
    const action = setLocale('pt-br')
    const reducer = localeReducer({ locale: '' }, action)
    expect(reducer.locale).toBe('pt-br')
  })
});