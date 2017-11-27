let compiled = ''

client.metadata().then((metadata) => {
  let textConfig = metadata.settings.config

  let config = []

  let currentBlock = {
    title: '',
    content: []
  }

  for (let i = 0; i < textConfig.split('\n').length + 1; i++) {

    let line = textConfig.split('\n')

    if (line[i] !== undefined) {

      if (line[i].trim() === '-') {
        currentBlock = {
          title: line[i + 2],
          content: []
        }
        config.push(currentBlock)
      }

      if (line[i].trim() === 'IMAGE') {
        currentBlock.content.push({
          type: 'image',
          data: {
            src: line[i + 1],
            alt: line[i + 2]
          }
        })
      }

      if (line[i].trim() === 'TEXT') {
        let textData = ''
        for (let j = i + 1; j < textConfig.split('\n').length; j++) {
          if (line[j] === '') {
            break
          }
          textData += line[j] + '\n'
        }
        currentBlock.content.push({
          type: 'text',
          data: {
            text: textData
          }
        })
      }

      if (line[i].trim() === 'TABLE') {
        let tableData = []
        let numOfCols = 0
        for (let j = i + 1; j < textConfig.split('\n').length; j++) {
          if (line[j] === '') {
            break
          }
          numOfCols = line[j].split(', ').length
          line[j].split(', ').forEach((cell) => {
            tableData.push({
              text: cell
            })
          })
        }
        currentBlock.content.push({
          type: 'table',
          columns: numOfCols,
          data: tableData
        })
      }

      if (line[i].trim() === 'BUTTON') {
        currentBlock.content.push({
          type: 'button',
          data: {
            text: line[i + 1]
          }
        })
      }

      if (line[i].trim() === 'MAP') {
        currentBlock.content.push({
          type: 'map',
          data: {
            embed: line[i + 1]
          }
        })
      }

      if (line[i].trim() === 'DATE') {
        currentBlock.content.push({
          type: 'date',
          data: {
            placeholder: line[i + 1]
          }
        })
      }

      if (line[i].trim() === 'INPUT') {
        currentBlock.content.push({
          type: 'input',
          data: {
            placeholder: line[i + 1]
          }
        })
      }

    }

  }

  config.forEach((block) => {
    renderBlock(block)
  })

  $('#app').html(compiled)
  $('#datepicker').datepicker()

  setTimeout(() => {
    client.invoke('resize', { width: '100%', height: $('#app').height() + 'px' })
  }, 500)
})

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
  compiled += `<a href="#" class="c-btn btn-full">${data.text}</a>`
}

function renderImage(data) {
  compiled += `<img src=${data.src} class="img-full" alt="${data.alt}" title="${data.alt}"/>`
}

function renderText(data) {
  compiled += '<div class="text-block">'
  data.text.split('\n').forEach((line) => {
    if (line !== '') {
      compiled += `<p>${line}</p>`
    }
  })
  compiled += '</div>'
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