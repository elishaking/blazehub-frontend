export interface Friend {
  name: string;
  avatar?: string;
}

export interface Friends {
  [friendKey: string]: Friend;
}
