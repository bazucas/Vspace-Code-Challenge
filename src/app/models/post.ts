export class Post {
  id: number;
  empId: number;
  date: string;
  post: string;

  constructor(value) {
    this.id = value.id;
    this.empId = value.empId;
    this.date = value.date;
    this.post = value.post;
  }
}
