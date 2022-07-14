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
