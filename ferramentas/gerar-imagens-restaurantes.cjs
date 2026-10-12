/* Ilustrações editoriais dos modelos de restaurantes.
   Geradas localmente como SVG e rasterizadas em WebP pelo sharp.
   São composições geométricas fictícias, não fotografias de comida real.
   Para trocar por fotos do cliente, substitua os arquivos em assets/. */
const fs=require('fs'),path=require('path');
const sharp=require('C:/Users/Tami/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..');

const grain=(id,light,dark)=>`<pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="2" r="0.75" fill="${light}" opacity=".55"/><circle cx="5" cy="5.5" r="0.6" fill="${dark}" opacity=".45"/></pattern>`;
const grainLayer=(id,w,h,opacity)=>`<rect width="${w}" height="${h}" fill="url(#${id})" opacity="${opacity}"/>`;

const compositions={
 'brasa-sabor':{
  fogo:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2=".35" y2="1"><stop offset="0" stop-color="#2A1810"/><stop offset=".55" stop-color="#3D2216"/><stop offset="1" stop-color="#1A0E08"/></linearGradient>
<radialGradient id="glow" cx=".5" cy=".92" r=".62"><stop offset="0" stop-color="#E08A3C" stop-opacity=".85"/><stop offset=".45" stop-color="#C66B3D" stop-opacity=".35"/><stop offset="1" stop-color="#C66B3D" stop-opacity="0"/></radialGradient>
<linearGradient id="fl1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#8C4423"/><stop offset="1" stop-color="#E08A3C" stop-opacity=".2"/></linearGradient>
<linearGradient id="fl2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#C66B3D"/><stop offset="1" stop-color="#F8F0E5" stop-opacity=".15"/></linearGradient>
${grain('gr','#F8F0E5','#1A0E08')}
</defs>
<rect width="1536" height="1024" fill="url(#bg)"/>
<rect width="1536" height="1024" fill="url(#glow)"/>
<circle cx="1230" cy="212" r="132" fill="#F8F0E5" opacity=".92"/>
<circle cx="1230" cy="212" r="132" fill="none" stroke="#C66B3D" stroke-width="2" opacity=".5"/>
<path d="M0 792 C250 700 430 830 640 742 C860 650 1050 800 1280 726 C1400 688 1490 706 1536 690 L1536 1024 L0 1024 Z" fill="url(#fl1)" opacity=".9"/>
<path d="M0 860 C220 800 400 900 620 838 C840 776 1010 878 1230 820 C1360 786 1470 800 1536 786 L1536 1024 L0 1024 Z" fill="url(#fl2)" opacity=".75"/>
<g stroke="#1A0E08" stroke-width="11" stroke-linecap="round" opacity=".9">
<path d="M60 900 H1476"/><path d="M60 944 H1476"/><path d="M60 988 H1476"/>
</g>
<g stroke="#E08A3C" stroke-width="3" opacity=".55">
<path d="M60 894 H1476"/><path d="M60 938 H1476"/>
</g>
<g fill="none" stroke="#F8F0E5" stroke-width="2" opacity=".16" stroke-linecap="round">
<path d="M420 700 C400 620 470 580 440 500 C415 432 470 396 452 340"/>
<path d="M900 686 C884 612 942 578 918 506 C898 448 944 414 928 362"/>
</g>
${grainLayer('gr',1536,1024,.1)}
</svg>`,
  mesa:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F8F0E5"/><stop offset="1" stop-color="#EBDCC6"/></linearGradient>
${grain('gr2','#8C6B45','#F8F0E5')}
</defs>
<rect width="1536" height="1024" fill="url(#bg2)"/>
<g opacity=".5" stroke="#C66B3D" stroke-width="1.5" fill="none">
<path d="M-40 210 C300 150 620 250 900 180 C1160 116 1400 200 1580 150"/>
<path d="M-40 860 C320 920 640 800 940 872 C1200 934 1420 850 1580 900"/>
</g>
<circle cx="768" cy="512" r="352" fill="#442B21"/>
<circle cx="768" cy="512" r="352" fill="none" stroke="#C66B3D" stroke-width="3" opacity=".7"/>
<circle cx="768" cy="512" r="292" fill="none" stroke="#F8F0E5" stroke-width="1.5" opacity=".28"/>
<path d="M560 520 C560 424 640 356 760 356 C888 356 976 430 976 528 C976 622 892 690 762 690 C638 690 560 618 560 520 Z" fill="#2E1710"/>
<g stroke="#C66B3D" stroke-width="4" opacity=".55" stroke-linecap="round">
<path d="M614 452 C666 430 720 434 764 452"/><path d="M626 500 C684 478 744 482 792 500"/><path d="M636 548 C694 528 750 530 800 548"/>
</g>
<g fill="none" stroke="#7E8F4E" stroke-width="7" stroke-linecap="round" opacity=".85">
<path d="M1092 372 C1128 348 1160 356 1180 336"/><path d="M1108 420 C1146 398 1178 408 1198 388"/>
</g>
<g fill="#C66B3D"><circle cx="330" cy="330" r="9"/><circle cx="1216" cy="700" r="7"/><circle cx="268" cy="742" r="6"/><circle cx="1268" cy="286" r="5"/></g>
${grainLayer('gr2',1536,1024,.14)}
</svg>`
 },
 'sushi-kai':{
  sol:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<radialGradient id="bga" cx=".72" cy=".42" r=".8"><stop offset="0" stop-color="#191919"/><stop offset="1" stop-color="#0A0A0A"/></radialGradient>
${grain('gr3','#E9E1D2','#000000')}
</defs>
<rect width="1536" height="1024" fill="url(#bga)"/>
<circle cx="1088" cy="424" r="286" fill="#B62B32"/>
<g stroke="#E9E1D2" opacity=".3" stroke-width="1.5" fill="none">
<path d="M0 560 H640"/><path d="M0 598 H560"/><path d="M0 636 H690"/><path d="M0 674 H500"/><path d="M0 712 H620"/><path d="M0 750 H430"/>
</g>
<rect x="150" y="640" width="330" height="118" rx="26" fill="#E9E1D2"/>
<rect x="150" y="606" width="330" height="66" rx="30" fill="#B62B32"/>
<rect x="150" y="606" width="330" height="66" rx="30" fill="none" stroke="#E9E1D2" stroke-width="1.5" opacity=".35"/>
<circle cx="1300" cy="820" r="7" fill="#B62B32"/>
<circle cx="1352" cy="866" r="4" fill="#E9E1D2" opacity=".6"/>
<rect x="1462" y="120" width="2" height="784" fill="#E9E1D2" opacity=".22"/>
${grainLayer('gr3',1536,1024,.09)}
</svg>`,
  omakase:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<linearGradient id="bgb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1EAE0"/><stop offset="1" stop-color="#E4DACB"/></linearGradient>
<linearGradient id="bowl" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#1C1C1C"/><stop offset="1" stop-color="#080808"/></linearGradient>
${grain('gr4','#7A6E5C','#FFFFFF')}
</defs>
<rect width="1536" height="1024" fill="url(#bgb)"/>
<g stroke="#101010" stroke-width="1.2" opacity=".16">
<path d="M232 0 V1024"/><path d="M404 0 V1024"/><path d="M1148 0 V1024"/><path d="M1324 0 V1024"/>
</g>
<g fill="none" stroke="#101010" stroke-width="14" stroke-linecap="round" opacity=".9">
<path d="M1010 856 L1386 596"/><path d="M1052 890 L1410 660"/>
</g>
<circle cx="688" cy="470" r="304" fill="url(#bowl)"/>
<circle cx="688" cy="470" r="304" fill="none" stroke="#B62B32" stroke-width="3" opacity=".65"/>
<circle cx="688" cy="470" r="246" fill="#E9E1D2"/>
<circle cx="688" cy="470" r="246" fill="none" stroke="#101010" stroke-width="2" opacity=".35"/>
<path d="M560 452 C596 356 688 314 786 330 C876 344 936 404 944 476 C876 424 802 410 728 434 C662 456 614 492 560 452 Z" fill="#B62B32"/>
<path d="M612 540 C668 508 736 504 796 526 C846 544 882 572 900 604 C840 570 780 558 716 570 C668 580 636 572 612 540 Z" fill="#101010" opacity=".82"/>
<circle cx="760" cy="470" r="22" fill="#B62B32"/>
<g fill="none" stroke="#B62B32" stroke-width="3" opacity=".8" stroke-linecap="round">
<path d="M256 470 H452"/><path d="M286 528 H470"/>
</g>
<circle cx="1160" cy="252" r="8" fill="#B62B32"/>
<circle cx="1216" cy="216" r="4" fill="#101010" opacity=".6"/>
${grainLayer('gr4',1536,1024,.12)}
</svg>`
 },
 'bella-pizza':{
  forno:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<linearGradient id="bgc" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#FFF4DF"/><stop offset="1" stop-color="#F3DFBC"/></linearGradient>
<radialGradient id="cheese" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#E9663F"/><stop offset="1" stop-color="#C93B2E"/></radialGradient>
${grain('gr5','#C93B2E','#FFF4DF')}
</defs>
<rect width="1536" height="1024" fill="url(#bgc)"/>
<circle cx="768" cy="520" r="376" fill="#E8C88C"/>
<circle cx="768" cy="520" r="340" fill="url(#cheese)"/>
<g fill="#B3311F" opacity=".75">
<circle cx="650" cy="404" r="34"/><circle cx="900" cy="452" r="30"/><circle cx="720" cy="640" r="32"/><circle cx="930" cy="650" r="26"/><circle cx="576" cy="556" r="24"/>
</g>
<g fill="#3E6B48">
<path d="M826 322 C884 288 940 300 962 336 C918 372 858 366 826 322 Z"/>
<path d="M600 668 C654 636 706 650 724 686 C682 718 626 708 600 668 Z"/>
<path d="M986 548 C1030 522 1074 534 1088 564 C1052 592 1008 584 986 548 Z"/>
</g>
<g stroke="#3E6B48" stroke-width="2.5" opacity=".55" fill="none">
<path d="M826 322 C868 330 906 342 944 356"/><path d="M600 668 C640 676 676 686 708 698"/>
</g>
<g stroke="#E8C88C" stroke-width="6" opacity=".8" stroke-linecap="round" fill="none">
<path d="M468 300 C500 268 540 262 566 244"/><path d="M1080 780 C1112 754 1150 752 1176 736"/>
</g>
${grainLayer('gr5',1536,1024,.11)}
</svg>`,
  massa:`<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1024" viewBox="0 0 1536 1024">
<defs>
<linearGradient id="bgd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3E6B48"/><stop offset="1" stop-color="#2A4A32"/></linearGradient>
${grain('gr6','#FFF4DF','#1E3523')}
</defs>
<rect width="1536" height="1024" fill="url(#bgd)"/>
<g stroke="#FFF4DF" stroke-width="1.6" opacity=".2" fill="none">
<path d="M0 240 H1536"/><path d="M0 784 H1536"/>
</g>
<circle cx="1030" cy="512" r="316" fill="#FFF4DF"/>
<circle cx="1030" cy="512" r="252" fill="#D64541"/>
<path d="M1030 300 C1140 300 1210 396 1196 496 C1182 590 1096 664 1010 646 C932 630 890 552 918 480 C944 412 1024 386 1076 424" fill="none" stroke="#FFF4DF" stroke-width="16" stroke-linecap="round" opacity=".9"/>
<g stroke="#FFF4DF" stroke-width="5" stroke-linecap="round" opacity=".7">
<path d="M180 336 C236 300 300 306 348 288"/><path d="M164 420 C226 384 292 392 342 374"/><path d="M152 504 C214 470 282 478 334 460"/><path d="M164 588 C226 556 292 564 342 546"/><path d="M196 672 C254 642 316 650 362 634"/>
</g>
<circle cx="430" cy="760" r="9" fill="#D64541"/>
<circle cx="492" cy="812" r="5" fill="#FFF4DF" opacity=".7"/>
${grainLayer('gr6',1536,1024,.13)}
</svg>`
 }
};

(async()=>{
 let count=0;
 for(const [id,images] of Object.entries(compositions)){
  const dir=path.join(root,'modelos/restaurantes',id,'assets');
  fs.mkdirSync(dir,{recursive:true});
  for(const [name,svg] of Object.entries(images)){
   const buffer=Buffer.from(svg.replace(/\n\s*/g,''));
   await sharp(buffer).webp({quality:88}).toFile(path.join(dir,name+'.webp'));
   await sharp(buffer).resize(768,512).webp({quality:82}).toFile(path.join(dir,name+'-768.webp'));
   count+=2;console.log('Ilustração: '+id+'/'+name+'.webp');
  }
 }
 console.log('Arquivos gerados: '+count);
})().catch(error=>{console.error(error);process.exitCode=1});
