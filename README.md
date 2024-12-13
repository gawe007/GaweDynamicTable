# GaweDynamicTable
 My own HTML Dynamic Table created with vanilla JS & CSS. This Class convert an Array of Javascipt Object into a HTML Dynamic Table. See parameter, accepted data structure and usage/examples to use this in your need.  

## Feature
- Automatic Object translation into HTML Elements.
- Data search based on selected column.
- Auto pagination for viewing.
- The table can be minimized or resized.

## Parameter
 - Table Name = "Your Table Name" [String]
 - Data = see Data Structure [Array]
 - Parent Element = Your parent container. This table will be appended as last child inside. [HTMLElement]
 - Number data per page = Maximum rows displayed per page. If not specified, default is 10. [Number]

## Data Structure
This class accept an Array of Objects to be translated into HTMLElements. The structure accepted are :
```javascript
let data = [
  {column1 : data, column2 : data},
  {column1 : data, column2 : data},
  ....
  {column1 : data, column2 : data}
];
```
The column name is the PropertyName. It's used as the Table Header Name for that Column. The number of column is not limited but i suggest to keep it below 5 to make sure the view rendered is not ugly or overflows.

The data is the PropertyValue. It accept any kind of string, number or UTF-8 symbol. It's suggested to minimize your data length to preserve the view or the overflow will be hidden.

## Usage/Examples
1. Include the css file inside your html document.

```html
<link rel="stylesheet" href="DynamicTableGawe007.css"/>
```
2. Make sure to call the script before creating your table by calling <script> before any use. Alternatively, you can place this <script> tag on the very top of your page.

```html
<script src="DTgawe.js" type="text/javascript"></script>
```
3. Call your container element or create a new element as the parent element.

```javascript
const parentElement = document.createElement("div");
```
4. Create table by creating a new DTGawe object.

```javascript
const table = new DTgawe("MyTable", data, parentElement, 10);
```

Or just download all the files and open the index.html with an editor or a browser.
