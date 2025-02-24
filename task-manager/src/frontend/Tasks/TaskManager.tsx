/**
 * TaskManager.tsx
 * 
 * This file defines the 'TaskManager' class which is responsible for managing
 * task-related UI elements and interactions in the application. TaskManager
 * interacts with 'TaskService' located in the services subdir within the current dir
 * to fetch, create, update, and delete tasks in the database
 * 
 */

import taskTemplate from './Tasks.html?raw';
import './Tasks.css';
import { Task } from '../../shared/schemas/TaskSchema';
import { TaskService } from './services/TaskService';

/**
 * @class TaskManager
 * 
 * @description 
 * Handles the rendering and user interactions for tasks including
 * displaying, adding, updating, and deleting tasks
 */
export class TaskManager {
    private container: HTMLElement;
    private taskList: Task[] = [];
    private taskListElement: HTMLUListElement | null = null;
    private newTaskName: HTMLInputElement | null = null;
    private addTaskBtn: HTMLButtonElement | null = null;
    private newTaskDesc: HTMLInputElement | null = null;
    private taskService;

    private MIN_TASK_LENGTH = 0;

    /**
     * Default constructor
     * 
     * @param {HTMLElement} container is the HTML container element where
     * the task manager will be rendered in
     */
    constructor(container: HTMLElement) {
        this.container = container;
        this.initTemplate();
        this.taskService = new TaskService();
        this.renderTasks();
    }

    /**
     * @method createTaskElement
     * 
     * @description Creates an HTML list item ('li') representing a task
     * @param {Task} task is the object containing the details of a task
     * @returns {HTMLElement} a constructed task list item element
     */
    private createTaskElement(task: Task): HTMLElement {
        const li = document.createElement('li');
        li.dataset.id = task.id.toString();

        // Condition that can be used to add indicator of completion
        /*
        if (task.isCompleted) {
            li.classList.add('completed');
        }
        */

        // Create checkbox for marking completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isComplete;
        checkbox.addEventListener('change', async () => {
            try {
                await this.taskService.updateTask(task.id, { isComplete: checkbox.checked });
                await this.renderTasks();

            } catch (error) {
                console.error(error);
            }

        });

        // Create task name and description
        const titleSpan = document.createElement('span');
        titleSpan.textContent = `${task.title} - ${task.description}`;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', async () => {
            try {
                await this.taskService.deleteTask(task.id);
                await this.renderTasks();
            } catch (error) {
                console.error(error);
            }
        });

        // Append each element to the task item
        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        li.appendChild(deleteBtn);

        return li;
    }

    /**
     * @method renderTasks
     * 
     * @description Fetches tasks from the services and updates the UI
     */
    private async renderTasks(): Promise<void> {
        if (this.taskListElement === null) return;

        this.taskList = await this.taskService.getTasks();

        this.taskListElement.innerHTML = '';

        // Iterate of the tasks to build UI elements
        for (let i = 0; i < this.taskList.length; i++) {
            const taskElement = this.createTaskElement(this.taskList[i]);
            this.taskListElement.appendChild(taskElement);
        }
    }

    /**
     * @method initTemplate
     * 
     * @description 
     * 
     * Initializes the task manager template by injecting HTML 
     * and sets up event listeners
     */
    private initTemplate(): void {
        // Inject the HTML template into the container
        this.container.innerHTML = taskTemplate;

        // Below grabs elements from the template
        this.taskListElement = this.container.querySelector('#taskList') as HTMLUListElement;
        this.newTaskName = this.container.querySelector('#newTaskName') as HTMLInputElement;
        this.newTaskDesc = this.container.querySelector('#newTaskDesc') as HTMLInputElement;
        this.addTaskBtn = this.container.querySelector('#addTaskBtn') as HTMLButtonElement;

        /* debugging
        console.log(this.addTaskBtn);
        console.log(this.newTaskDesc);
        console.log(this.newTaskName);
        */

        // Potential TODO: move logic to separate method to improve modularity/cleanliness
        if (this.addTaskBtn && this.newTaskName && this.newTaskDesc) {
            this.addTaskBtn.addEventListener('click', () => {
                const title: string = this.newTaskName!.value.trim();
                const description: string = this.newTaskDesc!.value.trim();

                // Prevent adding task if title is empty
                // TODO: Add popup if title is missing
                if (title.length === this.MIN_TASK_LENGTH) {
                    return;
                }

                // Directly pass the title and description to addTask()
                this.taskService.addTask(title, description);

                // Clear input fields after adding task
                this.newTaskName!.value = '';
                this.newTaskDesc!.value = '';

                // Re-render tasks
                this.renderTasks();

            });
        }
    }

}