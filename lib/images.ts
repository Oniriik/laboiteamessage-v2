import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

export const processImg = async (user: string): Promise<Buffer> => {
  const fontPath = path.join(process.cwd(), 'assets/fonts/helvetica.ttf');
  registerFont(fontPath, { family: 'YourFontFamily' });

  const imagePath = path.join(process.cwd(), 'assets/images/letter.png');
  const img = await loadImage(imagePath);
  const W = 1000;
  const size = user.length <= 12 ? 100 : Math.max(100 - 3 * (user.length - 12), 10);

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(img, 0, 0, img.width, img.height);

  ctx.font = `${size}px Helvetica`;
  const textWidth = ctx.measureText(user).width;

  ctx.fillStyle = 'rgba(120,120,120,1)';
  ctx.fillText(user, (W - textWidth) / 2, 385);
  ctx.fillStyle = 'rgba(250,250,250,1)';
  ctx.fillText(user, (W - textWidth) / 2, 390);
  return canvas.toBuffer('image/png');
};
