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