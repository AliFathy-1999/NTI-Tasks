const addClient = document.querySelector("#addClient")
const dataWrapper = document.querySelector("#dataWrapper1")
const clientHeads = ["name", "initialBalance"];
const singleData = document.querySelector("#singleData")
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
    function addTransactionFunc(Ttype,Tvalue){
    addTransaction.addEventListener("submit",function(ele){
        ele.preventDefault();
        /*const allClients = ReadStorage();
        let trans;
        
        console.log(clientHeadsTrans)
        //clientHeads.forEach( head => Client[head] = this.elements[head].value);

        allClients.forEach(client=>{
            client.transactions.push(clientHeadsTrans)
            console.log(client.transactions)
            
        })*/
        //to get value of transaction value console.log(this.elements[0].value);
        //Get transaction client.transactions
        //let transactionObj = {TransactionType : ,transactionsVal:};
        //clientHeads.forEach( head => Client[head] = this.elements[head].value);
       /* clientHeadsTrans.forEach( (head) =>{ 
            allClients[head]
        
        })*/
        //allUsers.push(user)
        //writeToStorage(allUsers)
        /*console.log(allClients.forEach(client=>{
            trans = client.transactions;
            console.log()
        }));*/
        let allClients = ReadStorage();
        let ClientTObj = {
            "TransactioType":Ttype,
            "TransactionVal":Tvalue
        }
        for (const property in ClientTObj) {
            console.log(`${property}`);
            //ClientTObj[property] = this.elements[property].value;
          }
        /*userHeads.forEach( head => user[head] = this.elements[head].value)*/
        allClients.find(client=>{
            let clientTrans = client.transactions;
            clientTrans.push(ClientTObj)
            console.log(clientTrans)
        })
        
        console.log(allClients)
      
    })
}
}

addTransactionFunc("add",2000)