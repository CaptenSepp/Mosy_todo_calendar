export class Task {
    constructor(id, name, projectId, description, starttime, endtime, isFinished) {
      this.id = id;
      this.name = name;
      this.projectId = projectId;
      this.description = description;
      this.starttime = starttime;
      this.endtime = endtime;
      this.isFinished = isFinished;
    }
  };

  export class Project {
    constructor(id,projectId, name,description, color) {
      this.id = id;
      this.projectId = projectId;
      this.name = name;
      this.description = description
      this.color = color;
    }
  };

