![tecnologias](https://user-images.githubusercontent.com/38113015/104681406-03647180-56d1-11eb-9cb9-b62e41357454.png)
# Pandemia 
Projeto da incubadora do Centro de Inovação Microsoft PUCRS em parceria com a empresa DBServer. O projeto tem como objetivo permitir que autoridades de saúde acompanhem a evolução de atendimentos e testes durante uma pandemia. 
Esta aplicação, com unidades de saúde cadastradas, possibilita que cada unidade registre todos seus atendimentos relacionados com a pandemia.

# Telas
<img src="https://user-images.githubusercontent.com/38113015/104668101-3baa8680-56b6-11eb-84ef-658306b1fe55.png" width="800"> 
<img src="https://user-images.githubusercontent.com/38113015/104668524-0488a500-56b7-11eb-932c-7fc29baf0661.png" width="800">                                                                                                                        
<img src="https://user-images.githubusercontent.com/38113015/104668658-46b1e680-56b7-11eb-96ff-20337ee50a41.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104668694-5b8e7a00-56b7-11eb-92f2-e0b25293609d.png" width="800">

# Validações dos campos obrigatórios
<img src="https://user-images.githubusercontent.com/38113015/104668942-dc4d7600-56b7-11eb-9e45-07e20fc6aecb.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104669003-f424fa00-56b7-11eb-9e29-35b3249596f0.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104669055-10289b80-56b8-11eb-8a64-751c9522ca1d.png" width="800">

# Layout Responsivo
<img src="https://user-images.githubusercontent.com/38113015/104671117-ec675480-56bb-11eb-87e2-8a86287b86bd.png" width="600">
<img src="https://user-images.githubusercontent.com/38113015/104671652-f5a4f100-56bc-11eb-9545-f789de8cdf3f.png" width="800">

# Execução
<ol>
  <li>Abra <b>dois terminais</b>, um terminal irá rodar o <b>servidor</b> e o outro irá rodar o <b>cliente</b>.</li>
  
  <li>No terminal do servidor, na pasta backend, instalar as dependências utilizando o comando <b>npm run install</b>.</li>
  
  <li>No terminal do cliente, na pasta frontend, instalar as dependências utilizando o comando <b>npm run install</b>.</li>
  
  <li>Faça o restore do banco de dados, que está localizado na pasta <b>database</b> dentro da pasta backend, conforme documentação do mongoDB:                      https://docs.mongodb.com/database-tools/mongorestore/#bin.mongorestore</li>
  
  <li>No terminal do servidor, acesse a pasta backend e execute com o comando <b>npm run prod</b>.</li>
  
  <li>No terminal do cliente, acesse a pasta app, e execute com o comando <b>ng serve</b>.</li>
  
  <li>Abra o navagedor e acesse a porta <b>localhost:4200</b></li>
  
  <li>Faça o login com um destes <b>usuários</b> que estão no banco de dados:</li>
  <ul>
        <li><b>basica@email.com</b> 
               Senha: <b>minhasenha</b></li>
        <li><b>moinhos@email.com</b> 
               Senha: <b>minhasenha</b></li>
        <li><b>lucas@email.com</b>
               Senha: <b>minhasenha</b></li>
   <ul>
<ol>
  
# Tecnologias utilizadas
<ul>
  <li><b>Backend:</b> NodeJS, TypeScript</li>
  <li><b>Frontend:</b> Angular, Bootstrap</li>
  <li><b>Banco de Dados:</b> MongoDB</li>
  <li><b>Autenticação:</b> JWT</li>
  <li><b>Testes unitários e de integração:</b> Jest</li>
<ul>



