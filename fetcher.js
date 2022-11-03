let dd
fetch(
  'https://raw.githubusercontent.com/branislavblazek/FRIdle-test/master/result7.txt'
)
  .then((i) => i.json())
  .then((i) => (dd = i))
