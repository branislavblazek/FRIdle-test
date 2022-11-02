var insertFormData = () => {
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
  // iterate over data
  d.forEach((result) => {
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
  })
}
