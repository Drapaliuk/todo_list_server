// const createNewUser = async (req, res) => { 
//   const {login, password} = req;
//   const initialData = {auth: {login, password}}
//   User.create(initialData, {new: true})
//       .then(user => {
//         console.log(user)
//         // jwtLogic
//       })
//       .catch(err => {
//         res.status(501)
//       })
// }


const id = '5fde263ef6249b20746ee8d5';
const subDocId = '5fde2c59c708ce12943587b9'
const test = {
    userId: '5fde263ef6249b20746ee8d5',
    body: {
      tasksListId: '5fde442eb9630d2320b9a0fb',
      taskId: '5fde51f584de5f145411392b',
      tasksList: {
        name: 'test list2'
      },
      task: {text: 'ferry burrery'},
      renewal: {name: 'ferry burrery'}
    }
  }
  
  const changeTask = (req, res) => { //changeTask
    const {userId} = req;
    const {tasksListId, taskId, renewal} = req.body;
  
    User.findById(userId)
        .then(user => {
          const tasksList = user.tasksLists.id(tasksListId);
          const task = tasksList.tasks.id(taskId);
          for (let key in renewal) {
              task[key] = renewal[key]
          };
  
          console.log(renewal)
          user.save()
        })
  }
  
  const addTask = (req, res) => {
    const {userId} = req;
    const {tasksListId, task} = req.body;
  
    User.findById(userId)
        .then((user, err) => {
          if(err) return res.status(404)
  
          const tasksList =  user.tasksLists.id(tasksListId);
          tasksList.tasks.push(task)
          user.save()
              .then((data, err) => {
                if(err) return res.status(501)
                console.log(data)
          })
        })
  }
  
  const removeTask = (req, res) => {
    const {userId} = req;
    const {tasksListId, taskId} = req.body;
    User.findById(userId)
        .then(user => {
          const tasksList = user.tasksLists.id(tasksListId)
          console.log(tasksList)
          tasksList.tasks.id(taskId).remove();
          user.save()
        })
  }
  
  
  
  const addTasksList = (req, res) => {
    const {userId} = req;
    const {tasksList} = req.body;
    User.findByIdAndUpdate(userId, {$push: {'tasksLists': tasksList}})
        .then((data, err) => {
          console.log(data)
        })
  }
  
  
  const changeTasksList = (req, res) => {
      const {userId} = req;
      const {tasksListId, renewal} = req.body;
      
      User.findById(userId)
          .then(user => {
            const tasksList = user.tasksLists.id(tasksListId);
            for (let key in renewal) {
              tasksList[key] = renewal[key]
            }
  
            user.save()
          })
  }
  
  
  const removeTasksList = (req, res) => {
    const {userId} = req;
    const {tasksListId} = req.body;
    
    User.findById(userId)
        .then(user => {
          user.tasksLists.id(tasksListId).remove()
          user.save()
        })
  }
  
  const getTasksLists = (req, res) => {
    const {userId} = req;
    
    User.findById(userId)
        .then(user => {
          console.log('---------------', user.tasksLists)
        })
  }