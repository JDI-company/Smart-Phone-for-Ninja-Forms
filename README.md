# Ninja Forms SPN Addon
Wordpress plugin for entering and validating international telephone numbers based on [International Telephone Input.](https://github.com/jackocnr/intl-tel-input) It adds new field to [Ninja Forms](https://ninjaforms.com/), a (searchable) country dropdown to any input, detects the user's country, displays a relevant placeholder number, formats the number as you type, and provides comprehensive validation methods.

<img alt="International Telephone Input" width="238" height="276" src="https://camo.githubusercontent.com/4bb218ca834ec5acca43c965432c1014cab16f6d32119d469e1242d47d449d5d/68747470733a2f2f7261772e6769746875622e636f6d2f6a61636b6f636e722f696e746c2d74656c2d696e7075742f6d61737465722f73637265656e73686f74732f76616e696c6c612d7365617263682e706e67">

## Installation
1. Install using the WordPress built-in Plugin installer, or Extract the zip file and drop the contents in the wp-content/plugins/ directory of your WordPress installation.
2. Activate ‘Ninja Forms‘ plugin through the ‘Plugins’ menu in WordPress.
3. Activate ‘Smart Phone Addon for Ninja Forms‘ plugin through the ‘Plugins’ menu in WordPress.
4. Go to Ninja Forms > Add New.
5. Press the ‘Add new field‘ button.
6. Select ‘Smart Phone‘ field.
7. Change the settings in the Restrictions section to suit your needs (play with [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--vanilla)).

<img width="911" alt="Smart Phone" src="https://user-images.githubusercontent.com/46939084/204000296-ba449c62-6d09-4fab-bd84-cbc657b7a9ce.png">

## Features
* **Allow IP Lookup**

<img width="600" alt="IP Lookup" src="https://user-images.githubusercontent.com/46939084/204006934-5ac1d6df-848f-436d-82ac-dd0e62f67b03.png">

Change default country depends on user IP
* **Show Selected Dial Code**

<img alt="Show Selected Dial Code" width="257" height="46" src="https://camo.githubusercontent.com/0d223e231ced86183d286196d3cab6e411f677f6695efa625dabdd44d0b4f65e/68747470733a2f2f7261772e6769746875622e636f6d2f6a61636b6f636e722f696e746c2d74656c2d696e7075742f6d61737465722f73637265656e73686f74732f73657061726174654469616c436f64652e706e67">

Display the country dial code next to the selected flag. Play with this option on [Storybook](https://intl-tel-input.com/storybook/?path=/docs/intltelinput--separateDialCode) (using the React component).

* **Default Country**

<img width="600" alt="Default Country" src="https://user-images.githubusercontent.com/46939084/204008019-65500e12-06ae-4503-b0a5-a42a0fbc78ed.png">

Country in the input by default
* **Preferred Countries**

<img width="600" alt="Preferred Countries" src="https://user-images.githubusercontent.com/46939084/204008199-69d512ee-2652-4375-8302-6ca3c4940a2d.png">

Specify the countries to appear at the top of the list.
* **Only Countries**

<img width="600" alt="Only Countries" src="https://user-images.githubusercontent.com/46939084/204008692-8ee05c63-5743-4386-8027-4dd4460f22ea.png">

In the dropdown, display only the countries you specify
* **Allow Dropdown**

<img width="600" alt="Allow Dropdown" src="https://user-images.githubusercontent.com/46939084/204009492-6ea4550a-f9db-49bc-abd7-b08ad00c1eec.png">

Whether or not to allow the dropdown. If disabled, there is no dropdown arrow, and the selected flag is not clickable. Also we display the selected flag on the right instead because it is just a marker of state.
* **National Mode**

<img width="600" alt="National Mode" src="https://user-images.githubusercontent.com/46939084/204010304-f3e80ac5-d6ec-4e6f-b405-6e99758e4937.png">

Allow users to enter national numbers (and not have to think about international dial codes).
* **Auto Hide Dial Code**

<img width="600" alt="Auto Hide Dial Code" src="https://user-images.githubusercontent.com/46939084/204010466-368185d0-ece6-477c-8176-a0e2a9356829.png">

If there is just a dial code in the input: remove it on blur or submit. This is to prevent just a dial code getting submitted with the form. Requires nationalMode to be set to false.
* **Exclude Countries**

<img width="600" alt="Exclude Countries" src="https://user-images.githubusercontent.com/46939084/204010658-4e66abcb-453a-4382-9ded-70bb950e332d.png">

In the dropdown, display all countries except the ones you specify here.
* **Format On Display**

<img width="600" alt="Format On Display" src="https://user-images.githubusercontent.com/46939084/204010814-64c5bb1d-7ee7-4df2-ba72-f93fd1d9f36d.png">

Format the input value (according to the National Mode option) 

## Compatibility with Ninja Forms addons
- Ninja Forms: OK | v3.8.0
- NF Conditional Logic: OK | v3.1
- NF Multi-Part Forms: OK | v3.0.26
- NF Layout and Styles: OK | v3.0.29
