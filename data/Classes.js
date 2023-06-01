export class Task {
    constructor(id, name, category, description, starttime, endtime, isFinished) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.description = description;
      this.starttime = starttime;
      this.endtime = endtime;
      this.isFinished = isFinished;
    }
  };

  export class Project {
    constructor(id, name,description, color) {
      this.id = id;
      this.name = name;
      this.description = description
      this.color = color;
    }
  };

