import { Project } from "../models/projects.model.js";

export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: 'The name and de description are neccesary'
            });
        };

        if (typeof name !== 'string' || typeof description !== 'string') {
            return res.status(400).json({
                message: 'The name and the description must be a string'
            });
        };
        if (name.length > 100 || description.length > 100) {
            return res.status(400).json({
                message: 'The length cannot be more than 100 characters'
            });
        };



        const project = await Project.create({
            name,
            description
        });
        if (project) {
            return res.status(201).json({
                messsage:'Project created',
                project
            })
        }

    } catch (err) {
        console.error('An error has occurred while creating a project', err)
    };
};


export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll()

        if (projects.length > 0) {
            return res.status(200).json({
                message:'Here are the projects',
                projects
            });
        } else {
            return res.status(404).json({
                message: 'There are no projects on the database yet'
            });
        };

    } catch (err) {
        console.error('An error has occurred while getting all the projects', err)
    };
};