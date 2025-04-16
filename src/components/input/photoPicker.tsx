import React from 'react';
import { Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

interface PhotoPickerProps {
    title: string;
    onFileSelected: (uri: string) => void;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({ title = "Prendre une photo", onFileSelected }) => {
    const openCamera = () => {
        const options = {
          mediaType: 'photo',
          quality: 0.5
        };
    
        launchCamera(options, (response) => {
          if (!response.didCancel && !response.errorCode) {
            const uri = response.assets?.[0]?.uri;
            if (uri) {
				onFileSelected(uri)
            }
          }
        });
    };

    return (
        <Button
            title={ title }
            onPress={ openCamera }
        />
    );
};

export default PhotoPicker;