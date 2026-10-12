const fs=require("fs"),path=require("path");
const normalize=html=>html.replace(/<!-- TS:DEMO_META -->[\s\S]*?<!-- \/TS:DEMO_META -->/g,'').replace(/<!-- TS:DEMO -->[\s\S]*?<!-- \/TS:DEMO -->/g,'').replace(/href="https:\/\/wa.me\/[^\"]*"/g,'href="WHATSAPP"');
module.exports=(root,file,source)=>normalize(fs.readFileSync(source,"utf8"))===normalize(fs.readFileSync(path.join(root,"output/ts-auditoria/antes",file),"utf8"));
