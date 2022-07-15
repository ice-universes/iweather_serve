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

type IDailyRes = IRes;

interface ICheckinRes extends IRes {
  id: string;
}

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

interface ILocation {
  latitude: number;
  logitude: number;
  city?: string;
  address?: string;
}

type IFavorites = ILocation;

interface IWeather {
  temperature: number;
  feelsLike: number;
  icon: string;
  description: string;
  wind360: number;
  windSpeed: number;
  humidity: number;
  precip: number;
  pressure: number;
  visibility: number;
  clouds: number;
}

interface ICheckIn {
  location: ILocation;
  weather: IWeather;
  daily?: string;
}

interface ICalendarItem {
  location: ILocation;
  weather: IWeather;
  date: Date;
  id: string; // 记录的 id, 用于前端对记录的修改
}

interface ICalendar {
  status: number;
  timestamp: number;
  list: ICalendarItem[];
}

interface IDailyBody {
  id: string;
  daily: string;
}
