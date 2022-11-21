# FRIDLE test - extract & insert

## save time by manually copy-pasting answers

When you are trying to make FRIDLE tests on 100% to be able to come to exercise, you will probably have problem to make test on first attempt. To don't waste time copy-pasting correct answers from old test to new test. This tool will help you to copy data and you just have to write small amount of code into the JS console.

### Steps:

1. log into https://fridle.kst.fri.uniza.sk/
2. choose relevant test and fill answers
3. after submitting test open JS console to extract test data:

```js
var script = document.createElement('script')
script.type = 'text/javascript'
script.src =
  'https://cdn.jsdelivr.net/gh/branislavblazek/FRIdle-test@master/extract.js'
document.head.appendChild(script)
```

4. now data are saved to local storage and if you want you can optionally copy data which returned function
5. to insert data into new test, open new test and into JS console paste this code:

```js
var script = document.createElement('script')
script.type = 'text/javascript'
script.src =
  'https://cdn.jsdelivr.net/gh/branislavblazek/FRIdle-test@master/insert.js'
document.head.appendChild(script)
```

6. test now should be filled with answers from last test:)
