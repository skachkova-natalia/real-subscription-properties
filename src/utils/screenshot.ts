import html2canvas from 'html2canvas';

export function takeScreenShot(node: HTMLElement, extension: string, fileName: string) {
  if (!node) {
    return null;
  }

  return html2canvas(node)
    .then((canvas) => {
      const croppedCanvas = document.createElement('canvas');
      const croppedCanvasContext = croppedCanvas.getContext('2d');

      croppedCanvas.width = canvas.width;
      croppedCanvas.height = canvas.height;

      croppedCanvasContext?.drawImage(canvas, 0, 0);

      const base64Image = croppedCanvas.toDataURL(extension);

      const a = document.createElement('a');
      a.href = base64Image;
      a.download = `${fileName}${extension}`;
      a.click();
    })
    .catch();
}
