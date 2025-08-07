import { Router } from 'express';
import {
    createTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
} from '../controller/tasks.controller.js';

const taskRouter = Router();

taskRouter.post('/api/tasks', createTask);
taskRouter.get('/api/tasks', getAllTasks);
taskRouter.get('/api/tasks:id', getTask);
taskRouter.put('/api/tasks:id', updateTask);
taskRouter.delete('/api/tasks:id', deleteTask);

export default taskRouter;

