const { parse } = require('csv-parse/sync')
const { writeFileSync, readdirSync, readFileSync } = require('fs')

const readMeetups = () => 
  readdirSync(`${__dirname}/data`)
  .map((filename) => {
    const basename = filename.substr(0, filename.length - '.csv'.length)
    const [ page, meetupTemplateId, htmlTemplateId ] = basename.split('_')
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
      meetupTemplateId,
      htmlTemplateId,
      replacements,
    }
  })
const replace = (template, key, value) => template.split(`___${key}___`).join(value)
const replaceAll = (template, replacements) => Object.entries(replacements).reduce((template, [key, value]) => replace(template, key, value), template)

readMeetups().forEach(({ page, meetupTemplateId, htmlTemplateId, replacements }) => {
  console.log(`writing ${page}`)
  const meetupTemplate = readFileSync(`${__dirname}/${meetupTemplateId}.meetup.txt`).toString()
  const htmlTemplate = readFileSync(`${__dirname}/${htmlTemplateId}.html.txt`).toString()
  writeFileSync(`${__dirname}/../_posts/${page}.html`, replaceAll(htmlTemplate, replacements))
  writeFileSync(`${__dirname}/../meetup.com/${page}.txt`, replaceAll(meetupTemplate, replacements))
})
