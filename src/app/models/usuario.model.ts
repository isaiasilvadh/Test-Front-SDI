import { environment } from "src/environments/environment"

const baseUrl = environment.base_url;


export class Usuario{

  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public rol?: 'ADMIN_ROLE' | 'SECRE_ROLE' | 'USER_ROLE',
    public uid?: string,
  ){}


}
