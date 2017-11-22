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

let compiled = ''

config.forEach((block) => {
  renderBlock(block)
})

setTimeout(() => {
  client.invoke('resize', { width: '100%', height: $('#app').height() + 'px' })
}, 500)

function renderBlock(block) {
  compiled += '<div class="block">'
  renderBlockTitle(block.title)
  renderBlockContent(block.content)
  compiled += '</div>'
}

function renderBlockTitle(title) {
  let template = ''
  template += `<h3 class="u-semibold">${title}</h3>`
  compiled += template
}

function renderBlockContent(content) {
  content.forEach((item) => {
    switch (item.type) {
      case 'table':
        renderTable(item.data, item.columns)
        break;
      case 'button':
        renderButton(item.data)
        break;
      case 'image':
        renderImage(item.data)
        break;
      case 'text':
        renderText(item.data)
        break;
      case 'date':
        renderDate(item.data)
        break;
      case 'input':
        renderInput(item.data)
        break;
      case 'map':
        renderMap(item.data)
        break;
    }
  })
}

function renderTable(data, columns) {

  let template = '<table>'

  data.forEach((cell, index) => {
    if (index % columns === 0) {
      if (index < columns) {
        template += '<tr class="table-heading">'
      } else {
        template += '<tr>'
      }
    }
    template += `<td>${cell.text}</td>`
  })

  template += '</table>'

  compiled += template
}

function renderButton(data) {
  compiled += `<a href=${data.href} class="c-btn btn-full">${data.text}</a>`
}

function renderImage(data) {
  compiled += `<img src=${data.src} class="img-full" alt="${data.alt}" title="${data.alt}"/>`
}

function renderText(data) {
  compiled += `<p>${data.text}</p>`
}

function renderDate(data) {
  compiled += `<input type="text" id="datepicker" placeholder="${data.placeholder}"/>`
}

function renderInput(data) {
  compiled += `<input type="text" placeholder="${data.placeholder}"/>`
}

function renderMap(data) {
  compiled += data.embed
}

$('#app').html(compiled)
$('#datepicker').datepicker()