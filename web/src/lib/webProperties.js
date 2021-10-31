export const webProperties = (() => {
  return {
    avatars: {
      active: false,
      /**
       * @param {*} hash
       * @returns image
       * YOu could swap out the image function here to use things like
       * https://unicornify.pictures/avatar/{hash}?s=128
       * https://avatars.dicebear.com/v2/jdenticon/{hash}.svg
       * https://www.gravatar.com/avatar/${hash}?s=260&d=retro
       */
      //image: (hash) => `https://www.gravatar.com/avatar/${hash}?s=260&d=retro`,
      //image: (hash) => `https://avatars.dicebear.com/v2/jdenticon/${hash}.svg`,
      image: (hash) => `https://unicornify.pictures/avatar/${hash}?s=128`,
    },
  }
})()
