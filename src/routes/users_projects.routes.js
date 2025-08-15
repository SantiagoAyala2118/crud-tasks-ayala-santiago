import { Router } from "express";
import {
    createUserProject,
    // getAllUsersProjects
} from '../controller/users_projects.controllers.js';

const usersProjectsRouter = Router();

usersProjectsRouter.post('/api/users_projects', createUserProject);
// usersProjectsRouter.get('/api/users_projects', getAllUsersProjects);

export default usersProjectsRouter;