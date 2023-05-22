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

  function initIntlTelInput($parentElement) {
    // Find the input element within the parent element with class 'spn-container' and type 'tel'
    let $inputPath = $parentElement.find('.spn-container input[type="tel"]');
  
    // Iterate over each input element
    $($inputPath).each(function () {
      const $input = $(this);
  
      // Extract the list of allowed countries from the 'data-only-countries' attribute
      let onlyCountries = $input.data('only-countries').split(',');
      if (onlyCountries.includes('all')) {
        // If 'all' is included in the allowed countries list, replace it with all available country codes
        onlyCountries = codesISO2;
      } else if (onlyCountries.includes('european')) {
        // If 'european' is included in the allowed countries list, remove it and add only European country codes
        onlyCountries = onlyCountries.remove('european');
        onlyCountries = onlyCountries.concat(codesISO2European);
      }
  
      // Extract other data attributes
      const preferredCountries = $input.data('preffered-countries').split(',');
      let defaultCountry = $input.data('default-country');
      const allowDropdown = Boolean($input.data('allow-dropdown'));
      const nationalMode = Boolean($input.data('national-mode'));
      const autoHideDialCode = Boolean($input.data('auto-hide-dial-code'));
  
      // Extract the list of excluded countries from the 'data-exclude-countries' attribute
      let excludeCountries = $input.data('exclude-countries');
      if (excludeCountries) {
        excludeCountries = excludeCountries.split(',');
      }
  
      // Extract the value of 'data-allow-ip-lookup' attribute
      let allowIpLookUp = Boolean($input.data('allow-ip-lookup'));
      if (allowIpLookUp) {
        // If IP lookup is allowed, define a callback function that retrieves the user's country code from 'https://ipinfo.io'
        allowIpLookUp = function (success, failure) {
          $.get('https://ipinfo.io', function () {}, 'jsonp').always(function (resp) {
            const countryCode = (resp && resp.country) ? resp.country : defaultCountry;
            success(countryCode);
          });
        };
        defaultCountry = 'auto';
      } else {
        allowIpLookUp = null;
      }
  
      // Extract other data attributes
      const separateDialCode = Boolean($input.data('separate-dial-code'));
      const formatOnDisplay = Boolean($input.data('format-on-display'));
  
      // Initialize the intlTelInput plugin with the extracted data attributes
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
      });
    });
  }
  
  function initSPN () {
    'use strict';
  
    // Initialize input elements on form load
    const initInputOnFormLoad = Marionette.Object.extend({
      initialize: function () {
        // Listen to the 'render:view' event on the 'form' channel
        this.listenTo(Backbone.Radio.channel('form'), 'render:view', this.initInputOnFormLoad);
      },
  
      initInputOnFormLoad: function (model) {
        // Get the parent element of the model's view
        let $parentElement = $(model.el);
  
        // Initialize intlTelInput on the parent element
        initIntlTelInput($parentElement);
  
        // Set up a MutationObserver to detect changes in the DOM and re-initialize intlTelInput
        let targetNode = $parentElement.parent()[0];
        let observer = new MutationObserver(function(mutationsList) {
          for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
              initIntlTelInput($parentElement);
            }
          }
        });
  
        let config = { attributes: true, childList: true, subtree: true };
        observer.observe(targetNode, config);
      }
    });
  
    new initInputOnFormLoad();
  
    let $phoneHidden;
  
    // Synchronize the phone number with a hidden input field
    const syncPhoneNumber = Marionette.Object.extend({
      initialize: function () {
        // Listen to the 'change:modelValue' event on the 'fields' channel
        this.listenTo(Backbone.Radio.channel('fields'), 'change:modelValue', this.syncPhoneNumber);
        // Listen to the 'before:submit' event on the 'fields' channel
        this.listenTo(Backbone.Radio.channel('fields'), 'before:submit', this.submitForm);
      },
      
      syncPhoneNumber: function (model) {
        // Check if the model type is 'spn' and the value is not empty and a valid number
        if (model.get('type') === 'spn' && model.get('value') !== '' && !isNaN(Number(model.get('value')))) {
          const modelID = model.get('id');
  
          // Get the phone input element and the wrapper element
          const $phone = $('#nf-field-' + modelID);
          const $wrapper = $phone.parents('nf-field');
  
          // Get the hidden input element for the phone number
          $phoneHidden = $wrapper.find('#nf-field-' + modelID + '-hidden');
  
          // Extract the country code from the selected flag and update the hidden input value
          const countryCode = $wrapper.find('.iti__selected-flag').attr('title').match(/[+\d]+/g).join('');
          $phoneHidden.val(countryCode + $phone.val());
        }
      },
  
      submitForm: function (model) {
        // Check if the model type is 'spn' and update its value with the hidden input value
        if(model.get('type') === 'spn') {
          model.set('value', $phoneHidden.val());
        }
      }
    });
  
    new syncPhoneNumber();
  }
  
  // Initialize SPN functionality
  initSPN();
