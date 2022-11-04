export class User {
  issue_date(issue_date: any, arg1: string, arg2: string) {
    throw new Error('Method not implemented.');
  }
  id!: number;
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
  age!: number;
  location!: string;
  phone!: number;
  actions!: string;
  contractStartDate!: string;
  contractEndDate!: Date;
  description!: string;

  


}
