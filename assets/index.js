const attributes = ['ticket.requester.name', 'ticket.requester.email', 'ticket.subject']

let compiled = ''
let appData = {
  user: {
    name: '',
    email: ''
  },
  ticket: {
    subject: ''
  }
}

client.get(attributes).then((data) => {
  appData.user.name = data['ticket.requester.name']
  appData.user.email = data['ticket.requester.email']
  appData.ticket.subject = data['ticket.subject']
  return client.metadata()
}).then((metadata) => {
  let textConfig = metadata.settings.config

  let config = []

  let currentBlock = {
    title: '',
    content: []
  }

  for (let i = 0; i < textConfig.split('\n').length + 1; i++) {

    let line = textConfig.split('\n')

    if (line[i] !== undefined) {

      switch (line[i].trim()) {

        case '-':
          currentBlock = {
            title: line[i + 2],
            content: []
          }
          config.push(currentBlock)
          break

        case 'IMAGE':
          currentBlock.content.push({
            type: 'image',
            data: {
              src: line[i + 1],
              alt: line[i + 2]
            }
          })
          break

        case 'TEXT':
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
          break

        case 'TABLE':
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
          break

        case 'BUTTON':
          currentBlock.content.push({
            type: 'button',
            data: {
              text: line[i + 1]
            }
          })
          break

        case 'MAP':
          currentBlock.content.push({
            type: 'map',
            data: {
              embed: line[i + 1]
            }
          })
          break

        case 'DATE':
          currentBlock.content.push({
            type: 'date',
            data: {
              placeholder: line[i + 1]
            }
          })
          break

        case 'INPUT':
          currentBlock.content.push({
            type: 'input',
            data: {
              placeholder: line[i + 1]
            }
          })
          break
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
  template += `<h3 class="u-semibold">${parseText(title)}</h3>`
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
    template += `<td>${parseText(cell.text)}</td>`
  })

  template += '</table>'

  compiled += template
}

function renderButton(data) {
  compiled += `<a href="#" class="c-btn btn-full">${parseText(data.text)}</a>`
}

function renderImage(data) {
  compiled += `<img src=${data.src} class="img-full" alt="${parseText(data.alt)}" title="${parseText(data.alt)}"/>`
}

function renderText(data) {
  compiled += '<div class="text-block">'
  data.text.split('\n').forEach((line) => {
    if (line !== '') {
      compiled += `<p>${parseText(line)}</p>`
    }
  })
  compiled += '</div>'
}

function renderDate(data) {
  compiled += `<input type="text" id="datepicker" placeholder="${parseText(data.placeholder)}"/>`
}

function renderInput(data) {
  compiled += `<input type="text" placeholder="${parseText(data.placeholder)}"/>`
}

function renderMap(data) {
  compiled += data.embed
}

function parseText(line) {
  const dcMatcher = /{{\s(\w*\.\w*)\s}}/g
  const contentMatcher = /(\w*\.\w*)/
  const boldMatcher = /\*([^.*?$]+)\*/g
  const italicMatcher = /\_([^.*?$]+)\_/g

  let dynamicContent = line.match(dcMatcher)
  let boldContent = line.match(boldMatcher)
  let italicContent = line.match(italicMatcher)

  if (dynamicContent !== null) {
    dynamicContent.forEach((content) => {
      let parsed = content.match(contentMatcher)
      line = line.replace(content, getDynamicContent(parsed[0]))
    })
  }

  if (boldContent !== null) {
    boldContent.forEach((content) => {
      let parsed = content.replace(/\*/g, '')
      line = line.replace(content, getBoldContent(parsed))
    })
  }

  if (italicContent !== null) {
    italicContent.forEach((content) => {
      let parsed = content.replace(/\_/g, '')
      line = line.replace(content, getItalicContent(parsed))
    })
  }

  return line
}

function getDynamicContent(q) {
  let query = q.split('.')

  if (query[0] === 'user') {
    switch (query[1]) {
      case 'name':
        return appData.user.name
        break
      case 'email':
        return appData.user.email
        break
    }
  }

  if (query[0] === 'ticket') {
    switch (query[1]) {
      case 'subject':
        return appData.ticket.subject
        break
    }
  }
}

function getBoldContent(word) {
  return `<strong>${word}</strong>`
}

function getItalicContent(word) {
  return `<em>${word}</em>`
}