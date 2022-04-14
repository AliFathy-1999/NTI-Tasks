const taskHelper = require('../helper/task.helper');
class Task {
    static addTaskPost = (req,res)=>{
        res.render("addTaskPOST", {pageTitle:"add Task (post)"})
    }
    static addTaskPostLogic = (req,res)=>{
        const data = {...req.body, id:Date.now()}
        taskHelper.add(data,(e,result)=>{
            res.redirect("/");
        })
    }
    static showTaskSingle = (req,res)=>{
        taskHelper.showTaskSingle(req.params.id,(e,tasks)=>{
            res.render("single", {
                pageTitle:"Show Single Task",
                tasks
            })
        })
    }
    static showTask(req, res) {
        taskHelper.showAll((e, tasks) => {
            res.render('allTasks', {
                pageTitle: "All Tasks",
                tasks,
                isEmpty: tasks.length==0? true:false
            })            
        })

    }

    static editTaskPost(req, res) {
        taskHelper.showTaskSingle(req.params.id,(e,tasks)=>{
            res.render("edit",
             {
                pageTitle:"Edit Task",
                tasks,
                ifFound: tasks? false: true
        })
        })
        
    }
    static editTaskPostLogic(req, res) {
        taskHelper.edit(req.params.id,req.body,(e,result)=>{
            res.redirect(`/single/${req.params.id}`);
        })
    }
    static delTask(req, res) {
        taskHelper.del(req.params.id,(e,result)=>{
            res.redirect("/");
        })
    }
}
module.exports=Task;