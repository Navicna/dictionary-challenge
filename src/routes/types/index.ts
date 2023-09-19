

export enum Screens {
  Home = 'Home',
  ListDetails = 'ListDetails',
  Modal = 'Modal'

}

export type StackParams = {
  [Screens.Home]: undefined;  
  [Screens.ListDetails]: undefined;  
  [Screens.Modal]: {
    word: string;
  };  
};
