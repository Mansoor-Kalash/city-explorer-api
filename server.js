'use strict';
const express = require('express');

const server = express();
const PORT = 3001;

server.get('/test',(request,response)=>{

})

server.listen(PORT,()=>{
    console.log(`${PORT}`);
})

