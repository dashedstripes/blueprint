# Dynamic 360

This app allows you to build your own static Zendesk app. You provide the data and all layout and styling will be handled automatically.

This readme is split into two sections. If you are looking to just install the app and configure it within Zendesk, read the "For Users" section. If you're a developer interested in how the config works inside the app, read the "For Developers" section.

## For Users

I think the best way to explain how to write config for this app will be to show an example config, then explain what each part means. The below example shows everything you can do in your config.

```
-

Panamera 4 Executive

IMAGE
https://loremflickr.com/320/240
A random picture

-

Details

TABLE
3
Power
Acceleration
Drive
243 kW
2.3 Seconds
All Wheel Drive

BUTTON
Show Details
#

-

Find a Service Centre

MAP
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.0791598488554!2d-0.483142684169452!3d51.346454979609156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876761d51b1c793%3A0xa1b9f87e35b40c23!2sPorsche+Service+Centre+Brooklands!5e0!3m2!1sen!2suk!4v1511345317754" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

-

Schedule an Inspection

DATE
Select a Date...

INPUT
Additional Notes...

BUTTON
Book
#

-

Additional Information

TEXT
The previous owner took care of this car for the past 5 years.
He did a great job of it, don't you worry.
```

Each section of an app begins with a ```-``` and a title for the section.

```
-

Panamera 4 Executive

```

Once you have the start of a block and a title, you can begin to add content.

```
IMAGE
https://urltothepicture.com/picture.jpg
The alt/title text for the image

TABLE
The number of rows
A list of cells going from left to right

BUTTON
The text to show on the button
Where the button will link to

MAP
An IFrame link taken from google maps

DATE
The placeholder text for a datepicker

INPUT
The placeholder text for an input field

```

Breaks between lines are very important for the text parsing to work correctly.

## For Developers

### Creating your first block

Here is a barebones start for creating the config object:

```javascript
let config = 
  [
    {
      title: 'My block name', // This is the name of the block section, it will be shown as a heading.
      content: [
        // This is where your blocks (listed below) will go...
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

### Input

Display a text input. Only data needed is the placeholder text.

```javascript
{
  type: 'input',
  data: {
    placeholder: 'Enter your input here...'
  }
}
```

### Date

Display a datepicker. Again, the only data needed is the placeholder text.

```javascript
{
  type: 'date',
  data: {
    placeholder: 'Select a Date...'
  }
}
```

### Map

Display an embeded Google Map. To get this working you will need to find the embed code from Google Maps of the place you wish to display. On Google Maps there is a link to "Share or embed map", once you've clicked that select "Embed map", then copy the code that it provides. It should look like the following:

```<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19859.110532725816!2d-0.17612799999999998!3d51.524428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1511345810993" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>```

```javascript
{
  type: 'map',
  data: {
    embed: 'Here is where you paste the google maps embed code.'
  }
}
```