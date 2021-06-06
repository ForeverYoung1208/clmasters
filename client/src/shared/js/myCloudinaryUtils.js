export const showUploadWidget = (processResult, processError) => {
  window.cloudinary.openUploadWidget(
    {
      cloudName: 'fyoung-dp-ua',
      uploadPreset: 'clMasters_preset',
      sources: ['camera', 'url', 'local', 'google_drive'],
      singleUploadAutoClose: true,
      cropping: false,
      showCompletedButton: true,
      showAdvancedOptions: false,
      multiple: false,
      defaultSource: 'local',
      thumbnailTransformation:[{ width: 90, height: 60, crop: 'fit' }],
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#90A0B3',
          tabIcon: '#875B20',
          menuIcons: '#5A616A',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#875B20',
          action: '#FF620C',
          inactiveTabIcon: '#696258',
          error: '#F44235',
          inProgress: '#CE8A30',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
            active: true,
          },
        },
      },
    },
    (err, info) => {
      if (err) {
        console.log('error: ', err)
        processError(err)
      } else {
        if (info.event === 'success') {
          processResult(info.info)
        }
      }
    }
  )
}
