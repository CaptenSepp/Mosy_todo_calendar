export class Task {
    constructor(id, name, projectId, description,date, starttime, endtime, isFinished) {
      this.id = id;
      this.name = name;
      this.projectId = projectId;
      this.description = description;
      this.date = date;
      this.starttime = starttime;
      this.endtime = endtime;
      this.isFinished = isFinished;
    }
  };

  export class Project {
    constructor(projectId, name,description, color) {
      this.projectId = projectId;
      this.name = name;
      this.description = description;
      this.color = color;
    }
  };

