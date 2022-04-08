const deal = require("./DealWithJSON.js")
const createClientObj = (data)=>{
    return { accountNumber:Date.now(), name:data.name, balance:data.balance,transaction:[] }
}
const printTaskObj = (data)=>{
    console.log(`id: ${data.accountNumber} - name:${data.name} - balance:${data.balance}
------------------------------------------------------`)
}
const searchClient = (allClients,searchKey,searchValue,searchType="singleIndex")=>{
    if(searchType == "singleIndex"){
        return allClients.findIndex(client=> client[searchKey] == searchValue)
    }else if(searchType == "singleData")
    {
        return allClients.find(client=> client[searchKey] == searchValue)
    }else{
        return allClients.filter(client=> client[searchKey] == searchValue)
    }

}
const addData = (data)=>{
    try{
    let dataArr = deal.ReadfromFile("BankData.json")
    if(searchClient(dataArr, "accountNumber", data.accountNumber)!=-1) throw new Error("Account Number used before")
    let newClient =  createClientObj(data);
    dataArr.push(newClient)
    deal.WriteInFile("BankData.json",dataArr)
    }catch(e){console.log("error in adding data")}
    }
    const showAll = ()=>{
        let dataArr = deal.ReadfromFile("BankData.json")
        dataArr.forEach(task=> printTaskObj(task));
    }
    const showSingle =(searchKey,searchVal)=>{
        try{
            let dataArr = deal.ReadfromFile("BankData.json")
            let client = searchClient(dataArr,searchKey,searchVal,"singleData");
            if(!client) throw new Error("No such client")
            printTaskObj(client)
        }catch(e){
            console.log("error in showing single data")
        }
    }
    const edit = (data)=>{
        try{
            let dataArr =deal.ReadfromFile("BankData.json");
            let searchIndex = searchClient(dataArr, data.searchKey,data.searchVal)
            if(searchIndex==-1) throw new Error('Client not found')
            dataHeaders = ["name", "balance"]
            dataHeaders.forEach(head=>{
                if(data[head]) dataArr[searchIndex][head] = data[head]
            })
            deal.WriteInFile("BankData.json", dataArr)
            console.log('data updated');
        }catch(err){
            console.log(err.message)
        }
    }
    const addTransaction = (searchKey,searchVal,transactionType,transactionVal)=>{
        try{
            const dataArr = deal.ReadfromFile("BankData.json");
            const searchIndex = searchClient(dataArr, searchKey,searchVal);
            if(searchIndex==-1) throw new Error("Client not found ")
            dataArr[searchIndex].transaction.push({
                "transactionType":transactionType,
                "transactionVal":transactionVal
            })
            /*transaction = ["transactionType","transactionValue"]
            transaction.forEach(head=>{
                if(data[head])dataArr[searchIndex][head] = data[head]
            })*/
            switch(transactionType){
                case "add":
                    dataArr[searchIndex].balance += transactionVal;
                    break;
                case "withdraw":
                    dataArr[searchIndex].balance -= transactionVal;
                    break;
                default:
                    throw new Error("Invalid Transaction Type");
            }
            deal.WriteInFile("BankData.json", dataArr)
            console.log('Transaction Added');
        }catch(err){
            console.log(err.message);
        }
    }
module.exports = {
    addData,
    showAll,
    showSingle,
    edit,
    addTransaction
}