import moment, {Moment} from 'moment'

export type Tabs = "Word list" | "History" | "Favorites";

export interface Credentials {
  user: string;
  token: string;
  createdAt: Moment;
}
