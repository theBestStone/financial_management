import sharp from 'sharp';
import fs from 'fs';

const src =
  'C:/Users/24122/.cursor/projects/f-project-financial-management/assets/c__Users_24122_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_image-8daae454-490a-49da-b06d-376b0495f9e7.png';

const meta = await sharp(src).metadata();
console.log('size', meta.width, meta.height);

// 按截图比例裁剪：导航下方通知横幅区域
const top = Math.round(meta.height * 0.41);
const height = Math.round(meta.height * 0.19);
const left = 0;
const width = meta.width;

await sharp(src)
  .extract({ left, top, width, height })
  .resize(1920, null, { withoutEnlargement: false })
  .jpeg({ quality: 94 })
  .toFile('public/assets/notice-banner.jpg');

console.log('cropped', { left, top, width, height }, fs.statSync('public/assets/notice-banner.jpg').size);
