
export interface Login {
    username : string,
    password : string
}

export interface ResLogin {
    status : number,
    mensaje : number;
    token? : string;
  }