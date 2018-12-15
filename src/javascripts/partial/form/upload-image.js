const uploadImage = (selector) => {
  const uploadImageSelector = document.querySelector(selector);

  if (uploadImageSelector) {
    uploadImageSelector.addEventListener('submit', async function(e) {
      e.preventDefault();
      const formEntries = new FormData(this);
      console.log(this);
      await fetch('/uploads/image', {
        method: 'post',
        body: formEntries,
      });
      // console.log('img', response);
      //   const response = await fetch('/upload/image', {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     body: formEntries,
      //   });
      //   console.log('img', response);
      //   const blob = await response.FormData();
      //   console.log('blob', blob);
      // const json = await response.formData();
      // console.log('img', json);
      //   const msg = document.querySelector('.message');
      //   msg.innerHTML = json.message;
      //   if (json.message) {
      //     setTimeout(() => {
      //       msg.innerHTML = '<a href=\'/auth/login\'>На главную</a>';
      //     }, 3000);
      //   }
      // window.location = '/auth/login';
    });
  } else {
    return null;
  }
};

export default uploadImage;
