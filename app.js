const express = require('express')
const fs = require('fs');
const app = express()

const basepath = "/tmp/mockserver/mocks/"

app.all('/*', (request, response) => {
    var mockId = request.headers["id-mock"]
    console.log('requested '+mockId)
    fs.readFile(basepath+mockId+'.json', 'utf8', function(err, contents) {
        if(err){
            console.log('mock file not found['+mockId+'.json]')
            response.send('mock file not found')
        }else{
            console.log('sending file content '+mockId+'.json')
            const mj = JSON.parse(contents)
            response.status(mj.statusCode)
            response.set(mj.headers)
            response.send(mj.body)
        }
    });
})

module.exports = app