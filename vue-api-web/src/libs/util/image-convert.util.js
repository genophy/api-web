/**
 * @description 图片转换
 * @author  g_eno_phy
 * @version 0.1
 *
 */
export default class ImageConvertUtil {
  /**
   * 将图片转换为base64
   * @param file
   * @returns {Promise<String>}
   */
  static fileToDataURL(file) {
    return new Promise(resolve => {
      const reader     = new FileReader();
      reader.onloadend = function (e) {
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  /**
   * 重设图片大小，base64
   * @param file
   * @param width 默认宽度
   * @param quality
   * @returns {Promise<String>}
   */
  static fileResizeToDataURL(file, width = 600, quality = 0.4) {
    const defaultSizeWithoutCompress = 50 * 1000; // 50kb内不用压缩
    return this.fileToDataURL(file).then(dataUrl => {
      return this.__resizeImage(dataUrl, width,
        file.size <= defaultSizeWithoutCompress ? -1 : quality, 'String');
    });
  }

  /**
   * 重设图片大小，返回Image
   * @param file
   * @returns {Promise<Image>}
   */
  static resizeImageFileToImage(file, width = 600, quality = 0.4) {
    const defaultSizeWithoutCompress = 50 * 1000; // 50kb内不用压缩
    return this.fileToDataURL(file).then(dataUrl => {
      return this.__resizeImage(dataUrl, width,
        file.size <= defaultSizeWithoutCompress ? -1 : quality, 'Blob');
    });
  }

  /**
   * 重设图片大小
   *          - 只限制宽度，防止用户上传长图
   * @param dataUrl
   * @param defaultMaxWidthSide
   * @param defaultQuality
   * @param outType (Blob,String,Image)
   * @returns {Promise<Blob|String|Image>}
   * @private
   */
  static __resizeImage(dataUrl, defaultMaxWidthSide, defaultQuality, outType = 'Blob') {
    return new Promise(resolve => {
      const img  = new Image();
      img.src    = dataUrl;
      img.onload = function () {
        let currentWidth = img.width;
        currentWidth     = currentWidth > defaultMaxWidthSide ? defaultMaxWidthSide : currentWidth;
        const rate       = img.height / img.width;
        const imgWidth   = currentWidth;
        const imgHeight  = currentWidth * rate;
        const canvas     = document.createElement('canvas');
        const ctx        = canvas.getContext('2d');

        canvas.setAttribute('width', `${imgWidth}`);
        canvas.setAttribute('height', `${imgHeight}`);

        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
        let currentQuality = defaultQuality;
        if (img.quality && img.quality <= 1 && img.quality > 0) {
          currentQuality = img.quality;
        }
        if (outType === 'Blob') {
          canvas.toBlob(function (blobObj) {
            resolve(blobObj);
          }, 'image/jpeg', currentQuality);
        } else if (outType === 'Image') {
          canvas.toBlob(function (blobObj) {
            const img  = new Image();
            img.src    = window.URL.createObjectURL(blobObj);
            img.onload = function () {
              resolve(img);
            };
          }, 'image/jpeg', currentQuality);
        } else {
          const base64 = canvas.toDataURL('image/jpeg', currentQuality);
          resolve(base64);
        }
      };
    });
  }
}
