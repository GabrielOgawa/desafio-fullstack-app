import { ReactNode } from "react"

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