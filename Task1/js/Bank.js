const addClient = document.querySelector("#addClient")
const dataWrapper = document.querySelector("#dataWrapper1")
const dataWrapper1 = document.querySelector("#dataWrapper2")
const singleData = document.querySelector("#singleData")
let clientHeads= ["name","initialBalance"]
const addTransaction = document.querySelector("#addTransactionClient");
const Ttype= document.querySelector("#type")
const Tvalue = document.querySelector("#Tvalue")
const ReadStorage = (storageKey="clients")=>{
    let data;
    try{
        data=JSON.parse(localStorage.getItem(storageKey)) || [];
        if(!Array.isArray(data)) throw new Error("Not Array");
    }catch(e){
        data = [];
    }
    return data;
}
const WriteInStorage = (data=[],storageKey="clients")=>{
    localStorage.setItem(storageKey,JSON.stringify(data));
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
const createMyOwnElement = (parent, ele,text=null, classes= null, attributes = null)=>{
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if(text) myElement.textContent = text
    if(classes) myElement.classList = classes
    if(attributes){
        attributes.forEach(attr=>{
            myElement.setAttribute(attr.attrName, attr.attrVal)
        })
    }
    return myElement
}
const singleUserDraw = (user, index, allClients, mainParent) =>{
    singleData.textContent=""
    const tr = createMyOwnElement(mainParent, "tr")
    createMyOwnElement(tr, "td", index+1)
    createMyOwnElement(tr, "td", user.accountNum)
    clientHeads.forEach(head=> createMyOwnElement(tr, "td", user[head]))
    const td = createMyOwnElement(tr, "td")
    const showBtn = createMyOwnElement(td, "button", "show", "btn btn-primary mx-2")
    showBtn.addEventListener("click", (e)=>singleUserDraw(user, index,allClients, singleData))
    const TransactionBtn = createMyOwnElement(td, "button", "Add Transaction", "btn btn-success mx-2")
    TransactionBtn.addEventListener("click", ()=>{
        window.location.href="transactions.html";
    })
}
const drawNoData = () =>{
    const tr = createMyOwnElement(dataWrapper, "tr", null, "alert alert-danger")
    const attr = [ { attrName:"colspan", attrVal: 5 } ]
    createMyOwnElement(tr, "td", "no users yet", null, attr)
}
const drawData = (allClients) =>{
    dataWrapper.innerHTML=""
    if(allClients.length==0) drawNoData()
    else allClients.forEach((user,index)=> singleUserDraw(user, index, allClients, dataWrapper))
}

if(addClient){
addClient.addEventListener(("submit"),function(ele){
    ele.preventDefault();
    let Client = {accountNum : Date.now(),transactions:[]};
    clientHeads.forEach( head => Client[head] = this.elements[head].value);
    console.log(Client)
    let allClients=ReadStorage();
    allClients.push(Client);
    WriteInStorage(allClients);
    this.reset();
    window.location.href = "Clientindex.html";
})
}
if(dataWrapper){
    const allClients = ReadStorage()
    drawData(allClients)
}
if(addTransaction){
    function addTransactionFunc(searchKey,searchVal,transactionType,transactionVal){
    addTransaction.addEventListener("submit",function(ele){
        ele.preventDefault();
        try{
        let allClients = ReadStorage();
        const searchIndex = searchClient(addClient, searchKey,searchVal);

        if(searchIndex==-1) throw new Error("Client not found ")
        allClients[searchIndex].transactions.push({
            "transactionType":transactionType,
            "transactionVal":transactionVal
        })
        switch(transactionType){
            case "add":
                allClients[searchIndex].initialBalance += transactionVal;
                break;
            case "withdraw":
                allClients[searchIndex].initialBalance -= transactionVal;
                break;
            default:
                throw new Error("Invalid Transaction Type");
        }
        WriteInFile(allClients)
        dataWrapper1.innerHTML=addClient
        console.log('Transaction Added');
    }catch(err){
        console.log(err.message);
    }
    })
}
}

//addTransactionFunc("add",2000)