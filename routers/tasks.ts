import {Router} from 'express';
import {
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    getOneTask,
} from '../controllers/tasks-controllers';

export const taskRouter = Router();

taskRouter
    .get('/', getAllTasks)
    .post('/', createTask)
    .get('/:id', getOneTask)
    .patch('/:id', updateTask)
    .delete('/:id', deleteTask)

// taskRouter.route('/').get(getAllTasks).post(createTask)
// taskRouter.route('/:id').get(getOneTask).patch(updateTask).delete(deleteTask);
