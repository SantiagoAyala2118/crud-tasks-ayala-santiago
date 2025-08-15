import { Router } from 'express';
import {
    createProject,
    getAllProjects
} from '../controller/project.controller.js';

const projectRouter = Router();

projectRouter.post('/api/project', createProject);
projectRouter.get('/api/project', getAllProjects);

export default projectRouter;