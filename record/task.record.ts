import {createCustomError} from "../middleware/error-handler";
import {pool} from '../db/db';
import {v4 as uuid} from 'uuid'
import {FieldPacket} from "mysql2";

type TaskRecordResults = [TaskRecord[], FieldPacket[]]

export class TaskRecord {
    public id?: string;
    public name: string;
    public completed: boolean

    constructor(obj: TaskRecord) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 150) {
            const msg = 'Imię musi mieć od 3 do 25 znaków.'
            createCustomError(msg, 400);
        }
        this.id = obj.id;
        this.name = obj.name;
        this.completed = obj.completed;
    }

    static async getAll(): Promise<TaskRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `tasks` ORDER BY `name` ASC") as TaskRecordResults;
        return results.map(task => new TaskRecord(task));
    }

    static async getOne(id: string): Promise<TaskRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `tasks` WHERE `id` =:id", {
            id
        }) as TaskRecordResults
        return results.length === 0 ? null : new TaskRecord(results[0]);
    }

    async updateTask(): Promise<void> {
        await pool.execute("UPDATE `tasks` SET `name` = :name, `completed` = :completed WHERE `id` =:id", {
            id: this.id,
            name: this.name,
            completed: this.completed
        });
    }


    async createTask(): Promise<string> {
        this.id = this.id ?? uuid()
        this.completed = this.completed ?? false
        await pool.execute("INSERT INTO `tasks`(`id`, `name`, `completed`) VALUES(:id,:name,:completed)", {
            id: this.id,
            name: this.name,
            completed: this.completed
        })
        return this.id
    }

    async deleteTask(): Promise<void> {
        await pool.execute("DELETE FROM `tasks` WHERE `id` = :id", {
            id: this.id
        })
    }
}
