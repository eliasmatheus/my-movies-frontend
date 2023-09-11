export interface Menu {
  title: string;
  icon?: MenuIcon | string;
  link: string;
  home?: boolean;
  children?: Menu[];
}

export interface MenuIcon {
  icon: string;
  fontSet: string;
}
