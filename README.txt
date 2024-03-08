=== Smart Phone Addon for Ninja Forms ===
Contributors: yaroslavborodii, max10110
Donate link: https://jdi.company
Tags: Smart Phone Addon, Ninja Forms, SPN, intlTelInput, International Telephone Input
Requires at least: 6.0
Tested up to: 6.4.3
Stable tag: 1.3.0
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

= Compatibility with Ninja Forms addons =
- Ninja Forms:⠀⠀⠀⠀⠀⠀⠀OK | v3.8.0
- NF Conditional Logic:⠀ OK | v3.1
- NF Multi-Part Forms: ⠀ OK | v3.0.26
- NF Layout and Styles: ⠀OK | v3.0.29

== Screenshots ==

1. Screenshot 1. Front-end example. Default field (without changes).
2. Screenshot 2. Ninja Forms Admin Dashboard. Where field is located.
3. Screenshot 3. Front-end example. Modificated field by changing options from admin dashboard.
4. Screenshot 4. Some options that exist in the 'Restrictions' section of the field.

== Changelog ==

= 1.3.0 =
#### What's Changed
- Create dependabot.yml by @yaroslav-borodii in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/24
- Bump gulp-autoprefixer from 8.0.0 to 9.0.0 by @dependabot in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/25
- feat: Wordpress version checker by @yaroslav-borodii in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/29
- fix: Couldn't get the repository readme by @yaroslav-borodii in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/30
- Add Field Validation by @BrassyDANYL in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/26
- Bump browser-sync from 2.29.3 to 3.0.2 by @dependabot in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/27
- Bump intl-tel-input from 18.5.3 to 19.5.6 by @dependabot in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/37
- [fix: Remove unusable mutation observer package](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/commit/36b635f52d29922207df5afa8dcf93cccdc9d98f)
- [Add .gitattributes file for clean Release archive](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/commit/4eba1bc25f57361d7b5c7887ea90048615677728)
- [fix: Major intltelinput update breaks SPN validation functionallity](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/37/commits/b0430d3daa3517b18ed420e5720206f0fdfca373)
- [fix: gulp-concat bumped CommonJS support](https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/37/commits/f08e791eec886e31b3bb9361fad382053ac33042)

= 1.2.2 =
#### What's Changed
- Check plugin for compatibility with PHP version 8.2 & WordPress 6.3.2
- Bug Fix: CSS fix by @haet in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/21

= 1.2.1 =
#### What's Changed
- Bug Fix: **NF Form Multistep** plugin doesn't work with SPN
- Bug Fix: **NF Form Conditional logic** plugin doesn't work with SPN
- Bug Fix: **NF Form** doesn't send if SPN input is empty
- Bug Fix: **NF Form** throws error if **Separate Dial Code** wasn't chosen
- Bug Fix: SPN throws "out of stack" in Elementor & Default Country
- 13-spn-install-intltelinput-with-npm-not-static-files by @roman1923, @yaroslav-borodii  in https://github.com/JDI-company/Smart-Phone-for-Ninja-Forms/pull/14
- Restricted plugin run (only for Ninja forms, wp-ajax, User Frontend)
- Code Refactoring
- PHP Code Beautifier
- IntlTelInput version update to the 18.2.1

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
