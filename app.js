const express = require('express')
const fs = require('fs');
var bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const basepath = "/tmp/mockserver/mocks/"

var mockKey = process.env.MOCK_KEY
mockKey && console.log('using mockkey = '+mockKey)

app.all('/*', (request, response) => {
    console.log(request.body,request.path)
    var mockId = request.headers["id-mock"] || request.path + (request.body[mockKey] ? '/'+request.body[mockKey] : '')
    if(mockId){
        console.log('requested '+mockId)
        fs.readFile(basepath+mockId+'.json', 'utf8', function(err, contents) {
            if(err){
                console.log('mock file not found['+mockId+'.json]')
                response.send({
                    message:`mock file [${mockId}.json] not found`
                })
            }else{
                console.log('sending file content '+mockId+'.json')
                const mj = JSON.parse(contents)
                response.status(mj.statusCode)
                response.set(mj.headers)
                response.send(mj.body)
            }
        });
    }else{
        console.log(`no param "id-mock" in request headers`)
        response.send({
            message:`no param "id-mock" in request headers`
        })
    }
    
})

module.exports = app