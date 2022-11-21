;(function () {
  const localStorageData = localStorage.getItem('fridle-test-json')
  if (!localStorageData) {
    console.log('source data not found!')
    return null
  }
  const allData = JSON.parse(localStorageData)
  const data = allData.filter((item) => item.points === item.maxPoints)
  const main = document.querySelector('#region-main')
  const form = [...main.querySelector('form div').children]
  const relevantDivs = form.filter((qDiv) => {
    const qDivId = qDiv.getAttribute('id') || ''
    return qDivId.startsWith('question-')
  })
  const questionObject = {}
  relevantDivs.forEach((qDiv) => {
    const cDiv = qDiv.querySelector('.content div')
    const question = cDiv.querySelector(':nth-child(3)').innerHTML
    questionObject[question] = cDiv
  })
  data.forEach((result) => {
    const relevantDiv = questionObject[result.question]
    if (result.type === 'checkbox') {
      // CHECKBOX
      const targetChildren = [
        ...relevantDiv.querySelector('.ablock .answer').children,
      ]
      targetChildren.forEach((item) => {
        const checkboxDiv = item.querySelector('[data-region="answer-label"]')
        const isMatch = result.answer.includes(checkboxDiv.textContent)
        if (isMatch) checkboxDiv.previousElementSibling.checked = true
      })
    }
    if (result.type === 'single-input') {
      // SINGLE-INPUT
      const relevantInput = relevantDiv.querySelector('.ablock .answer input')
      relevantInput.value = result.answer
    }
    if (result.type === 'combobox') {
      // COMBOBOX
      const targetChildren = [
        ...relevantDiv
          .querySelector('div.ablock .answer')
          .querySelectorAll('tr'),
      ]
      targetChildren.forEach((item) => {
        const questionText = item.querySelector('td.text').textContent
        const relevantAnswer = result.answer.find(
          (a) => a.question === questionText
        ).answer
        const availableOptions = [
          ...item.querySelectorAll('td.control select option'),
        ]
        availableOptions.forEach((option) => {
          if (option.textContent === relevantAnswer) {
            option.selected = true
          }
        })
      })
    }
    if (result.type === 'multi-input') {
      const source1 = [...relevantDiv.querySelectorAll('p')]
        .slice(1)
        .filter(
          (i) =>
            i.querySelector('span.subquestion')?.getAttribute('id')?.length > 0
        )
      const source2 = [
        ...(relevantDiv?.querySelectorAll('pre')[0]?.children || ''),
      ]
      const pItems = source1.length ? source1 : source2
      pItems.forEach((item, index) => {
        const relevantAnswer = result.answer[index]
        const relevantInput = item.querySelector('span.subquestion input')
        relevantInput.value = relevantAnswer
      })
    }
  })
})()
