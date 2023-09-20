

export enum Screens {
  Home = 'Home',
  Login = 'Login',
  Modal = 'Modal'
}

export type StackParams = {
  [Screens.Home]: undefined;  
  [Screens.Login]: undefined;  
  [Screens.Modal]: {
    word: string;
  };  
};
