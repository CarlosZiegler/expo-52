"use dom";

import { Drawer } from "vaul";

import { useState } from "react";
import styles from "./task-drawer.module.css";

interface TaskDrawerProps {
  onAddTask: (title: string, priority: "low" | "medium" | "high") => void;
}

export function TaskDrawer({ onAddTask }: TaskDrawerProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAddTask(title, priority);
    setTitle("");
    setPriority("medium");
    setOpen(false);
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className={styles.trigger}>Add New Task</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className={styles.overlay} />
        <Drawer.Content className={styles.content}>
          <div className={styles.container}>
            <Drawer.Handle />
            <Drawer.Title className={styles.title}>Add New Task</Drawer.Title>
            <Drawer.Description className={styles.description}>
              Enter task details below
            </Drawer.Description>

            <label htmlFor="title" className={styles.label}>
              Task Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
            />

            <label htmlFor="priority" className={styles.label}>
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
              className={styles.input}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button onClick={handleSubmit} className={styles.button}>
              Add Task
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
