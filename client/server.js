import app from './src/app.js'

const PORT = 3001;

function HOST() {
    console.log(`\nserver listening in port ${PORT}\n`)
}

app.listen(PORT, HOST);
