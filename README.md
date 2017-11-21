# Dynamic 360

This app allows you to build your own app by providing data. All layout and styling will be handled automatically.

## How to use

In `app.js` there is an array called `config`. Inside that array, you can list as many objects as you like from the below list. The app will then take your configuration and display it - using best practice styling.

### Creating your first block

Here is a barebones start for creating the config object:

```javascript
let config = 
  [
    {
      title: 'My block name', // This is the name of the block section, it will be shown as a heading.
      content: [
        // This is where your block (listed below) will go...
      ]
    }
  ]
```

## List of all block types

### Image

Show an image. The only data needed here is a link to the source of the image, and an "alt" tag that will be used for accessibility (such as when you hover your mouse over the image).

```javascript
{
  type: 'image',
  data: {
    src: 'image.jpg',
    alt: 'An Image'
  }
}
```

### Table

Display a table. You need to provide how many columns the table has. This is so the styling can accurately manipulate the heading row.

The data array consists of a list of object, all of which should be "text: 'something'".

```javascript
{
  type: 'table',
  columns: 3,
  data: [
    {
      text: 'Name'
    },
    {
      text: 'Age'
    },
    {
      text: 'Class'
    },
    {
      text: 'Buk'
    },
    {
      text: '143'
    },
    {
      text: 'Barbarian'
    },
    {
      text: 'Braern Fenlynn'
    },
    {
      text: '633'
    },
    {
      text: 'Elf'
    }
  ]
}
```

### Button

Display a button. The data needed for a button is the text to display on it, and a href link to where you want to be redirected. For the purposes of demonstration it is best to leave it as '#'.

```javascript
{
  type: 'button',
  data: {
    text: 'Click me!',
    href: '#'
  }
}
```

### Text

Display some text. The only data here is a text parameter with what you want to display.

```javascript
{
  type: 'text',
  data: {
    text: 'The previous owner took care of this car for the past 5 years.'
  }
}
```