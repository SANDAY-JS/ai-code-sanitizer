(()=>{"use strict";function t(t){let e=t;return[/['"][A-Za-z0-9]{32,}['"]/g,/api_key\s*=\s*['"][A-Za-z0-9]{32,}['"]/gi].forEach((t=>{e=e.replace(t,'"<string>"')})),e}document.addEventListener("input",(function(e){const n=e.target;if(n){const e=n.querySelectorAll("p");for(let n=0;n<e.length;n++){let i=e[n].textContent;if(null===i)continue;const l=t(i);i!==l&&(i=l,alert("Confidential information has been replaced with placeholders."))}}}),!0)})();