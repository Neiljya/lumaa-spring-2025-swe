/**
 * @file TaskManagerComponent.tsx
 * 
 * @description 
 * This file is a React component that initializes and renders the `TaskManager` class,
 * it serves as a bridge between React and `TaskManager` and mounts it so it interacts with
 * the DOM
 * 
 * Integrates with:
 * `TaskManager.tsx` (Manages task rendering and interactions)
 * `TaskService.tsx` (Handles API requests to the backend)
 * `TaskSchema.ts` (Defines the structure of a Task)
 * 
 */

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { TaskManager } from './TaskManager';

/**
 * @component TaskManagerComponent
 * 
 * @description
 * Manages `TaskManager` ensuring it only initializes after the 
 * component is mounted
 * 
 * @returns {React.JSX.Element} div element that serves as the container for
 * `TaskManager` UI
 */
const TaskManagerComponent: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Instantiate TaskManager and handle DOM within containerRef
            new TaskManager(containerRef.current);
        }
    }, []);

    return <div ref={containerRef} />;
};

export default TaskManagerComponent;