# Dynamic 360

A Zendesk ticket app that allows you to create your own static app from a plain text file.

## Getting Started

Download this repo as a ```.zip``` file, and install it to your Zendesk instance. In the Zendesk app settings, there will be a "config" field.

The config is made up of a list of sections. A section begins with the ```-``` character, and ends the line before the next ```-```.

Each section consists of a ```title```, and a list of ```blocks```. 

This is an example section containing an image ```block``` and a button ```block```

```
-

Panamera 4 Executive

IMAGE
https://loremflickr.com/320/240
A picture of a car

BUTTON
Press me!
#

```

As you can see, each block begins with a capitalized word (```IMAGE```, ```BUTTON```). The following lines are all to do with the block. The block ends at the next blank line.

For example, the ```IMAGE``` block has two lines below it that provide the data needed to display an image.

```
IMAGE
The URL of the image
The alt/title text for the image (what is the image of)
```

The same basic block structure is used for every block that you can use.

Here is a list of all block types with their corosponding parameters. After this I'll show how to fill them out using "real" data. Lastly I'll show these blocks inside of a completed config file.

### Block Types

```
IMAGE
The URL of the image
The alt/title text for the image

TABLE
The number of rows
A list of cells going from left to right, separated by commas, a row at a time.

MAP
An IFrame link taken from google maps

DATE
The placeholder text for a datepicker

INPUT
The placeholder text for an input field

BUTTON
The text to show on the button
Where the button will link to
```

### Example Blocks

```
IMAGE
https://linkto.com/myimage.jpg
This is an image.

TABLE
2
ID, Status
10042, Activated
37258, Suspended

MAP
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5017.765014101546!2d-0.1786033289063308!3d51.514460882632704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ab2b05500a7%3A0x749d07ad72bbbe13!2sPaddington+London+Underground+Station!5e0!3m2!1sen!2suk!4v1511535243058" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

DATE
Select a date...

INPUT
Type something...

BUTTON
Click me
#
```

### Completed Example Config

Finally it's probably useful to see the above blocks in the context of a full configuration file.

```
-

My Image

IMAGE
https://linkto.com/myimage.jpg
This is an image.

-

A table of stuff

TABLE
2
ID, Status, 10042
Activated, 37258, Suspended

-

A map of Paddington

MAP
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5017.765014101546!2d-0.1786033289063308!3d51.514460882632704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ab2b05500a7%3A0x749d07ad72bbbe13!2sPaddington+London+Underground+Station!5e0!3m2!1sen!2suk!4v1511535243058" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>

-

A little form

DATE
Select a date...

INPUT
Type something...

BUTTON
Click me
#
```