// hooks/useImageUpload.ts
export async function uploadImage(file: File, folder = 'default') {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('folder', folder);
  
	const res = await fetch('/api/upload-image', {
	  method: 'POST',
	  body: formData,
	});
  
	if (!res.ok) throw new Error('Upload failed');
	const data = await res.json();
	return data.url; // The PixelBin URL
  }
  