import { sanitizeCode } from "./utils/detectSecrets";

function handleInput(event: Event) {
  const target = event.target as HTMLFieldSetElement;

  if (target) {
    const pTags = target.querySelectorAll("p");
    for (let i = 0; i < pTags.length; i++) {
      const codeLine = pTags[i];
      let code = codeLine.textContent;
      if (code === null) continue;

      const sanitizedCode = sanitizeCode(code);
      if (code === sanitizedCode) continue;
      code = sanitizedCode;
      alert("Confidential information has been replaced with placeholders.");
    }
  }
}

document.addEventListener("input", handleInput, true);
