# Pandemia

Projeto da incubadora do Centro de Inovação Microsoft PUCRS em parceria com a empresa DBServer. 
Esta aplicação realiza cadastros de unidades de saúde, onde cada unidade registra todos seus atendimentos relacionados com a pandemia.

## Telas
<img src="https://user-images.githubusercontent.com/38113015/104668101-3baa8680-56b6-11eb-84ef-658306b1fe55.png" width="800"> 
<img src="https://user-images.githubusercontent.com/38113015/104668524-0488a500-56b7-11eb-932c-7fc29baf0661.png" width="800">                                                                                                                        
<img src="https://user-images.githubusercontent.com/38113015/104668658-46b1e680-56b7-11eb-96ff-20337ee50a41.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104668694-5b8e7a00-56b7-11eb-92f2-e0b25293609d.png" width="800">

## Validações
<img src="https://user-images.githubusercontent.com/38113015/104668942-dc4d7600-56b7-11eb-9e45-07e20fc6aecb.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104669003-f424fa00-56b7-11eb-9e29-35b3249596f0.png" width="800">
<img src="https://user-images.githubusercontent.com/38113015/104669055-10289b80-56b8-11eb-8a64-751c9522ca1d.png" width="800">

## Layout Responsivo
<img src="https://user-images.githubusercontent.com/38113015/104671117-ec675480-56bb-11eb-87e2-8a86287b86bd.png" width="600">
<img src="https://user-images.githubusercontent.com/38113015/104671652-f5a4f100-56bc-11eb-9545-f789de8cdf3f.png" width="800">

##Execução

<ul>
  <li>Abra dois terminais, um terminal irá rodar o servidor e o outro irá rodar o cliente.</li>
  <li>No terminal do servidor, instalar as dependências utilizando o comando <b>npm run install</b> na pasta backend.</li>
  <li>No terminal do cliente, instalar as dependências utilizando o comando <b>npm run install</b> na pasta frontend.</li>
  <li>Faça o restore do banco de dados, localizado na pasta <b>database</b> em backend, conforme documentação do mongoDB:</li>
      https://docs.mongodb.com/database-tools/mongorestore/#bin.mongorestore
  <li>No terminal do servidor, na pasta backend, executar com o comando npm run prod.</li>
  <li>No terminal do cliente, na pasta app, executar com o comando ng serve.</li>
  <li>Abra o navagedor e acesse a porta localhost:4200</li>
  <li>Faça o login com um dos usuários que está no banco:</li>
      <ul>
        <li><b>usuario: basica@email.com </b>senha: minhasenha</li>
        <li><b>usuario: moinhos@email.com </b>senha: minhasenha</li>
        <li><b>usuario: lucas@email.com </b>senha: minhasenha</li>
      <ul>
<ul>
 
##Tecnologias utilizadas: 
<ul>
   <li>Backend:</li>
      <ul>
        <li>NodeJS</li>
        <li>TypeScript</li>
      <ul>
   <li>Frontend:</li>
      <ul>
        <li>Angular</li>
        <li>Bootstrap</li>
      <ul>
   <li>Banco de Dados:</li>
      <ul>
        <li>MongoDB</li>
      <ul>
  <li>Autenticação:</li>
      <ul>
         <li>JWT</li>
      <ul>
  <li>Testes unitário e de integração</li>
      <ul>
         <li>Jest</li>
      <ul>
<ul>



