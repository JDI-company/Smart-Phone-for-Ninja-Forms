/**
 * Ninja Forms SPN Addon Admin JavaScript Code (Back-end)
 *
 * @since 1.0.0
 */

import { SyncCountriesChoice } from './modules/SyncCountriesChoice'

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.remove = function (value) {
  return this.filter(function (element) { return element !== value })
};

/**
 * SyncCountriesChoice
 */
(function ($) {
  jQuery(function () {
    const target = document.body
    const config = {
      childList: true
    }

    // Create an observer instance.
    const observer = new MutationObserver(
      (mutationList, observer) => new SyncCountriesChoice(observer)
    )

    // Pass in the target node, as well as the observer config.
    observer.observe(target, config)
  })
})(jQuery)
