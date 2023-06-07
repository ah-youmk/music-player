import { ContentType } from './GlobalTypes';

export type ContetnProps = {
  content: ContentType;
};

export type NavbarProps = {
  active: ContentType;
  setActive: React.Dispatch<React.SetStateAction<ContentType>>;
};
