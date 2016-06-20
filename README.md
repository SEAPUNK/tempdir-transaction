tempdir-transaction
---

`npm install tempdir-transaction`

*Requires Promises to be in global scope*

```js
const tdtrans = require('tempdir-transaction')

async function () {
    // Given function is awaited with Promise.resolve
    const a = tdtrans(async (tempdir) => {
        console.log(tempdir) // /tmp/912lfewjoifje-fweio
        fs.writeFileSync(path.join(tempdir, 'foo'), 'bar')
        return '123'
    })
    // Directory /tmp/912lfewjoifje-fweio has been removed at this point
    console.log(a) // 123
}

```
