import {Task} from "./Classes";

export const TASKIDCOUNTER = 11;

const createDate = (offsetDays, hours = 9, minutes = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    date.setHours(hours, minutes, 0, 0);
    return date;
};

export const taskData = [
   
    new Task(1, 'Review lecture notes', 'c1', 'Check the main points from the last class.', createDate(0), createDate(0, 9, 0), createDate(0, 10, 0), false),
    new Task(2, 'Update portfolio text', 'c2', 'Make the project description short and clear.', createDate(0), createDate(0, 11, 0), createDate(0, 12, 0), false),
    new Task(3, 'Grocery shopping', 'c3', 'Buy food for the next few days.', createDate(1), createDate(1, 17, 0), createDate(1, 18, 0), false),
    new Task(4, 'Gym session', 'c4', 'Simple training plan after work.', createDate(1), createDate(1, 19, 0), createDate(1, 20, 0), false),
    new Task(5, 'Team meeting', 'c5', 'Prepare notes and questions before the call.', createDate(2), createDate(2, 10, 0), createDate(2, 11, 0), false),
    new Task(7, 'Try calendar colors', 'c6', 'Check how different project colors look in the timeline.', createDate(2), createDate(2, 14, 0), createDate(2, 15, 0), true),
    new Task(8, 'Birthday reminder', 'c7', 'Send a short message and prepare a small gift.', createDate(3), createDate(3, 12, 0), createDate(3, 12, 30), false),
    new Task(9, 'Cook pasta', 'c8', 'Plan a quick dinner and save the idea for later.', createDate(3), createDate(3, 18, 0), createDate(3, 19, 0), false),
    new Task(10, 'Clean task list', 'c1', 'Mark finished items and move open ones to the right project.', createDate(-1), createDate(-1, 16, 0), createDate(-1, 17, 0), true),
    new Task(11, 'Focus timer test', 'c2', 'Open this task from the calendar and start the work timer.', createDate(4), createDate(4, 9, 30), createDate(4, 10, 30), false)
      
];
