import {TaskRecord} from '../record/task.record'
import {createCustomError} from "../middleware/error-handler"
import {NextFunction, Request, Response} from "express";

export const getAllTasks = async (req, res) => {

    const tasks = await TaskRecord.getAll();
    res
        .status(200)
        .json({tasks});
    // .json({status: "success", data: {tasks}, nbHits: tasks.length});
};

export const getOneTask = (async (req: Request, res: Response, next: NextFunction) => {
    const {id: taskId} = req.params;
    const task = await TaskRecord.getOne(taskId);
    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
    }
    res
        .status(200)
        .json({task});
});

export const createTask = (async (req: Request, res: Response) => {
    const newTask = new TaskRecord(req.body);
    await newTask.createTask();

    res
        .status(201)
        .json({newTask});
});

export const updateTask = (async (req: Request, res: Response, next: NextFunction) => {
    const {id: taskId} = req.params;
    const task = await TaskRecord.getOne(taskId);
    task.completed = !task.completed
    if (req.body.name) {
        task.completed = !task.completed
        task.name = req.body.name
    }
    await task.updateTask();
    if (!task) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
    }
    res
        .status(200)
        .json({});
});

export const deleteTask = (async (req: Request, res: Response, next: NextFunction) => {
    const {id: taskId} = req.params;
    const taskToDelete = await TaskRecord.getOne(taskId);
    if (!taskToDelete) {
        return next(createCustomError(`No task with id : ${taskId}`, 404));
    }
    await taskToDelete.deleteTask();
    res
        .status(200)
        .json({task: null, status: 'success'});
});





