# ScandiWeb TEST

https://www.figma.com/file/MSyCAqVy1UgNap0pvqH6H3/Junior-Frontend-Test-Designs-(Public)?node-id=150%3A5

### DANTE MUNIZ TORRES
April 2022

### Libraries used:
- React
- apollo/client.
- react-router-dom.

## WORK PLANNING 

### STAGE 1: Start. Time: 1/2 week.

First approach to tasks.

Web structure and components definition.


### STAGE 2: Functionality. Time: 1 week.

Bring information.

Show information.


### STAGE 3: Styles. Time: 1 week.

Apply styles to each component.


## AFTER FEEDBACK

### Please check errors on product build, I had an issues with missing 'react-dom', maybe package.json should be updated

### Out of stock products can be viewed but not possible to add to cart
Checked: now products "out of stock" can be added to cart.

### Please install eslint and fix all eslint issues
Checked: eslint issues fixed

### Prices should have two numbers after dot always
Checked

### Prefer to use PureComponent instead of Component
Checked. Cart article was kept as a Component to allow the quantity product number actualize in both cart and mini cart

### Please use variable destructuring
Checked

### Prefer to use const instead of var and let
Checked

### Please structure your gql queries in separate file and import in needed places
Checked. Apollo client and queries placed in separate files.



## AFTER SECOND SUBMISSION.

### Category switcher have different highlight on hover
Checked.Also changed border-radius and padding in box.

### Wrong font is used
Checked.

### Products in row should be aligned to the left and have static gap between per design
Checked. Removed space-bettween and space-evenly, added static margin

### Cart item qty should be sum of all items, for 3 Jackets and 1 Pant should display 4, not 2
Checked.

### It should be possible to remove a product from the Cart Overlay, remove should happen on '-' click when qty is 1
Checked.

### Quick shop icon should be displayed for all in stock products on PLP and only on product card hover, if product have options to select quickshop should redirect to PDP
Checked.

### Product with same product options should stack in cart
Checked.

### After add to cart user should stay on PDP no need to redirect
Checked.

### On PLP products should have brand that should be concatenated with product name
Checked.

### Out of stock products have wrong design
Checked.

### Out of stock products should have out of stock label on PDP too
Checked.

### Out of stock products shouldn???t be possible to add to cart, only view info
Checked.


### Cart page should have total, qty and tax data as in design
Checked

### Product images on cart page should be possible to switch, they should have arrows as in design
Checked.

### Not possible to remove items at all
Checked.

### Product description is not rendered as html, please use parser
(The description is rendered as html in the browser)

### On category page should be requested current category not used ???all??? category everywhere and should be requested only needed data (For example product description definitely not needed for PLP)
Checked.

### On PDP should be requested only product data
Checked.

### Showing modal using querySelector and style prop is bad approach, just use state or global state
Checked.

### Please refactor querySelectors that approach is bad

### Please use variable destructuring
Checked.



## AFTER THIRD SUBMISSION


### Product description is not rendered as html, please use parser - can ignore

With graphqls it is easily to structure requests where can specify what fields to request
Checked.

### Should not be requested any categories, or other data, only one current product and it's data
Checked.

### Please fix query usage, for now all data is requested on all category on first page load, but it???s not correct approach, if category is changed new data for current category should be loaded and same goes for product page, on PDP should be requested current product data for example if I???m now refreshing page on any PDP I???ll see blank page as no data is loaded
Checked.

### Rendering modals using redux for global stage management
Checked. I had to use some functional components to be able to use react-redux. React.Context was used in MiniCart overlay and Cart to avoid turning them into functional components


muniztorresdante@gmail.com
