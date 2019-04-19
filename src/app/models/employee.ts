export class Employee {
  id: number;
  username: string;
  phone: number;
  role: string;
  name: string;

  constructor(value) {
    this.id = value.id;
    this.username = value.username;
    this.phone = value.phone;
    this.role = value.role;
    this.name = value.name;
  }
}
