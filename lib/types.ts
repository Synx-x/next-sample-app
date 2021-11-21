export interface IPost {
  id: number;
  title: string;
  content: string;
  isNew: number;
  timestamp: string;
}
export interface IfromApi {
  userId: number;
  id: number;
  title: string;
  body: string;
}


export interface Iusers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}


