export interface ICompany {
  id: number;
  created_at: number;
  name: string;
  active: boolean;
  admin_email: string;
}

export interface IXanoUser {
  id: number;
  first_name: string;
  last_name: string;
  companys_id: number;
  onesignal_identifier: string[];
  _company: ICompany;
}

export interface IXanoUserArray extends Array<IXanoUser> {}
