/**
 * Sync Countries Choice
 *
 * @class SyncCountriesChoice
 */

import { FieldOnlyCountries } from './Fields/FieldOnlyCountries.js'
import { FieldPrefferedCountries } from './Fields/FieldPrefferedCountries.js'
import { FieldExcludeCountries } from './Fields/FieldExcludeCountries.js'
import { codesISO2European, codesISO2 } from '../utils.js'

const $ = jQuery

export class SyncCountriesChoice {
  /**
   * Fields
   *
   * @param {MutationObserver} #observer
   */
  #observer

  /**
   * Constructor
   *
   * @param {MutationObserver} observer
   */
  constructor (observer) {
    this.#observer = observer
    this.#handleAppLoaded()
    this.#handleSPNFields()
  }

  /**
   * Disconnect observer if ninja forms app was loaded
   */
  #handleAppLoaded () {
    if ($('.nf-field-wrap.spn').length) {
      this.#observer.disconnect()
    }
  }

  /**
   * Handle each SPN Field in ninja forms dasboard
   */
  #handleSPNFields () {
    $('.nf-field-wrap.spn').each(function () {
      const $field = $(this)

      $(document).one('click', $field.find('> div:first-of-type'), handleSPNFieldClick)
    })

    /**
     * Handle SPN Field By Click
     */
    function handleSPNFieldClick (event) {
      const FieldOnly = new FieldOnlyCountries('#only_countries')
      const FieldPreffered = new FieldPrefferedCountries('#preffered_countries')
      const FieldExclude = new FieldExcludeCountries('#exclude_countries')

      FieldOnly.handleOnChange((currentValue) => {
        // If no one value selected use all field
        if (!currentValue.length || currentValue.includes('all')) {
          // Handle Field Exclude
          FieldExclude.setFieldValue(codesISO2, false)
          FieldExclude.disableOptions(codesISO2, false)

          // Handle Field Preffered
          FieldPreffered.setFieldValue(codesISO2, false)
          FieldPreffered.disableOptions(codesISO2, false)

          // Handle Field Only
          const fieldOnlyOptions = [...codesISO2] // clone array
          fieldOnlyOptions.push('european')

          FieldOnly.setFieldValue(fieldOnlyOptions, false)
          FieldOnly.disableOptions(fieldOnlyOptions, false)
          FieldOnly.setFieldValue('all', true)
        } else if (currentValue.includes('european')) {
          let onlyCountries = [...codesISO2European]
          onlyCountries = onlyCountries.concat(FieldOnly.getOptions('selected', 'value').remove('european'))

          // Handle Field Only
          FieldOnly.disableOptions(codesISO2European, true)

          // Handle Field Exclude
          FieldExclude.setFieldValue(codesISO2, false)
          FieldExclude.disableOptions(codesISO2, true)
          FieldExclude.disableOptions(onlyCountries, false)

          // Handle Field Preffered
          FieldPreffered.setFieldValue(codesISO2, false)
          FieldPreffered.disableOptions(codesISO2, true)
          FieldPreffered.disableOptions(onlyCountries, false)
        } else {
          // Handle Field Exclude
          FieldExclude.setFieldValue(codesISO2, false)
          FieldExclude.disableOptions(codesISO2, true)
          FieldExclude.disableOptions(currentValue, false)

          // Handle Field Preffered
          FieldPreffered.setFieldValue(codesISO2, false)
          FieldPreffered.disableOptions(codesISO2, true)
          FieldPreffered.disableOptions(currentValue, false)
        }
      })

      FieldExclude.handleOnChange((currentValue) => {
        // Concat disabled options
        const excludedOptions = FieldExclude.getOptions('unactive', 'value')
        currentValue = currentValue.concat(excludedOptions)

        // Handle Field Preffered
        FieldPreffered.setFieldValue(currentValue, false)
        FieldPreffered.disableOptions(codesISO2, false)
        FieldPreffered.disableOptions(currentValue, true)
      })
    }
  }
}
