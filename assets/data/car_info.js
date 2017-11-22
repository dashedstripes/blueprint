let config =
  [
    {
      title: 'Panamera 4 Executive',
      content: [
        {
          type: 'image',
          data: {
            src: 'https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/916x515/quality/95/https://s.blogcdn.com/slideshows/images/slides/715/583/5/S7155835/slug/l/roadster-front-34-1.jpg',
            alt: 'A picture of a car.'
          }
        }
      ]
    },
    {
      title: 'Details',
      content: [
        {
          type: 'table',
          columns: 3,
          data: [
            {
              text: 'Power'
            },
            {
              text: 'Acceleration'
            },
            {
              text: 'Drive'
            },
            {
              text: '243 kW'
            },
            {
              text: '2.3 Seconds'
            },
            {
              text: 'All Wheel Drive'
            }
          ]
        },
        {
          type: 'button',
          data: {
            text: 'Show Details',
            href: '#'
          }
        }
      ]
    },
    {
      title: 'Optional Extras',
      content:
        [
          {
            type: 'table',
            columns: 1,
            data: [
              {
                text: 'Winter Wheels'
              },
              {
                text: '20 Inch Panamera'
              }
            ]
          }
        ]
    },
    {
      title: 'Find a Service Centre',
      content:
        [
          {
            type: 'map',
            data: {
              embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2492.0791598488554!2d-0.483142684169452!3d51.346454979609156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876761d51b1c793%3A0xa1b9f87e35b40c23!2sPorsche+Service+Centre+Brooklands!5e0!3m2!1sen!2suk!4v1511345317754" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'
            }
          }
        ]
    },
    {
      title: 'Schedule an Inspection',
      content:
        [
          {
            type: 'date',
            data: {
              placeholder: 'Select a Date...'
            }
          },
          {
            type: 'input',
            data: {
              placeholder: 'Additional Notes...'
            }
          },
          {
            type: 'button',
            data: {
              text: 'Book',
              href: '#'
            }
          }
        ]
    },
    {
      title: 'Additional Information',
      content:
        [
          {
            type: 'text',
            data: {
              text: 'The previous owner took care of this car for the past 5 years.'
            }
          }
        ]
    }
  ]