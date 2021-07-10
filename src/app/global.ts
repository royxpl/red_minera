


export const api_url = 'https://centrominero.softlabstudio.com';

export let Path = {
  url:'https'

}

/*======================================================
ENDPOINT DE LA APIREST FIREBASE
=======================================================*/
export let Api ={
  url:'https://red-minera-2021-default-rtdb.firebaseio.com'

}

/*======================================================
REGISTRO :ENDPOINT DE USUARIO EN FIREBASE AUTHENTICATION
=======================================================*/

export let Register ={
  url:'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

/*======================================================
LOGIN DE USUARIO para el ingreso por usuario y contrasela
=======================================================*/
export let Login ={
  url:'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

export let SendEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

export let SendPasswordResetEmail = {
  url: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

 }

export let ConfirmPasswordReset = {
	url:'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

export let ConfirmEmailVerification = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

export let VerifyPasswordResetCode = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}

export let GetUserData = {

	url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC1AY-edtBBH3UnsMGbQ5nNIAI85-vk7QM'

}




