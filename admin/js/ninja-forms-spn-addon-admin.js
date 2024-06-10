/**
 * Ninja Forms SPN Addon Admin JavaScript Code (Back-end)
 *
 * @since 1.0.0
 */

import { SyncCountriesChoice } from './modules/SyncCountriesChoice.js'
import { FieldCountryOrder } from './modules/Fields/FieldCountryOrder.js'

/**
 * Sync Admin Fields
 */
(function ($) {
  jQuery(function () {
    const target = document.body
    const config = {
      childList: true,
      subtree: true
    }

    // Create an observer instance.
    const observer = new MutationObserver(
      (mutationList, observer) => {
        if(document.getElementById('nf-drawer')) {
          // new SyncCountriesChoice(observer)
          new FieldCountryOrder('#country_order')

          observer.disconnect()
        }
      }
    )

    // Pass in the target node, as well as the observer config.
    observer.observe(target, config)
  })
})(jQuery)
