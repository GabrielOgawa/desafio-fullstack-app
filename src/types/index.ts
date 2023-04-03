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

export interface IDash {
  token: string;
}

export interface IDashboardProps {
  token: string;
  userId: number;
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
  setFakeContacts: Dispatch<SetStateAction<boolean>>;
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

export interface IUserProps {
  userId: string;
  token: string;
}

export interface IEditUser {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface IModalEditProps {
  userId: number | undefined;
  token: string;
  setUserFake: Dispatch<SetStateAction<boolean>>;
}