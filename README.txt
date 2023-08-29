=== Smart Phone Addon for Ninja Forms ===
Contributors: yaroslavborodii, max10110
Donate link: https://jdi.company
Tags: Smart Phone Addon, Ninja Forms, SPN, intlTelInput, International Telephone Input
Requires at least: 4.0
Tested up to: 6.3.0
Stable tag: 1.2.1
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Requires PHP: 7.0

This plugin is an addon to the Ninja Forms plugin. It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.

== Description ==

It adds a flag dropdown to any input, detects the user's country, displays a relevant placeholder and provides formatting/validation methods.

The Smart Phone is an addon to the Ninja Forms plugin. We use third part integration called <a href="https://github.com/jackocnr/intl-tel-input">intlTelInput</a>.

It's free absolutely.

== GitHub ==
If you have any problems or you want to downgrade the version, we recommend use GitHub.
Just change branch and download what you need.
<a href="https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms" target="_blank">Smart Phone for Ninja Forms on GitHub</a>

== Installation ==

This section describes how to install the plugin and get it working.

1. Upload `nf-smart-phone-addon` to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Look for Smart Phone in the Ninja Forms Dashboard

== Frequently Asked Questions ==

= Is it paid? =

No, it's free absolutely.
If you want to support us, see donate section.

= It doesn't work or my site was broken =

If your site was broken after activation our plugin,
please, create issue here: https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues
or write to us <a href="mailto:yaroslav.borodii@jdi.company">yaroslav.borodii@jdi.company</a>

== Screenshots ==

1. Screenshot 1. Front-end example. Default field (without changes).
2. Screenshot 2. Ninja Forms Admin Dashboard. Where field is located.
3. Screenshot 3. Front-end example. Modificated field by changing options from admin dashboard.
4. Screenshot 4. Some options that exist in the 'Restrictions' section of the field.

== Changelog ==

= 1.2.1 =
## What's Changed
* Bug Fix: **NF Form Multistep** plugin doesn't work with SPN
* Bug Fix: **NF Form Conditional logic** plugin doesn't work with SPN
* Bug Fix: **NF Form** doesn't send if SPN input is empty
* Bug Fix: **NF Form** throws error if **Separate Dial Code** wasn't chosen
* Bug Fix: SPN throws "out of stack" in Elementor & Default Country
* 13-spn-install-intltelinput-with-npm-not-static-files by @roman1923, @yaroslav-borodii  in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/14
* Restricted plugin run (only for Ninja forms, wp-ajax, User Frontend)
* Code Refactoring
* PHP Code Beautifier
* IntlTelInput version update to the 18.2.1

= 1.2.0 =
#### User Notes
- Fix and close issue [Phone Number disappears on "clear successfully completed form" event (#6)](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/6)

#### Dev Notes
- Add [JavaScript Standard](https://standardjs.com/)
- Code Refactoring
- Add package-lock.json to .gitignore
- Update jQuery dependency for Frontend (for now it uses WordPress jQuery style)
- Move JavaScript files to footer on Frontend

= 1.1.1 =
- Fix and close issue [Hot Fix | Critical Error (#8)](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/8)

= 1.1.0 =
* Fixed bug <a href="https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/1" target="_blank">Responsive issue in Elementor (#1)</a>.
* Closed <a href="https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/2" target="_blank">Elementor Builder plugin crash (#2)</a>. Cannot reproduce bug.
* Fixed bug <a href="https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/issues/3" target="_blank">Prefix not stored (#3)</a>.

= 1.0.3 =
* Fixed Incorrect Stable Tag
* Removed unnecessary options in package.json

= 1.0.2 =
* Removed JavaScript plugin `compression-webpack-plugin`. It compressed versions of assets to serve them with Content-Encoding (gz).
* Removed `.gz` files by WordPress requirement.
* Changed `webpack` mode from `development` to `production`.
* Improved `README.txt`.
* Fixed `package.json` (license, urls, version)
* Changed plugin URI to github repository.

= 1.0.1 =
* Changed plugin name by Wordpress requirement

= 1.0 =
* Init Ninja Forms Smart Phone Addon

== Upgrade Notice ==

= 1.1.0 =
NOTE:<br>if you have used custom code to add a country code to your submissions in WordPress, you can remove it.

= 1.0.3 =

= 1.0.2 =

= 1.0.1 =
