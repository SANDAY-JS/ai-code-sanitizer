import { sanitizeCode } from "./utils/detectSecrets";

console.log("Content script loaded.");

function handlePaste(event: ClipboardEvent) {
  event.preventDefault();

  const clipboardData = event.clipboardData || (window as any).clipboardData;
  let pastedData = clipboardData.getData("text");

  const sanitizedData = sanitizeCode(pastedData);

  // Insert the sanitized content at the cursor position
  const activeElement = document.activeElement as
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLElement;

  if (
    activeElement &&
    (activeElement.tagName === "TEXTAREA" ||
      activeElement.tagName === "INPUT" ||
      activeElement.isContentEditable)
  ) {
    activeElement.isContentEditable
      ? insertTextAtCursorInContentEditable(activeElement, sanitizedData)
      : alert("Cannot insert text into the focused element.");
  } else {
    alert("Please focus on an input field before pasting.");
  }
}

function insertTextAtCursorInContentEditable(
  element: HTMLElement,
  text: string
) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return;
  }

  const range = selection.getRangeAt(0);
  range.deleteContents();

  const textNode = document.createTextNode(text);
  range.insertNode(textNode);

  range.setStartAfter(textNode);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function insertTextAtCursorInInput(
  element: HTMLInputElement | HTMLTextAreaElement,
  text: string
) {
  const startPos = element.selectionStart || 0;
  const endPos = element.selectionEnd || 0;

  const beforeText = element.value.substring(0, startPos);
  const afterText = element.value.substring(endPos, element.value.length);

  element.value = beforeText + text + afterText;

  // Move the cursor to the end of the inserted text
  const cursorPos = startPos + text.length;
  element.selectionStart = element.selectionEnd = cursorPos;
}

document.addEventListener("paste", handlePaste, true);
