/**
 * @file TaskService.tsx
 * 
 * @description 
 * 
 * Handles all task-related API requests from the frontend to backend
 * This service communicates with the backend's task-related endpoints 
 * to fetch, create, update, and delete tasks
 * 
 * Integrates with:
 * `TaskManager.tsx` (main frontend component that manages UI interactions)
 * `TaskSchema.ts` (Defines the structure of a Task)
 * 
 * Backend Routes:
 * - GET `/api/tasks` (Retrieves user tasks)
 * - POST `/api/tasks` (Creates a new task)
 * - PUT `/api/tasks/:id` (Updates an existing task)
 * - DELETE `/api/tasks/:id` (Deletes a task)
 */

import { Task } from '../../../shared/schemas/TaskSchema';
import axios from 'axios';

/**
 * @constant API_URL
 * 
 * @description 
 * 
 * Base URL for all task-related API requests,
 * since we don't have a SSL certificate we are using
 * 'http' however if this were deployed in a prod environment
 * its better to use 'https' instead for secure interactions
 */
const API_URL = 'http://localhost:3000/api/tasks';


/** CONSTANTS  **/
// Maintains auth with JWT
const AUTH_STRING = `Bearer ${localStorage.getItem('token')}`;

// ERRORS
const TITLE_MISSING = "Title is required"

/****************/


/**
 * @class TaskService
 * 
 * @description
 * 
 * Handles HTTP requests for task operations and interactions with the backend
 * while maintaining proper authentication via JWT
 */
export class TaskService {


    /**
     * @method getTasks
     * @description Fetches all tasks associated with the authenticated user
     * 
     * @returns {Promise<Task[]>} A promise resolving to an array of `Task` objects
     * @throws {Error} if the request fails
     */
    async getTasks(): Promise<Task[]> {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: AUTH_STRING
            }
        });
        return response.data;
    }

    /**
     * @method addTask
     * @param description Creates a new task and stores it in the db
     * 
     * @param {string} title is the title of the new task (required)
     * @param {string} description is the description (optional)
     * @returns {Promise<Task>} a promise resolving to a newly created task
     * @throws {Error} if the title is missing or req fails
     */
    async addTask(title: string, description: string): Promise<Task> {
        if (title.trim().length === 0) {
            throw new Error(TITLE_MISSING);
        }
        const response = await axios.post(API_URL, { title, description }, {
            headers: {
                Authorization: AUTH_STRING
            }
        });
        return response.data;
    }

    /**
     * @method updateTask
     * @description Updates an existing task in the db
     * 
     * @param {number} taskId is the unique ID of the task
     * 
     * @param {Partial<Task>} fields 
     * is the fields to update (e.g. 'title', 'description')
     * though rn it only serves mainly to update the completion status 
     * but can be modified in the future
     * 
     * @returns {Promise<Task>} a promise resolving to the updated task
     * @throws {Error} if request fails
     * 
     */
    async updateTask(taskId: number, fields: Partial<Task>): Promise<Task> {
        const response = await axios.put(`${API_URL}/${taskId}`, fields, {
            headers: {
                Authorization: AUTH_STRING
            }
        });
        return response.data;
    }

    /**
     * @method deleteTask
     * @description Deletes a task from the database
     * 
     * @param {number} taskId - The unique ID of the task to delete
     * @returns {Promise<void>} A promise that resolves when the task is deleted
     * @throws {Error} if the req fails
     */
    async deleteTask(taskId: number): Promise<void> {
        await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                Authorization: AUTH_STRING
            }
        });
    }

}

