interface ISignin {
  password: string;
  email: string;
  timestamp: number;
}

interface ISigninRes {
  status: number;
  message: string;
  timestamp: number;
}

interface IDataBaseConfig {
  host: string;
  port: number;
  dbName: string;
  userName: string;
  password: string;
}

interface IAuthConfig {
  secret: string;
  expires: string;
}
