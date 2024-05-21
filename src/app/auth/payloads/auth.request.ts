export type LoginRequest = {
  identifier :string,
  password :string
}

export type SignUpRequest = {
  username :string,
  email :string,
  phoneNumber: string,
  password :string,
  confirmPassword :string,
}
