export default
{
    "secret": "9eb71ab7420eb452a22787ca4fab501b" //hash md5
}

//O hash md5 é usado para dizer que o token é único, 
//ou seja, é um token só desta aplicação.
//A senha é criada a partir deste hash, sendo assim, outra
//aplicação que gerar um token jwt não vai ser o mesmo tipo de 
//token desta aplicação.