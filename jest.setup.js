class MockFileReader {
    constructor() {
      this.onload = jest.fn();
      this.readAsDataURL = jest.fn((blob) => {
        setTimeout(() => {
          if (this.onload) {
            this.onload({ target: { result: 'data:image/jpeg;base64,mockedBase64Data' } });
          }
        }, 0);
      });
    }
  }
  
  global.FileReader = MockFileReader;