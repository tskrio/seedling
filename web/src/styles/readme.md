# SMACSS

SMACSS stands for Scalable and Modular Architecture for CSS. The main goal of the approach is to reduce the amount of code and simplify code support.

Documentation: http://smacss.com/book/
CSS Tricks: https://css-tricks.com/methods-organize-css/#smacss

## How are these files structured?

### base.css

These are the styles of the base elements of the application.

- body
- input
- button
- etc

Use html tags and attribute to style the elements.

In rare cases classes are used to style the elements.

### layout.css

These are the styles of the global layout of the application.

The size of the cap, footer, sidebar, etc.

Use id to style the elements.

### modules.css

These are blocks that can be used multiple times on a single page.
type-module


