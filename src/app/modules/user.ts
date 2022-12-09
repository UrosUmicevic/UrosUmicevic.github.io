export class User {
  id!: number;
  name: string | undefined;
  email: string | undefined;
  role: string | undefined;
  age!: number;
  location!: string;
  phone!: number;
  actions!: string;
  contractStartDate!: Date;
  contractEndDate!: string;
  description!: string;
  createdBy: string | undefined | null
  


}
