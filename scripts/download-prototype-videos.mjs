import fs from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const ids=['d125144aa21ec139b7843145bbb27a275b62c946','279061499b3edf586e121b84d707974928099eb3'];
const dir='public/sites/figma-jitrapadu/shared';
const ffmpeg='temp/media-tools/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
await fs.mkdir('temp/videos',{recursive:true});
for(let n=0;n<ids.length;n++) {
 const id=ids[n];
 const url='https://www.figma.com/api/files/xTpPetri1XBx9CIiLoOFzX/videos/'+id+'/manifest?manifest='+id+'hls_abr_1.m3u8';
 const manifest=execFileSync('curl.exe',['-sSfL',url],{encoding:'utf8'});
 await fs.writeFile('temp/videos/source-'+n+'.m3u8',manifest);
 let local=manifest;
 let index=0;
 for(const line of manifest.split(/\r?\n/).filter(l=>l.startsWith('https:'))) {
  const file='video-'+n+'-'+index+++'.ts';
  execFileSync('curl.exe',['-sSfL','--retry','2',line,'-o','temp/videos/'+file]);
  local=local.replace(line,file);
 }
 await fs.writeFile('temp/videos/local-'+n+'.m3u8',local);
 execFileSync(ffmpeg,['-y','-i','temp/videos/local-'+n+'.m3u8','-an','-c:v','copy','-movflags','+faststart',dir+'/background-'+n+'.mp4'],{stdio:'pipe'});
 execFileSync(ffmpeg,['-y','-i',dir+'/background-'+n+'.mp4','-frames:v','1',dir+'/background-'+n+'.jpg'],{stdio:'pipe'});
 console.log('Exported video '+n);
}

