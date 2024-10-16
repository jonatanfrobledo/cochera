
export interface Login {
    username : string,
    password : string
}

export interface ResLogin {
    status : string, // o lo que devuelva tu backend como respuesta
    mensaje : number;
    token? : string;
  }