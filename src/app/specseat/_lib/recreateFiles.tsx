export function recreateFiles(e: any) {
    const file = e.target.files[0];
  
    const date = new Date();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // ensure 2 digits
    const seconds = date.getSeconds().toString().padStart(2, '0'); // ensure 2 digits
    const oldName = file.name;
    const nameParts = oldName.split('.');
    const extension = nameParts.pop();
    const baseName = nameParts.join('.');
  
    const newName = `${baseName}-${minutes}${seconds}.${extension}`;
    const newFile = new File([file], newName, { type: file.type });
  
    return newFile;
  }
