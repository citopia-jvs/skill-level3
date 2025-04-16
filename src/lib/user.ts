const getDummyImage = async (firstname: string, lastname: string, height: number, width: number) => {
    try {
        console.log("trying to get image")
        const response = await fetch(`https://dummyjson.com/image/${ width }x${ height }/008080/ffffff?text=${ firstname } ${ lastname }`);
        const blob: Blob = await response.blob();

        // Conversion du Blob en base64
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64data = reader.result as string;
                resolve(base64data);
            };
            reader.onerror = () => {
                reject(new Error('Failed to convert blob to base64'));
            };
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export { getDummyImage };