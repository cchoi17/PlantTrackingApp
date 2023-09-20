// This file is a test/base for my future code which will export data to a csv.

const ourData = [
    {
      Plant_ID: '1234',
      Species: 'Maple',
      Alive:  'True',
      Date: "",
      Growth:  "False"

    },
    {
      Plant_ID: '55678',
      Species: 'Maple',
      Alive:  'False',
      Date: "",
      Growth:  "False"
      
    }
  ]
  
  const titleKeys = Object.keys(ourData[0])

  const refinedData = []
  refinedData.push(titleKeys)

  ourData.forEach(item => {
    refinedData.push(Object.values(item))
  })

  let csvContent = ''

  refinedData.forEach(row => {
    csvContent += row.join(',') +'\n'
  })

  const blob = new Blob([csvContent], {type: 'text/csv;char=utf-8'})
  const objUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', objUrl)
  link.setAttribute('download', "File.csv")
  link.textContent = "Click to Download"

  document.querySelector('body').append(link)
