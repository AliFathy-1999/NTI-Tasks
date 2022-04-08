const yargs = require("yargs")
const trans = require('./bankSystem')
yargs.command({
    command:"add",
    describe:"Add new Client",
    builder:{
        accountNum:  { default: Date.now() },
        name:{type:"string", demandOption:true},
        balance:{type:"number", demandOption:true}
    },
    handler:(argv)=>{trans.addData(argv);}
})
yargs.command({
    command:"showAll",
    describe:"Show All Client",
    handler:(argv)=>{trans.showAll();}
})
yargs.command({
    command:"showSingle",
    describe:"Show Client",
    builder:{
        searchKey:  { type:"string", demandOption:true },
        searchVal:{type:"string", demandOption:true}
    },
    handler:(argv)=>{trans.showSingle(argv.searchKey,argv.searchVal);}
})
yargs.command({
    command:"edit",
    describe:"Update Client",
    builder:{
        searchKey:  { type:"string", demandOption:true },
        searchVal:{type:"string", demandOption:true},
        name:{type:"string"},
        balance:{type:"number"}
    },
    handler:(argv)=>{trans.edit(argv);}
})
yargs.command({
    command:"addTransaction",
    describe:"Add Transaction Client",
    builder:{
        searchKey:  { type:"string", demandOption:true },
        searchVal:{type:"string", demandOption:true},
        transactionType:{type:"string"},
        transactionVal:{type:"number"}
    },
    handler:(argv)=>{trans.addTransaction(argv.searchKey,argv.searchVal,argv.transactionType,argv.transactionVal);}
})
yargs.argv