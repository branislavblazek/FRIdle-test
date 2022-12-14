;(function () {
  const pointsRegexPattern =
    /^Známka.([0-9]{1},[0-9]{2}).z.([0-9]{1},[0-9]{2})/gm

  const main = document.querySelector('#region-main')
  const form = [...main.querySelector('form div').children]
  const relevantDivs = form.filter((qDiv) => {
    const qDivId = qDiv.getAttribute('id') || ''
    return qDivId.startsWith('question-')
  })
  const data = relevantDivs.map((qDiv) => {
    const resultObj = { points: 0, maxPoints: 0, question: '', answer: '' }
    // INFO
    const pointsText = qDiv.querySelector('.grade').textContent
    const [_, pointsCorrect, pointsAll] = pointsRegexPattern.exec(pointsText)
    pointsRegexPattern.lastIndex = 0
    resultObj.points = pointsCorrect
    resultObj.maxPoints = pointsAll
    // QUESTION HEADER
    const cDiv = qDiv.querySelector('.content div')
    const questionText = cDiv.querySelector(':nth-child(3)').innerHTML
    resultObj.question = questionText
    // ANSWER
    const aBlock = cDiv.querySelector('div.ablock') || null
    if (aBlock) {
      const aBlockItems = [...aBlock.querySelectorAll('tr')]
      if (aBlockItems.length > 0) {
        // COMBOBOX ANSWER
        resultObj.type = 'combobox'
        resultObj.answer = aBlockItems.map((i) => {
          const aBlockItemResult = {}
          const aBlockItemText = i.querySelector('td.text').textContent
          aBlockItemResult.question = aBlockItemText
          const aBlockItemValue = i.querySelector(
            'td.control select option:checked'
          ).textContent
          aBlockItemResult.answer = aBlockItemValue
          return aBlockItemResult
        })
        return resultObj
      } else {
        const aBlockItemsAnswer = [...aBlock.querySelector('.answer').children]
        if (aBlockItemsAnswer.length > 1) {
          // CHECKBOX ANSWER
          const relevantCheckboxItems = aBlockItemsAnswer.filter((i) =>
            i.querySelector('input:checked')
          )
          resultObj.type = 'checkbox'
          resultObj.answer = relevantCheckboxItems.map(
            (i) => i.querySelector('[data-region="answer-label"]').textContent
          )
          return resultObj
        } else {
          // SINGLE INPUT
          resultObj.type = 'single-input'
          resultObj.answer = aBlockItemsAnswer[0].value
          return resultObj
        }
      }
    } else {
      // MULTI INPUT
      const source1 = [...cDiv?.querySelectorAll('p')]
        .slice(1)
        .filter((i) => i.getAttribute('id')?.length > 0)
      const source2 = [...(cDiv?.querySelectorAll('pre')[0]?.children || '')]
      const pItems = source1.length ? source1 : source2
      resultObj.type = 'multi-input'
      resultObj.answer = pItems.map((i) => i.querySelector('span input').value)
    }
    return resultObj
  })
  const encoded = JSON.stringify(data)
  localStorage.setItem('fridle-test-json', encoded)
  return data
})()
