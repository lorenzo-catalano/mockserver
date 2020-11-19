# mockserver

mock from host folder with

docker run --name=mockserver -p 9087:9087 -v ~/HOST/FOLDER/:/tmp/mockserver/mocks mockserver:0.0.2

test with

curl -v -H "id-mock: test1" http://localhost:9087

Example test1.json

{
    "statusCode":200,
    "headers":{
        "header1":"h1",
        "header2":"h2"
    },
    "body":{
        "success":true,
        "message":"OK"
    }
}
