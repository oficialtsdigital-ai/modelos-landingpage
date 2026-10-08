// Creates an independent client copy. Usage: node ferramentas/novo-cliente.cjs modelo01 nome-cliente
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const [model,slug]=process.argv.slice(2);
if(!['modelo01','modelo02','modelo03','modelo04','modelo05','modelo06'].includes(model)||!slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)){
 console.error('Uso: node ferramentas/novo-cliente.cjs modelo01 nome-cliente');process.exit(1);
}
const target=path.join(root,'clientes',slug);
if(fs.existsSync(target)){console.error('Cliente já existe. Nenhum arquivo foi alterado.');process.exit(1);}
fs.cpSync(path.join(root,model),target,{recursive:true});
fs.cpSync(path.join(root,'compartilhado'),path.join(target,'compartilhado'),{recursive:true});
const html=fs.readFileSync(path.join(target,'index.html'),'utf8').replaceAll('../compartilhado/','./compartilhado/');
fs.writeFileSync(path.join(target,'index.html'),html);
const configPath=path.join(target,'config.js');
const config=fs.readFileSync(configPath,'utf8').replace('"demo": true','"demo": false');
fs.writeFileSync(configPath,config);
console.log('Cópia criada: clientes/'+slug+'/index.html. Edite config.js e personalize textos e fotos.');