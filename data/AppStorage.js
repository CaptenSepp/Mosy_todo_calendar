import AsyncStorage from "@react-native-async-storage/async-storage";
import { projectData, PROJECTIDCOUNTER } from "../data/ProjectData";
import { taskData, TASKIDCOUNTER } from "../data/TaskData";

export const storeData = (data) => {
    try {
        AsyncStorage.setItem('APPDATA', JSON.stringify(data)).catch(e => {console.log(e)});
    } catch (e) {
        throw e;
    }
};

export const getData = () =>{
    return new Promise((resolve,reject) => {
        AsyncStorage.getItem('APPDATA').then(value => {
            if (value != null){
                parsedData = JSON.parse(value);
                let {taskData} = parsedData;
                taskData.forEach(task => {
                    task.date = new Date(task.date);
                    task.starttime = new Date(task.starttime);
                    task.endtime = new Date(task.endtime); 
                });
                resolve(parsedData);
            } else {
                const initialData = {
                    projectData: projectData,
                    taskData: taskData,
                    taskIdCounter: TASKIDCOUNTER,
                    projectIdCounter: PROJECTIDCOUNTER,
                    isSaved: true,
                    hasChanged: false,
                  }
                resolve(initialData);
            }
        }).catch((e) =>{ console.log(e)})
    });
};
