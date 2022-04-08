const fs = require("fs")
const WriteInFile = (fileName,data)=>{
    try{
        fs.writeFileSync(fileName,JSON.stringify(data));
        console.log(`data added to file ${fileName}`);
    }catch(e){
        console.log("File Reseted")
    }
}

const ReadfromFile = (fileName)=>{
    let data
    try{
        data = JSON.parse(fs.readFileSync(fileName));
        fs.writeFileSync(fileName,JSON.stringify(data));
        if(!Array.isArray(data)) throw new Error()
        console.log('data fetched');
    }catch(e){
        data = []
        console.log("error in reading data")
    }
    return data;
}
module.exports = {
    WriteInFile ,
    ReadfromFile
}
