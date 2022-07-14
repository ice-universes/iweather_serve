interface IAuth {
  password: string;
  email: string;
  timestamp: number;
}

interface IRes {
  status: number;
  message: string;
  timestamp: number;
}

type ISigninRes = IRes;

interface IFavoritesRes {
  status: number;
  favorites: Array<IFavorites>;
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

interface IPayLoad {
  email: string;
  uid: string;
}

interface IFavorites {
  latitude: number;
  logitude: number;
  city?: string;
  address?: string;
}
