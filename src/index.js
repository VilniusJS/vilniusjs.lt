const { parse } = require('csv-parse/sync')
const { writeFileSync, readdirSync, readFileSync, write } = require('fs')

const readMeetups = () => 
  readdirSync(`${__dirname}/data`)
  .map((filename) => {
    const page = filename.substr(0, filename.length - '.csv'.length)
    const file = readFileSync(`${__dirname}/data/${filename}`).toString()
    const json = parse(file, {
      columns: true,
      skip_empty_lines: true
    })[0];
    const replacements = Object.entries(json).reduce((o, [k, v]) => {
      o[k.trim()] = v.trim()
      return o
    }, {})
    return {
      page,
      replacements,
    }
  })
const readTemplate = () => readFileSync('template.html.txt').toString()
const replace = (template, key, value) => template.split(`___${key}___`).join(value)
const replaceAll = (template, replacements) => Object.entries(replacements).reduce((template, [key, value]) => replace(template, key, value), template)

const template = readTemplate()
readMeetups().forEach(({ page, replacements }) => {
  const content = replaceAll(template, replacements)
  const filename = `${__dirname}/../_posts/${page}.html`
  console.log(`writing ${page}`)
  writeFileSync(filename, content)
})
