/**
 * Ninja Forms SPN Addon Public JavaScript Code (Front-end)
 *
 * @since 1.0.0
 */

/* eslint no-extend-native: ["error", { "exceptions": ["Array"] }] */
Array.prototype.remove = function (value) {
  return this.filter(function (element) { return element !== value })
}

const $ = jQuery

// Get All Countries Codes from intTelInput
const allCountries = [...window.intlTelInputGlobals.getCountryData()]

// Set All ISO2 codes
const codesISO2 = allCountries.map((country) => {
  return country.iso2
})

// Set European ISO2 codes
const codesISO2European = ['al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cz', 'dk',
  'ee', 'fo', 'fi', 'fr', 'de', 'gi', 'gr', 'va', 'hu', 'is', 'ie', 'it', 'lv',
  'li', 'lt', 'lu', 'mk', 'mt', 'md', 'mc', 'me', 'nl', 'no', 'pl', 'pt', 'ro',
  'ru', 'sm', 'rs', 'sk', 'si', 'es', 'se', 'ch', 'ua', 'gb']

function submitFormInitialize($parentElement) {
  let $inputPath = $parentElement.find('.spn-container input[type="tel"]');

  $($inputPath).each(function () {
    const $input = $(this)

    let onlyCountries = $input.data('only-countries').split(',')
    if (onlyCountries.includes('all')) {
      onlyCountries = codesISO2
    } else if (onlyCountries.includes('european')) {
      onlyCountries = onlyCountries.remove('european')
      onlyCountries = onlyCountries.concat(codesISO2European)
    }

    const preferredCountries = $input.data('preffered-countries').split(',')
    let defaultCountry = $input.data('default-country')
    const allowDropdown = Boolean($input.data('allow-dropdown'))
    const nationalMode = Boolean($input.data('national-mode'))
    const autoHideDialCode = Boolean($input.data('auto-hide-dial-code'))

    let excludeCountries = $input.data('exclude-countries')
    if (excludeCountries) {
      excludeCountries = excludeCountries.split(',')
    }

    let allowIpLookUp = Boolean($input.data('allow-ip-lookup'))
    if (allowIpLookUp) {
      allowIpLookUp = function (success, failure) {
        $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
          const countryCode = (resp && resp.country) ? resp.country : defaultCountry
          success(countryCode)
        })
      }
      defaultCountry = 'auto'
    } else {
      allowIpLookUp = null
    }

    const separateDialCode = Boolean($input.data('separate-dial-code'))
    const formatOnDisplay = Boolean($input.data('format-on-display'))

    $input.intlTelInput({
      initialCountry: defaultCountry,
      preferredCountries,
      onlyCountries,
      allowDropdown,
      nationalMode,
      autoHideDialCode,
      excludeCountries,
      geoIpLookup: allowIpLookUp,
      separateDialCode,
      formatOnDisplay,
      utilsScript: '../../vendor/intl-tel-input-master/build/js/utils.js'
    })
  })
}  

function initSPN () {
  'use strict'

  const initInputOnFormLoad = Marionette.Object.extend({
    initialize: function () {
      this.listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputOnFormLoad);
    },

    initInputOnFormLoad: function (model) {
      let $parentElement = $(model.el)
      submitFormInitialize($parentElement)
      let targetNode = $parentElement.parent()[0];

      let observer = new MutationObserver(function(mutationsList) {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            submitFormInitialize($parentElement)
          }
        }
      });

      let config = { attributes: true, childList: true, subtree: true };
      observer.observe(targetNode, config);
    }
  })

  new initInputOnFormLoad()

  let $phoneHidden;

  const syncPhoneNumber = Marionette.Object.extend({
    initialize: function () {
      this.listenTo(Backbone.Radio.channel('fields'), 'change:modelValue', this.syncPhoneNumber)
      this.listenTo(Backbone.Radio.channel('fields'), 'before:submit', this.submitForm)
    },
    
    syncPhoneNumber: function (model) {
      if (model.get('type') === 'spn' && model.get('value') !== '' && !isNaN(Number(model.get('value')))) {
        const modelID = model.get('id')

        const $phone = $('#nf-field-' + modelID)
        const $wrapper = $phone.parents('nf-field')
        $phoneHidden = $wrapper.find('#nf-field-' + modelID + '-hidden')

        const countryCode = $wrapper.find('.iti__selected-flag').attr('title').match(/[+\d]+/g).join('')

        $phoneHidden.val(countryCode + $phone.val())
      }
    },

    submitForm: function (model) {
      if(model.get('type') === 'spn') {
        model.set('value', $phoneHidden.val())
      }
    }
  })

  new syncPhoneNumber()
}

initSPN()
