import { Dispatch, ReactNode, SetStateAction } from "react"

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IProviderProps {
  children: ReactNode
}

export interface IUserRegister {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
}

export interface IDashProps {
  userName?: string;
  token?: string;
}

export interface IHeaderDashProps {
  name: string;
}

export interface IContacts {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  user: IUserResponse
}

export interface IContactIdProps {
  contactId?: number;
  token?: string;
  setContacts: Dispatch<SetStateAction<[] | IContacts[]>>
}

export interface IEditContact {
  name?: string;
  email?: string;
  phone?: string;
}

export interface ICreateContact {
  name: string;
  email: string;
  phone: string;
}